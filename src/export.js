const ExcelJS = require('exceljs');
const minHeight = 5;

module.exports = function generateSpreadsheet(rides){
    const workbook = new ExcelJS.Workbook();
    const manifest = workbook.addWorksheet('Revised Manifest');
    
    manifest.getRow(1).height = 15;
    manifest.getRow(3).height = 15;
    manifest.getRow(3).height = 24;
    manifest.getRow(4).height = 28.5;
    manifest.getColumn("A").width = 8.5;
    manifest.getColumn("B").width = 10;
    manifest.getColumn("C").width = 10;
    manifest.getColumn("D").width = 10;
    manifest.getColumn("E").width = 15;
    manifest.getColumn("F").width = 24;
    manifest.getColumn("G").width = 26;
    manifest.getColumn("H").width = 16;
    manifest.getColumn("I").width = 24;

    manifest.mergeCells('A1:E3');
    manifest.mergeCells('F1:F2');
    manifest.mergeCells('G1:G2');
    manifest.mergeCells('H1:H2');
    manifest.mergeCells('I1:J2');
    manifest.mergeCells('I3:J3');

    // Set top info
    let name = manifest.getCell('A1');
    name.value = "SkyHelix Sentosa Cabin Manifest"
    name.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:{argb:"99c0e5"}
    }
    name.font = { name: 'Calibri', size: 20, bold: true}
    name.alignment= { vertical: "middle", horizontal: "center" }

    manifest.getCell("F1").value = "Date:";
    manifest.getCell("F1").alignment = {vertical:"middle"}
    manifest.getCell("F3").value = "Duty Sky 2:";
    manifest.getCell("F3").alignment = {vertical:"middle"}

    let date = new Date();
    manifest.getCell("G1").value = `${date.getDate()}/${Number(date.getMonth())+1}/${date.getFullYear()}`;
    manifest.getCell("G1").font = { bold:true, size:18, name: "Calibri" };
    manifest.getCell("G1").alignment = {horizontal: "center"}

    manifest.getCell("H1").value = "Total Visitorship:";
    manifest.getCell("H3").value = "Total Complementary:";

    // Set main table headers
    let header_style = { fill: { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}}, font: {underline:true, bold: true, size:11}, border: {top: {style:'thick'}, bottom: {style:'thick'}, left: {style:'thin'}, right:{style:'thin'}}};

    manifest.getCell("A4").value = "V5";
    manifest.getCell("A4").font = { color: {argb:"FF0101"}, italic: true, bold:true }
    manifest.getCell("A4").style = header_style;
    
    manifest.getCell("B4").value = "Adult";
    manifest.getCell("B4").style = header_style;
    manifest.getCell("B4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("C4").value = "Child";
    manifest.getCell("C4").style = header_style;
    manifest.getCell("C4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("D4").value = "Elderly";
    manifest.getCell("D4").style = header_style;
    manifest.getCell("D4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("E4").value = "Boarding Time";
    manifest.getCell("E4").style = header_style;
    manifest.getCell("E4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("F4").value = "Complementary Boarding";
    manifest.getCell("F4").style = header_style;
    manifest.getCell("F4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("G4").style = header_style;
    manifest.getCell("G4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("H4").value = "Total Per Ride";
    manifest.getCell("H4").style = header_style;
    manifest.getCell("H4").alignment = { vertical: "middle", horizontal: "center"};
    manifest.getCell("I4").value = "Suspension/Inclement Weather";
    manifest.getCell("I4").style = header_style;
    manifest.getCell("I4").alignment = { vertical: "middle", horizontal: "center", wrapText: true};
    manifest.getCell("J4").value = "Remarks";
    manifest.getCell("J4").style = header_style;
    manifest.getCell("J4").alignment = { vertical: "middle"};

    let row = 5;
    for (let x = 0; x < rides.length; x++){
        let start_row = row;
        let ride = rides[x];
        manifest.getCell(`A${row}`).value = `Ride ${ride.number}`
        let rideHeight = Math.max(ride.groups.length, minHeight);

        // merge the required cells and align
        manifest.mergeCells(`A${row}:A${row + rideHeight - 1}`);
        manifest.getCell(`A${row}`).alignment= { vertical: "middle", horizontal: "center" }
        manifest.mergeCells(`E${row}:E${row + rideHeight - 1}`);
        let boardingTime = manifest.getCell(`E${row}`);
        let date = new Date(ride.liftoff);
        let timeString = date.toLocaleTimeString([], {hourCycle:'h23', hour: '2-digit', minute:'2-digit'})
        boardingTime.value = timeString;
        boardingTime.alignment = { vertical: "middle", horizontal: "center" }
        manifest.mergeCells(`I${row}:I${row + rideHeight - 1}`);
        manifest.getCell(`I${row}`).alignment= { vertical: "middle", horizontal: "center" }

        let nationalities = { }
        for (let y = 0; y < ride.groups.length; y++){
            let group = ride.groups[y];
            if (nationalities[group.nationality] == null){
                nationalities[group.nationality] = { "K": group.kids, "A": group.plus_size + group.normal}
            } else {
                nationalities[group.nationality]["K"] = nationalities[group.nationality]["K"] + group.kids;
                nationalities[group.nationality]["A"] = nationalities[group.nationality]["A"] + group.plus_size + group.normal;
            }
        }

        for (const [natl, values] of Object.entries(nationalities)){
            manifest.getCell(`B${row}`).value = values["A"];
            manifest.getCell(`C${row}`).value = values["K"];
            manifest.getCell(`G${row}`).value = natl;
            manifest.getCell(`H${row}`).value = values["A"] + values["K"];
            row += 1;
        }
        
        manifest.addConditionalFormatting({
            ref: `B${start_row}:D${start_row+rideHeight-1}`,
            rules:[
                {
                    type: 'containsText',
                    operator: 'containsBlanks',
                    style: {fill: {type: 'pattern', pattern: 'lightGrid', bgColor: {argb: 'FF0101'}, fgColor: {argb: "A5A5A5"}}}
                }
            ]
        })
        let letters = "ABCDEFGHIJ".split('');
        let max = Math.max(minHeight, start_row+rideHeight);
        console.log(`Max; ${max}`)
        for (let x = 0; x < letters.length; x++){
            for (let counter = start_row; counter < max; counter++){
                let coords = letters[x] + counter;
                manifest.getCell(coords).border = {top:{style:'thin'}, bottom:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}};
                console.log(`Coords: ${letters[x]}${counter}`)
            }
        }

        createOuterBorder(manifest, {row:start_row, col: "A"}, {row:start_row+rideHeight-1, col: "J"})
        row = start_row + rideHeight;
    }

    return workbook.xlsx.writeBuffer();
}

const createOuterBorder = (worksheet, start = {row: 1, col: "A"}, end = {row: 1, col: "A"}, borderWidth = 'medium') => {

    start.col = start.col.split('').map((x, index) => Math.max(1, 26 ** (start.col.length - index - 1)) * (x.charCodeAt(0) - 64)).reduce((a,b) => a+b);
    end.col = end.col.split('').map((x, index) => Math.max(1, 26 ** (end.col.length - index - 1)) * (x.charCodeAt(0) - 64)).reduce((a,b) => a+b);

    const borderStyle = {
        style: borderWidth
    };
    for (let i = start.row; i <= end.row; i++) {
        const leftBorderCell = worksheet.getCell(i, start.col);
        const rightBorderCell = worksheet.getCell(i, end.col);
        leftBorderCell.border = {
            ...leftBorderCell.border,
            left: borderStyle
        };
        rightBorderCell.border = {
            ...rightBorderCell.border,
            right: borderStyle
        };
    }

    for (let i = start.col; i <= end.col; i++) {
        const topBorderCell = worksheet.getCell(start.row, i);
        const bottomBorderCell = worksheet.getCell(end.row, i);
        topBorderCell.border = {
            ...topBorderCell.border,
            top: borderStyle
        };
        bottomBorderCell.border = {
            ...bottomBorderCell.border,
            bottom: borderStyle
        };
    }
};
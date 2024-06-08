const ExcelJS = require('exceljs');
const minHeight = 5;

module.exports = function generateSpreadsheet(rides){
    const workbook = new ExcelJS.Workbook();
    const manifest = workbook.addWorksheet('Revised Manifest');
    manifest.mergeCells('A1:E3');
    manifest.mergeCells('F1:F2');
    manifest.mergeCells('G1:G2');
    manifest.mergeCells('H1:H2');
    manifest.mergeCells('I1:J2');

    // Set top info
    let name = manifest.getCell('A1');
    name.value = "SkyHelix Sentosa Cabin Manifest"
    name.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor:{argb:"99c0e5"}
    }
    name.font = { name: 'Calibri', size: 16, bold: true}
    name.alignment= { vertical: "middle", horizontal: "center" }

    manifest.getCell("F1").value = "Date:";
    manifest.getCell("F3").value = "Duty Sky 2:";

    let date = new Date();
    manifest.getCell("G1").value = `${date.getDate()}/${Number(date.getMonth())+1}/${date.getFullYear()}`;

    manifest.getCell("H1").value = "Total Visitorship:";
    manifest.getCell("H3").value = "Total Complementary:";

    // Set main table headers
    manifest.getCell("A4").value = "V5";
    manifest.getCell("B4").value = "Adult";
    manifest.getCell("C4").value = "Child";
    manifest.getCell("D4").value = "Elderly";
    manifest.getCell("E4").value = "Boarding Time";
    manifest.getCell("F4").value = "Complementary Boarding";
    manifest.getCell("H4").value = "Total Per Ride";
    manifest.getCell("I4").value = "Suspension/Inclement Weather";
    manifest.getCell("J4").value = "Remarks";


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

        for (let y = 0; y < ride.groups.length; y++){
            let group = ride.groups[y];
            manifest.getCell(`B${row}`).value = group.plus_size + group.normal;
            manifest.getCell(`C${row}`).value = group.kids;
            manifest.getCell(`G${row}`).value = group.nationality;
            manifest.getCell(`H${row}`).value = group.size;
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
        createOuterBorder(manifest, {row:start_row, col: "A"}, {row:start_row+rideHeight-1, col: "J"})
        row = start_row + rideHeight;
    }

    return workbook.xlsx.writeBuffer();
}

const createOuterBorder = (worksheet, start = {row: 1, col: "A"}, end = {row: 1, col: "A"}, borderWidth = 'medium') => {

    start.col = start.col.split('').map((x, index) => (index * 26) + (x.charCodeAt(0) - 64)).reduce((a,b) => a+b);
    end.col = end.col.split('').map((x, index) => (index * 26) + (x.charCodeAt(0) - 64)).reduce((a,b) => a+b);

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
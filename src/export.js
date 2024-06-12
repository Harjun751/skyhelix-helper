const ExcelJS = require('exceljs');
const minHeight = 5;

module.exports = async function generateSpreadsheet(rides, total_pax, breakdown, file_data, imgBuffer){
    const template = new ExcelJS.Workbook();
    const workbook = new ExcelJS.Workbook();

    await template.xlsx.load(file_data)

    const srcSheet = template.getWorksheet("Daily Report")
    copyWorkSheet(srcSheet, workbook, "Daily Report"); 
    
    const logo = workbook.addImage({
        buffer: imgBuffer,
        extension: 'png',
    });
    let daily_report = workbook.getWorksheet("Daily Report");
    daily_report.addImage(logo, 'Y1:AJ7');
    


    const manifest = workbook.addWorksheet('Revised Manifest');
    
    manifest.getRow(1).height = 15;
    manifest.getRow(3).height = 15;
    manifest.getRow(3).height = 35;
    manifest.getRow(4).height = 28.5;
    manifest.getColumn("A").width = 8.5;
    manifest.getColumn("B").width = 12;
    manifest.getColumn("C").width = 12;
    manifest.getColumn("D").width = 12;
    manifest.getColumn("E").width = 15;
    manifest.getColumn("F").width = 24;
    manifest.getColumn("G").width = 26;
    manifest.getColumn("H").width = 17;
    manifest.getColumn("I").width = 24;
    manifest.getColumn("L").width = 15;

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

    manifest.getCell("I1").value = total_pax;
    manifest.getCell("I1").font = { bold:true, size: 18, underline: "double", color: {argb:"FF0101"} }
    manifest.getCell("I1").alignment = {vertical:"middle", horizontal:"center"};

    manifest.getCell("F1").value = "Date:";
    manifest.getCell("F1").font = { bold:true, size: 12 }
    manifest.getCell("F1").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("F1").alignment = {vertical:"middle"}
    manifest.getCell("F3").value = "Duty Sky 2:";
    manifest.getCell("F3").font = { bold:true, size: 12 }
    manifest.getCell("F3").alignment = {vertical:"middle"}
    manifest.getCell("F3").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};

    let date = new Date();
    manifest.getCell("G1").value = `${date.getDate()}/${Number(date.getMonth())+1}/${date.getFullYear()}`;
    manifest.getCell("G1").font = { bold:true, size:18, name: "Calibri" };
    manifest.getCell("G1").alignment = {horizontal: "center", vertical: "middle"};
    manifest.getCell("G1").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("G3").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};

    manifest.getCell("H1").value = "Total Visitorship:";
    manifest.getCell("H1").font = { bold:true, size: 12 }
    manifest.getCell("H1").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("H3").value = "Total Complementary:";
    manifest.getCell("H3").font = { bold:true, size: 12 }
    manifest.getCell("H3").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("H3").alignment = { wrapText: true };
    manifest.getCell("I1").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("I3").border = {top: {style:'thin'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};

    // Set main table headers
    manifest.getCell("A4").value = "V5";
    manifest.getCell("A4").font = { color: {argb:"FF0101"}, italic: true, bold:true, size: 14 }
    manifest.getCell("A4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("A4").alignment = { vertical: "middle", horizontal: "center"};

    
    manifest.getCell("B4").value = "Adult";
    manifest.getCell("B4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("B4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("B4").font = {underline:true, bold: true, size:11};
    manifest.getCell("B4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("B4").alignment = { vertical: 'middle', horizontal: 'center' };
    
    manifest.getCell("C4").value = "Child";
    manifest.getCell("C4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("C4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("C4").font = {underline:true, bold: true, size:11};
    manifest.getCell("C4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("C4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("D4").value = "Elderly";
    manifest.getCell("D4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("D4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("D4").font = {underline:true, bold: true, size:11};
    manifest.getCell("D4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("D4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("E4").value = "Boarding Time";
    manifest.getCell("E4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("E4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("E4").font = {underline:true, bold: true, size:11};
    manifest.getCell("E4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("E4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("F4").value = "Complementary Boarding";
    manifest.getCell("F4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("F4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("F4").font = {underline:true, bold: true, size:11};
    manifest.getCell("F4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("F4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("G4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("G4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("H4").value = "Total Per Ride";
    manifest.getCell("H4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("H4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("H4").font = {underline:true, bold: true, size:11};
    manifest.getCell("H4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("H4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("I4").value = "Suspension/Inclement Weather (with Time)";
    manifest.getCell("I4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("I4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("I4").font = {underline:true, bold: true, size:11};
    manifest.getCell("I4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("I4").alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    manifest.getCell("J4").value = "Remarks";
    manifest.getCell("J4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("J4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("J4").font = {underline:true, bold: true, size:11};
    manifest.getCell("J4").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("J4").alignment = { vertical: 'middle', horizontal: 'center' };

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
            manifest.getCell(`B${row}`).alignment = { vertical: 'middle', horizontal: 'center' };
            if (values["K"] > 0){
                manifest.getCell(`C${row}`).value = values["K"];
                manifest.getCell(`C${row}`).alignment = { vertical: 'middle', horizontal: 'center' };
            }
            manifest.getCell(`G${row}`).value = natl;
            manifest.getCell(`G${row}`).alignment = { vertical: 'middle', horizontal: 'center' };
            manifest.getCell(`H${row}`).value = values["A"] + values["K"];
            manifest.getCell(`H${row}`).alignment = { vertical: 'middle', horizontal: 'center' };
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
        manifest.addConditionalFormatting({
            ref: `G3:G3`,
            rules:[
                {
                    type: 'containsText',
                    operator: 'containsBlanks',
                    style: {fill: {type: 'pattern', pattern: 'lightGrid', bgColor: {argb: 'FF0101'}, fgColor: {argb: "EBF1DE"}}}
                }
            ]
        })

        let letters = "ABCDEFGHIJ".split('');
        let max = Math.max(minHeight, start_row+rideHeight);
        for (let x = 0; x < letters.length; x++){
            for (let counter = start_row; counter < max; counter++){
                let coords = letters[x] + counter;
                manifest.getCell(coords).border = {top:{style:'thin'}, bottom:{style:'thin'}, left:{style:'thin'}, right:{style:'thin'}};
            }
        }

        createOuterBorder(manifest, {row:start_row, col: "A"}, {row:start_row+rideHeight-1, col: "J"})
        row = start_row + rideHeight;
    }


    // Breakdown table
    manifest.getCell("L4").value = "Nationality";
    manifest.getCell("L4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("L4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("L4").font = { bold: true, size:11};
    manifest.getCell("L4").border = {top: {style:'medium'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("M4").value = "Adult";
    manifest.getCell("M4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("M4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("M4").font = { bold: true, size:11};
    manifest.getCell("M4").border = {top: {style:'medium'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("N4").value = "Child";
    manifest.getCell("N4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("N4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("N4").font = { bold: true, size:11};
    manifest.getCell("N4").border = {top: {style:'medium'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("O4").value = "Elderly";
    manifest.getCell("O4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("O4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("O4").font = { bold: true, size:11};
    manifest.getCell("O4").border = {top: {style:'medium'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("P4").value = "Total";
    manifest.getCell("P4").alignment = { vertical: 'middle', horizontal: 'center' };
    manifest.getCell("P4").fill = { type:"pattern", pattern:"solid", fgColor: {argb:"D9D9D9"}};
    manifest.getCell("P4").font = { bold: true, size:11};
    manifest.getCell("P4").border = {top: {style:'medium'}, bottom: {style:'thin'}, left: {style:'thin'}, right:{style:'thin'}};

    let the_only_nationalities = ["Singapore", "Malaysia", "Vietnam", "India", "Thailand", "China", "Europe", "Australia", "Korea", "Japan", "Indonesia", "Phillipines", "USA", "UK", "Taiwan", "HongKong", "Myanmar", "UAE"];
    for (let x = 0; x < the_only_nationalities.length; x++) {
        let curr_natl = the_only_nationalities[x];
        let row = x + 5;
        let natl_name = manifest.getCell("L"+row);
        natl_name.value = curr_natl;
        natl_name.font = { bold: true };
        let adult = manifest.getCell("M"+row);
        adult.alignment = { vertical:"middle", horizontal: 'center'};
        adult.border = {top: "thin", left: "thin", right: "thin", bottom: "thin"};
        let child = manifest.getCell("N"+row);
        child.alignment = { vertical:"middle", horizontal: 'center'};
        child.border = {top: "thin", left: "thin", right: "thin", bottom: "thin"};
        let elderly = manifest.getCell("O"+row);
        elderly.alignment = { vertical:"middle", horizontal: 'center'};
        elderly.border = {top: "thin", left: "thin", right: "thin", bottom: "thin"};
        let total = manifest.getCell("P"+row);
        total.alignment = { vertical:"middle", horizontal: 'center'};
        total.border = {top: "thin", left: "thin", right: "thin", bottom: "thin"};
        if (breakdown[curr_natl] != null){
            adult.value = breakdown[curr_natl]["A"]
            child.value = breakdown[curr_natl]["K"]
            elderly.value = 0;
            total.value = breakdown[curr_natl]["A"] + breakdown[curr_natl]["K"]
        } else {
            adult.value = 0;
            child.value = 0;
            elderly.value = 0;
            total.value = 0;
        }
    }

    manifest.getCell("L23").value = "Total"
    manifest.getCell("L23").font = { bold: true }
    manifest.getCell("L23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("M23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("M23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("N23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("O23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("P23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("P23").value = total_pax;
    manifest.getCell("P23").alignment = { vertical: 'middle', horizontal: 'center'};
    manifest.getCell("P23").font = { bold: true }


    createOuterBorder(manifest, {row:4, col: "L"}, {row:23, col: "P"})

    // copyWorkSheet(template.getWorksheet("Data"), workbook, "Data"); 
    // copyWorkSheet(template.getWorksheet("Roll Call"), workbook, "Roll Call"); 

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

const copyWorkSheet = (sheetToClone , destWorkbook, newSheetName) => {
    let cloneSheet = destWorkbook.addWorksheet('Sheet');
    cloneSheet.model = sheetToClone.model
    sheetToClone.model.merges.forEach(merge => cloneSheet.mergeCells(merge));
    cloneSheet.name = newSheetName
}
function formatTime(time){
    let date = new Date(time);
    let hours = date.getHours();
    if (hours < 10){
        hours = "0" + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    return String(hours)+String(minutes);
}


const ExcelJS = require('exceljs');
const minHeight = 5;

module.exports = async function generateSpreadsheet(rides, total_pax, breakdown, file_data, imgBuffer, formData, empData){
    let date = new Date();
    const template = new ExcelJS.Workbook();
    const workbook = new ExcelJS.Workbook();

    await template.xlsx.load(file_data)

    const srcSheet = template.getWorksheet("Daily Report")
    copyWorkSheet(srcSheet, workbook, "Daily Report"); 
    
    const logo = workbook.addImage({
        buffer: imgBuffer,
        extension: 'png',
    });

    // daily report data
    let daily_report = workbook.getWorksheet("Daily Report");
    daily_report.addImage(logo, 'Y1:AJ7');
    daily_report.getCell("AD10").value = `${date.getDate()}/${Number(date.getMonth())+1}/${date.getFullYear()}`
    if (formData.a1.data != null){
        daily_report.getCell("F16").value = formData.a1.data.name;
        daily_report.getCell("W16").value = formData.a1.data.staffid;
        daily_report.getCell("AA16").value = "Sky 1"
    }
    daily_report.getCell("AE16").value = formData.a1.clockin;
    daily_report.getCell("AI16").value = formData.a1.clockout;
    daily_report.getCell("AM16").value = formData.a1.break;
    if (formData.a2.data != null){
        daily_report.getCell("F17").value = formData.a2.data.name;
        daily_report.getCell("W17").value = formData.a2.data.staffid;
        daily_report.getCell("AA17").value = "Sky 2"
    }
    daily_report.getCell("AE17").value = formData.a2.clockin;
    daily_report.getCell("AI17").value = formData.a2.clockout;
    daily_report.getCell("AM17").value = formData.a2.break;
    if (formData.a3.data != null){
        daily_report.getCell("F18").value = formData.a3.data.name;
        daily_report.getCell("W18").value = formData.a3.data.staffid;
        daily_report.getCell("AA18").value = "Sky 3"
    }
    daily_report.getCell("AE18").value = formData.a3.clockin;
    daily_report.getCell("AI18").value = formData.a3.clockout;
    daily_report.getCell("AM18").value = formData.a3.break;
    if (formData.a4.data != null){
        daily_report.getCell("F19").value = formData.a4.data.name;
        daily_report.getCell("W19").value = formData.a4.data.staffid;
        daily_report.getCell("AA19").value = "Sky 4"
    }
    daily_report.getCell("AE19").value = formData.a4.clockin;
    daily_report.getCell("AI19").value = formData.a4.clockout;
    daily_report.getCell("AM19").value = formData.a4.break;

    if (formData.m1.data != null){
        daily_report.getCell("F25").value = formData.m1.data.name;
        daily_report.getCell("W25").value = formData.m1.data.staffid;
        daily_report.getCell("AA25").value = "Sky 1"
    }
    daily_report.getCell("AE25").value = formData.m1.clockin;
    daily_report.getCell("AI25").value = formData.m1.clockout;
    daily_report.getCell("AM25").value = formData.m1.break;
    if (formData.m2.data != null){
        daily_report.getCell("F26").value = formData.m2.data.name;
        daily_report.getCell("W26").value = formData.m2.data.staffid;
        daily_report.getCell("AA26").value = "Sky 2"
    }
    daily_report.getCell("AE26").value = formData.m2.clockin;
    daily_report.getCell("AI26").value = formData.m2.clockout;
    daily_report.getCell("AM26").value = formData.m2.break;
    if (formData.m3.data != null){
        daily_report.getCell("F27").value = formData.m3.data.name;
        daily_report.getCell("W27").value = formData.m3.data.staffid;
        daily_report.getCell("AA27").value = "Sky 3"
    }
    daily_report.getCell("AE27").value = formData.m3.clockin;
    daily_report.getCell("AI27").value = formData.m3.clockout;
    daily_report.getCell("AM27").value = formData.m3.break;
    if (formData.m4.data != null){
        daily_report.getCell("F28").value = formData.m4.data.name;
        daily_report.getCell("W28").value = formData.m4.data.staffid;
        daily_report.getCell("AA28").value = "Sky 4"
    }
    daily_report.getCell("AE28").value = formData.m4.clockin;
    daily_report.getCell("AI28").value = formData.m4.clockout;
    daily_report.getCell("AM28").value = formData.m4.break;

    if (formData.p1.data != null){
        daily_report.getCell("F34").value = formData.p1.data.name;
        daily_report.getCell("W34").value = formData.p1.data.staffid;
        daily_report.getCell("AA34").value = "Sky 1"
    }
    daily_report.getCell("AE34").value = formData.p1.clockin;
    daily_report.getCell("AI34").value = formData.p1.clockout;
    daily_report.getCell("AM34").value = formData.p1.break;
    if (formData.p2.data != null){
        daily_report.getCell("F35").value = formData.p2.data.name;
        daily_report.getCell("W35").value = formData.p2.data.staffid;
        daily_report.getCell("AA35").value = "Sky 2"
    }
    daily_report.getCell("AE35").value = formData.p2.clockin;
    daily_report.getCell("AI35").value = formData.p2.clockout;
    daily_report.getCell("AM35").value = formData.p2.break;
    if (formData.p3.data != null){
        daily_report.getCell("F36").value = formData.p3.data.name;
        daily_report.getCell("W36").value = formData.p3.data.staffid;
        daily_report.getCell("AA36").value = "Sky 3"
    }
    daily_report.getCell("AE36").value = formData.p3.clockin;
    daily_report.getCell("AI36").value = formData.p3.clockout;
    daily_report.getCell("AM36").value = formData.p3.break;
    if (formData.p4.data != null){
        daily_report.getCell("F37").value = formData.p4.data.name;
        daily_report.getCell("W37").value = formData.p4.data.staffid;
        daily_report.getCell("AA37").value = "Sky 4"
    }
    daily_report.getCell("AE37").value = formData.p4.clockin;
    daily_report.getCell("AI37").value = formData.p4.clockout;
    daily_report.getCell("AM37").value = formData.p4.break;
    


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
        if (ride.state!=null){
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
        } else if (ride.start!=null){
            // this is a suspension event. update data in previous row
            let time = formatTime(ride.start);
            manifest.getCell(`I${row-1}`).value = `Ride Suspended @ ${time} due to [FILL IN REASON HERE]`
            manifest.getCell(`I${row-1}`).alignment = { wrapText:true, vertical:"middle", horizontal:"center" }
        } else if (ride.end!=null){
            let time = formatTime(ride.end);
            manifest.getCell(`I${row}`).value = `Ride Resumed @ ${time}`
            manifest.getCell(`I${row}`).alignment = { wrapText:true, vertical:"middle", horizontal:"center" }
        }
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
    let num_kids = 0;
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
            num_kids+=child.value;
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
    manifest.getCell("M23").value = total_pax - num_kids;
    manifest.getCell("N23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("N23").value = num_kids;
    manifest.getCell("O23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("O23").value = 0;
    manifest.getCell("P23").border = {top: {style:'medium'}, bottom: {style:'medium'}, left: {style:'thin'}, right:{style:'thin'}};
    manifest.getCell("P23").value = total_pax;
    manifest.getCell("O23").alignment = { vertical: 'middle', horizontal: 'center'};
    manifest.getCell("N23").alignment = { vertical: 'middle', horizontal: 'center'};
    manifest.getCell("M23").alignment = { vertical: 'middle', horizontal: 'center'};
    manifest.getCell("P23").alignment = { vertical: 'middle', horizontal: 'center'};
    manifest.getCell("P23").font = { bold: true }


    createOuterBorder(manifest, {row:4, col: "L"}, {row:23, col: "P"})

    copyWorkSheet(template.getWorksheet("Data"), workbook, "Data"); 


    const roll_call = workbook.addWorksheet('Roll Call');
    row = 3;
    roll_call.getCell("A2").value = "S/n"
    roll_call.getCell("B2").value = "Name of Staff"
    roll_call.getCell("C2").value = "Staff ID"
    roll_call.getCell("D2").value = "Type"
    for (let x = 0; x < empData.length; x++){
        let emp = empData[x];
        roll_call.getCell(`B${row}`).value = emp.name;
        roll_call.getCell(`C${row}`).value = emp.staffid;
        roll_call.getCell(`D${row}`).value = emp.type;
        row+=1;
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

const copyWorkSheet = (sheetToClone , destWorkbook, newSheetName) => {
    let cloneSheet = destWorkbook.addWorksheet('Sheet');
    cloneSheet.model = sheetToClone.model
    sheetToClone.model.merges.forEach(merge => cloneSheet.mergeCells(merge));
    cloneSheet.name = newSheetName
}
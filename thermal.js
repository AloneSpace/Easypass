const printer = require("node-thermal-printer");

printer.init({
  type: "epson",
  interface: "" //! USB
});

printer.alignCenter();
printer.bold(true);
printer.println("ชื่อบริษัท");
printer.bold(false);
printer.underline(true);
printer.println("บัตรผ่านเข้าออก");
printer.underline(false);
//ข้อมูล
printer.alignLeft(); //! ทางซ้าย
printer.println("1. ผู้เข้าใช้สถานที่ต้องแลกบัตรประชาชนทุกครั้ง");
printer.println(
  "2. เมื่อทำธุระเสร็จสิ้นแล้ว ต้องให้เจ้าหน้าที่เซ็นยืนยันการเข้าพบในช่องลายเซ็นท้ายกระดาษ"
);
printer.println(
  "3. หากทำบัตรผ่านใบนี้สูญหาย จะต้องชำระค่าปรับเป็นจำนวนเงิน 200 บาท"
);
printer.println();
printer.alignCenter(); //! ตรงกลาง
printer.tableCustom([
  //
  { text: "ทะเบียนรถ", align: "LEFT", width: 0.5 },
  { text: "วัน/เวลา เข้า", align: "RIGHT", cols: 8 }
]);
printer.println();
printer.tableCustom([
  //! Input From form             //
  { text: "", align: "LEFT", width: 0.5 },
  { text: "", align: "RIGHT", cols: 8 }
]);
//! ตรงกลาง
printer.code128(""); //! Vehicle_ID
printer.println();
printer.tableCustom([
  //
  { text: "เลขขับรถ", align: "LEFT", width: 0.5 },
  { text: "ประเภท", align: "LEFT", width: 0.5 },
  { text: "พนักงาน", align: "RIGHT", cols: 8 }
]);
printer.println();
printer.tableCustom([
  //! Input From form             //
  { text: "", align: "LEFT", width: 0.5 },
  { text: "", align: "LEFT", width: 0.5 },
  { text: "", align: "RIGHT", cols: 8 }
]);
printer.println();
printer.alignLeft();
printer.println("ผู้ขับรถ: _______________________________");
printer.println();
printer.println();
printer.println("ผู้ติดต่อ (กรุณาเซ็นชื่อ)");
printer.println();
printer.println();
printer.println("..................................");
printer.println("(................................)");

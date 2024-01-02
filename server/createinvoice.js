const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(560, y).stroke();
}

function generateBackground(doc, x, y, width, height, color) {
  doc.fillColor(color).rect(x, y, width, height).fill();
}

function generateHeader(doc, theOrder) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`${theOrder.productDistributorCompanyName}`, 50, 57)
    .fontSize(10)
    .text(`${theOrder.productDistributorCompanyAddress}`, 50, 75)
    .moveDown();

  generateHr(doc, 110);
}

function generateCustomerInformation(doc, theOrder) {
  const orderValues = theOrder.dataValues;

  const invoiceDate = orderValues.createdAt;
  const formattedDate = invoiceDate.toLocaleDateString("en-GB");

  doc
    .fillColor("#000000")
    .text(`Porosia Numër: #${orderValues.id}`, 60, 130)
    .text(`Data e porosisë: ${formattedDate}`, 60, 145)
    .text(orderValues.productClientName, 60, 160)
    .text(orderValues.productClientCompanyName, 60, 175)
    .text(orderValues.productClientCompanyAddress, 60, 190)
    .moveDown();

  generateHr(doc, 220);
}

function generateTableRowHeader(doc, y, c1, c2, c3, c4) {
  doc.font("Helvetica-Bold");
  doc
    .fontSize(11)
    .text(c1, 50, y)
    .text(c2, 200, y)
    .text(c3, 330, y)
    .text(c4, 480, y);

  generateHr(doc, 280);
}

function generateTableRowContent(doc, theOrder) {
  const orderValues = theOrder.dataValues;
  doc.font("Helvetica");
  doc
    .fontSize(10)
    .text(orderValues.productName, 50, 310)
    .text(orderValues.productPrice, 200, 310)
    .text(orderValues.productQuantity, 330, 310)
    .text(orderValues.productTotalPrice, 480, 310);
}

function createInvoice(orderId, theOrder, res) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc, theOrder);
    generateBackground(doc, 50, 110, 510, 110, "#DDDDDD");
    generateCustomerInformation(doc, theOrder);
    generateTableRowHeader(
      doc,
      260,
      "Emri produktit",
      "Çmimi për njësi",
      "Sasia e porositur",
      "Totali i vlerës"
    );
    generateTableRowContent(doc, theOrder);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${orderId}.pdf`
    );

    doc.pipe(res);
    doc.end();

    doc.on("end", () => {
      resolve();
    });

    doc.on("error", (err) => {
      reject(err);
    });
  });
}

// function sendInvoiceFile(orderId, res) {
//   const filePath = `./output_${orderId}.pdf`; // Adjust filename using orderId

//   // Ensure file exists before attempting to read it
//   if (fs.existsSync(filePath)) {
//     const file = fs.createReadStream(filePath);
//     const stat = fs.statSync(filePath);

//     res.setHeader("Content-Length", stat.size);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=invoice_${orderId}.pdf`
//     );

//     file.pipe(res);
//   } else {
//     res.status(404).json({
//       title: "error",
//       message: "File not found",
//     });
//   }
// }

module.exports = {
  createInvoice,
  //   sendInvoiceFile,
};

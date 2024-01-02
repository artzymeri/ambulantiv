const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHeader(doc, theOrder) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`${theOrder.productDistributorCompanyName}`, 50, 57)
    .fontSize(10)
    .text(`${theOrder.productDistributorCompanyAddress}`, 50, 75)
    .moveDown();
}

function generateCustomerInformation(doc, theOrder) {
  const orderValues = theOrder.dataValues;

  console.log(orderValues);

  const invoiceDate = orderValues.createdAt;
  const formattedDate = invoiceDate.toLocaleDateString("en-GB");

  doc
    .text(`Porosia Numër: #${orderValues.id}`, 50, 130)
    .text(`Data e porosisë: ${formattedDate}`, 50, 145)
    .text(orderValues.productClientName, 50, 160)
    .text(orderValues.productClientCompanyName, 50, 175)
    .text(orderValues.productClientCompanyAddress, 50, 190)
    .moveDown();
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: "right" })
    .text(c4, 370, y, { width: 90, align: "right" })
    .text(c5, 0, y, { align: "right" });
}

function createInvoice(orderId, theOrder, res) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 50 });

    generateHeader(doc, theOrder);
    generateCustomerInformation(doc, theOrder);
    generateTableRow(doc, 250, "text1", "text2", "text3", "text4", "text5");

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

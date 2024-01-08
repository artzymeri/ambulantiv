const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(560, y).stroke();
}

function generateHr2(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(5).moveTo(50, y).lineTo(560, y).stroke();
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
    .text(c2, 280, y)
    .text(c3, 380, y)
    .text(c4, 480, y);

  generateHr(doc, 280);
}

function generateTableRowContent(doc, theOrder) {
  const orderValues = theOrder.dataValues;
  doc.font("Helvetica");
  doc
    .fontSize(10)
    .text(
      `${orderValues.productName}` +
        (orderValues.discounted ? " (Në zbritje)" : ""),
      50,
      310
    )
    .text(
      `${orderValues.productPrice}€` +
        (orderValues.discounted
          ? ` -(${orderValues.discountedPercentage}%)`
          : ""),
      280,
      310
    )
    .text(orderValues.productQuantity, 380, 310)
    .text(`${orderValues.productTotalPrice}€`, 480, 310);

  generateHr2(doc, 330);
}

function generateTableTotalPrice(doc, theOrder) {
  const orderValues = theOrder.dataValues;
  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Totali i Faturës është:", 400, 360)
    .fontSize(15)
    .font("Helvetica-Bold")
    .text(`${orderValues.productTotalPrice}€`, 500, 357)
    .font("Helvetica")
    .fontSize(10)
    .text("Vlera e TVSH (në përqindje):", 367, 385)
    .font("Helvetica")
    .fontSize(13)
    .text("15%", 500, 383)
    .font("Helvetica")
    .fontSize(10)
    .text("Totali Faturës pas TVSH:", 385, 410)
    .font("Helvetica-Bold")
    .fontSize(15)
    .text(`${(orderValues.productTotalPrice * 0.85).toFixed(2)}€`, 500, 407);
}

function generateFooterDisclaimer(doc, theOrder) {
  const orderValues = theOrder.dataValues;
  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Kjo faturë eshtë përpiluar në kuadër të softuerit/uebfaqes E-Commerce Kosova",
      50,
      730,
      { align: "center" }
    );
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
    generateTableTotalPrice(doc, theOrder);
    generateFooterDisclaimer(doc, theOrder);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Fatura ${
        theOrder.dataValues.productName
      } ${theOrder.dataValues.createdAt.toLocaleDateString("en-GB")}.pdf`
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

module.exports = {
  createInvoice,
  //   sendInvoiceFile,
};

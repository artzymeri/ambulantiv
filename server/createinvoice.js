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
    .text(`${theOrder.distributorCompanyName}`, 50, 57)
    .fontSize(10)
    .text(`${theOrder.distributorCompanyAddress}`, 50, 75)
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
    .text(orderValues.clientName, 60, 160)
    .text(orderValues.clientCompanyname, 60, 175)
    .text(orderValues.clientCompanyAddress, 60, 190)
    .moveDown();

  generateHr(doc, 220);
}

function generateTableHeader(doc, y, c1, c2, c3, c4) {
  doc.font("Helvetica-Bold");
  doc
    .fontSize(11)
    .text(c1, 50, y)
    .text(c2, 280, y)
    .text(c3, 380, y)
    .text(c4, 480, y);

  generateHr(doc, 280);
}

function generateTableRow(doc, product, y) {
  doc.font("Helvetica");
  doc
    .fontSize(10)
    .text(
      `${product.name}` + (product.discounted ? " (Në zbritje)" : ""),
      50,
      y
    )
    .text(
      `${product.price}€` +
        (product.discounted ? ` -(${product.discountedPercentage}%)` : ""),
      280,
      y
    )
    .text(product.quantity, 380, y)
    .text(`${product.totalPrice}€`, 480, y);

  generateHr2(doc, 330);
}

function generateTableTotalPrice(doc, totalSum, y) {
  doc
    .font("Helvetica")
    .fontSize(10)
    .text("Totali i Faturës është:", 400, (y + 310))
    .fontSize(15)
    .font("Helvetica-Bold")
    .text(`${totalSum}€`, 500, (y + 307))
    .font("Helvetica")
    .fontSize(10)
    .text("Vlera e TVSH (në përqindje):", 367, (y + 335))
    .font("Helvetica")
    .fontSize(13)
    .text("15%", 500, (y + 333))
    .font("Helvetica")
    .fontSize(10)
    .text("Totali Faturës pas TVSH:", 385, (y + 360))
    .font("Helvetica-Bold")
    .fontSize(15)
    .text(`${(totalSum * 0.85).toFixed(2)}€`, 500, (y + 357));
}

function generateFooterDisclaimer(doc) {
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

    generateTableHeader(
      doc,
      260,
      "Emri produktit",
      "Çmimi për njësi",
      "Sasia e porositur",
      "Totali i vlerës"
    );

    let y = 310;
    let y1 = 330;
    let y3 = 0;
    let totalSum = 0;

    for (const product of JSON.parse(theOrder.products)) {
      doc.font("Helvetica");
      doc
        .fontSize(10)
        .text(
          `${product.name}` + (product.discounted ? " (Në zbritje)" : ""),
          50,
          y
        )
        .text(
          `${product.price}€` +
            (product.discounted ? ` -(${product.discountedPercentage}%)` : ""),
          280,
          y
        )
        .text(product.quantity, 380, y)
        .text(`${product.totalPrice}€`, 480, y);

      generateHr2(doc, y1);
      y += 50;
      y1 += 50;
      y3 += 50;
      totalSum = parseFloat(product.totalPrice) + totalSum;
    }
    generateTableTotalPrice(doc, totalSum, y3)
    generateFooterDisclaimer(doc);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Fatura ${
        theOrder.dataValues.name
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

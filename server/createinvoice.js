const fs = require("fs");
const PDFDocument = require("pdfkit");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

function generateHeader(doc, theOrder) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`${theOrder.productDistributorCompanyName}`, 50, 57)
    .fontSize(10)
    .text(`${theOrder.productDistributorCompanyAddress}`, 200, 65, {
      align: "right",
    })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  const invoiceDate = new Date();
  const formattedDate = invoiceDate.toLocaleDateString("en-GB");
  const shipping = invoice.shipping;

  doc
    .text(`Invoice Number: ${invoice.invoice_nr}`, 50, 130)
    .text(`Invoice Date: ${formattedDate}`, 50, 145)
    .text(`Balance Due: ${invoice.subtotal - invoice.paid}`, 50, 160)

    .text(shipping.name, 300, 130)
    .text(shipping.address, 300, 145)
    .text(`${shipping.city}, ${shipping.state}, ${shipping.country}`, 300, 160)
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
    generateCustomerInformation(doc, invoice);
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

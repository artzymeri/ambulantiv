const fs = require('fs');
const PDFDocument = require('pdfkit');

function generateHeader(doc) {
	doc.text('aaa')
}

function createInvoice(orderId) {
	return new Promise((resolve, reject) => {
		let doc = new PDFDocument({ margin: 50 });


        doc.text('aaasaa')

		const filePath = `./output_${orderId}.pdf`; // Adjust filename using orderId

		const writeStream = fs.createWriteStream(filePath);
		doc.pipe(writeStream);

		doc.end();
		writeStream.on('finish', () => {
			resolve(filePath);
		});

		writeStream.on('error', (err) => {
			reject(err);
		});
	});
}

function sendInvoiceFile(orderId, res) {
	const filePath = `./output_${orderId}.pdf`; // Adjust filename using orderId

	// Ensure file exists before attempting to read it
	if (fs.existsSync(filePath)) {
		const file = fs.createReadStream(filePath);
		const stat = fs.statSync(filePath);

		res.setHeader('Content-Length', stat.size);
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename=invoice_${orderId}.pdf`);

		file.pipe(res);
	} else {
		res.status(404).json({
			title: "error",
			message: "File not found",
		});
	}
}

module.exports = {
	createInvoice,
	sendInvoiceFile,
};


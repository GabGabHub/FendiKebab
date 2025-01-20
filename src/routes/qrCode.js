const QRCode = require('qrcode');

const generateQRCode = async (data) => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(data);
        return qrCodeDataUrl;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw new Error("Failed to generate QR code.");
    }
};

module.exports = { generateQRCode };

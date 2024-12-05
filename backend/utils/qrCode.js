const QRCode = require('qrcode');

/**
 * Generates a QR code for a given URL or text.
 * @param {string} data - The data to encode in the QR code (e.g., access code, URL).
 * @returns {Promise<string>} - A Promise that resolves to the QR code as a data URL.
 */

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

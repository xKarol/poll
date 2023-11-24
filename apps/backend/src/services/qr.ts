import QRCode from "qrcode";

export const generateQRCode = (text: string): Promise<Buffer> => {
  return QRCode.toBuffer(text, {
    type: "png",
    margin: 2,
  });
};

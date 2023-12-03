import type { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: IncomingMessage, res: ServerResponse) => {
  return new Promise<void>((resolve, reject) => {
    req.url = req.url.replace("/api", "");
    proxy.once("error", (error) => {
      console.log("Proxy Error:", error);
      reject(error);
    });
    proxy.web(req, res, { target: API_URL, changeOrigin: true });
  });
};

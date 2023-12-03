import type { IncomingMessage, ServerResponse } from "http";
import httpProxy from "http-proxy";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: IncomingMessage, res: ServerResponse) =>
  new Promise((resolve, reject) => {
    req.url = req.url.replace("/api", "");
    const proxy: httpProxy = httpProxy.createProxy();
    proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
      changeOrigin: true,
      target: API_URL,
    });
  });

import type http from "http";
import type { WebSocket as WebSocketType } from "types";
import WebSocket from "ws";

import { getPollVotes } from "../services/poll";

async function websocketInit(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  const wss = new WebSocket.Server({
    noServer: true,
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const parsedMessage = JSON.parse(message.toString()) as {
        e: WebSocketType.Events;
        data: unknown;
      };

      const { e, data } = parsedMessage;
      if (e === "POLL_VOTES") {
        if (typeof data !== "string") return;
        const pollAnswers = await getPollVotes(data);
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(pollAnswers));
        });
      }
    });
  });
  return wss;
}

export default websocketInit;

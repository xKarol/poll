import http from "http";
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
      const parsedMessage = JSON.parse(message.toString());
      const { e, data } = parsedMessage;
      if (e === "test") {
        setInterval(async () => {
          const pollAnswers = await getPollVotes(data);
          ws.send(JSON.stringify(pollAnswers));
        }, 5000);
      }
    });
  });
  return wss;
}

export default websocketInit;

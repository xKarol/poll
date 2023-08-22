import { Answer } from "prisma";
import { useState, useEffect } from "react";

export const useLiveAnswers = (pollId: string) => {
  const [data, setData] = useState<Answer[]>();
  useEffect(() => {
    const websocket = new WebSocket(process.env["NEXT_PUBLIC_WEBSOCKET_URL"]);
    websocket.onopen = () => {
      console.log("connected");
      websocket.send(JSON.stringify({ e: "test", data: pollId }));
    };
    websocket.onerror = console.log;
    websocket.onmessage = (message) => {
      const { data: msgData } = message;
      const parsedData: Answer[] = JSON.parse(msgData);
      setData(parsedData);
    };

    return () => {
      websocket.close();
    };
  }, [pollId]);
  return { data };
};

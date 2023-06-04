"use client";

import useSerial from "@/presentation/hooks/useSerial";
import { Button } from "@mantine/core";

const PlayBoard = () => {
  const { connect, receivedData, writeSerialEveryXSeconds } = useSerial();

  const start = async () => {
    await connect();
  };

  const write = async () => {
    await writeSerialEveryXSeconds("HOLA", 1000);
  };

  return (
    <>
      PLAY BOARD
      <Button onClick={start}>INICIAL</Button>
      <Button onClick={write}>WRITE</Button>
      <h2>{receivedData}</h2>
    </>
  );
};

export default PlayBoard;

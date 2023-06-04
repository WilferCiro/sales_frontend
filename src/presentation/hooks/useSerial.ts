import { useEffect, useState } from "react";

interface SerialData {
  data: string | ArrayBuffer | null;
}

const useSerial = (): {
  writeSerial: (data: string) => Promise<void>;
  writeSerialEveryXSeconds: (data: string, interval: number) => void;
  connect: () => void;
  receivedData: string | null;
} => {
  const [port, setPort] = useState<any | null>(null);
  const [receivedData, setReceivedData] = useState<string | null>(null);

  const connectSerial = async (): Promise<void> => {
    /* try {
      const nPort = await navigator.serial.requestPort();
      await nPort.open({ baudRate: 9600 });
      setPort(nPort);
    } catch (error) {
      console.error("Error connecting to serial port:", error);
    }*/
  };

  const connect = async () => {
    if ("serial" in navigator) {
      await connectSerial();
    }
  };

  useEffect(() => {
    if (port) {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
    }
  }, [port]);

  const strToBuffer = (str: string) => {
    let arrayBuffer = new ArrayBuffer(str.length * 1);
    let newUint = new Uint8Array(arrayBuffer);
    newUint.forEach((_, i) => {
      newUint[i] = str.charCodeAt(i);
    });
    return newUint;
  };

  const writeSerial = async (dataIn: string): Promise<void> => {
    if (port) {
      try {
        const writer = port.writable.getWriter();
        const data = new Uint8Array([104, 101, 108, 108, 111]); // hello
        const data2 = strToBuffer(dataIn);
        await writer.write(data2);
        writer.releaseLock();
      } catch (error) {
        console.error("Error writing to serial port:", error);
      }
    }
  };

  const read = async () => {
    let data = "";
    try {
      if (port.readable) {
        const textDecoder = new TextDecoderStream();
        if (!port.readable?.locked) {
          const readableStreamClosed = port.readable.pipeTo(
            textDecoder.writable
          );
        }
        const reader = textDecoder.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          console.log("[readLoop] DONE", done);
          if (done) {
            console.log("[readLoop] DONE", done);
            reader.releaseLock();
            // |reader| has been canceled.
            break;
          }
          data += value;
          // Do something with |value|…
        }
      }
    } catch (error) {
      // Handle |error|…
      console.log("ERROR: ", error);
    }
  };

  const writeSerialEveryXSeconds = (data: string, interval: number): void => {
    setInterval(async () => {
      await writeSerial(data);
      await readSerial();
    }, interval);
  };

  const readSerial = async () => {
    // const reader = textDecoder.readable.getReader();
    if (port.readable) {
      if (port.readable.locked) {
        return;
      }
      const reader = port.readable.getReader();
      let data = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          const val = String.fromCharCode.apply(null, value);
          data += val;
          if (val === "\n") {
            console.log(data);
            data = "";
          }
        }
      } catch (error) {
        // TODO: Handle non-fatal read error.
      }
    }
  };

  /*useEffect(() => {
    if (port) {
      const intervalId = setInterval(() => {
        readSerial();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [port]);*/

  return { writeSerial, writeSerialEveryXSeconds, connect, receivedData };
};

export default useSerial;

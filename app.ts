import * as net from "net";
import { determinePacketDataType } from './FormatPacket/determinePacketDataType';
import { convertBufferToArray } from "./FormatPacket/convertBufferToArray";
import { createDbCollection } from "./CreateDbCollection/createDbCollection";

const start = async () => {
  const client = net.createConnection({
      host: "localhost",
      port: 8282
    }, async () => {
      console.log("Connected to provider service");
    });
  
  const databaseCollection = await createDbCollection();
  
  client.on("data", data => {
    const packets = convertBufferToArray(data)
    determinePacketDataType(packets, databaseCollection);
  });
  
  client.on("end", () => {
    console.log("Disconnected from provider service");
  });
};

start();

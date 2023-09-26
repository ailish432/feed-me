import { PacketHeader } from "@source/types";

export const formatPacketHeader = (packet: string[]): PacketHeader => {
    const msgId = parseInt(packet[0]);
    const operation = packet[1];
    const type = packet[2];
    const timestamp = parseInt(packet[3]);

    return {
        msgId,
        operation,
        type,
        timestamp
    }
}

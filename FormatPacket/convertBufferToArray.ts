export const convertBufferToArray = (packets: Buffer): string[] => {
    const packetString = packets.toString();
    return packetString.split('\n');
}

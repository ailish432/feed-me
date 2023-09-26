export const createSinglePacketArray = (packet: string): string[] => {
    const slicedPacket = packet.slice(1, -1);
    const packetWithoutBackslashes = slicedPacket.replace(/\\/g, '');
    const formattedPacket = packetWithoutBackslashes
        .replace(/\|\|([a-zA-Z\s]+)\|/, '|' + '$1')
        .replace(/\|([a-zA-Z\s]+)\|\|/, '$1' + '|');

    return formattedPacket.split('|');
}

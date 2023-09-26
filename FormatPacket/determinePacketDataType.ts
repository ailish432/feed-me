import { formatEventToObject, formatMarketToObject, formatOutcomeToObject } from "./formatPacketBodyToObject";
import { formatPacketHeader } from "./formatPacketHeaderToObject";
import { createSinglePacketArray } from "./createSinglePacketArray";
import { Collection } from "mongodb";

export const determinePacketDataType = (packets: string[], collection: Collection) => {
    packets.forEach(async packet => {
        const packetArray = createSinglePacketArray(packet)
        const packetHeader = formatPacketHeader(packetArray);
        switch(packetHeader.type) {
            case 'event':
                await formatEventToObject(packetArray, packetHeader, collection);
                break;
            case 'market':
                formatMarketToObject(packetArray, packetHeader, collection);
                break;
            case 'outcome':
                formatOutcomeToObject(packetArray, packetHeader, collection);
                break;
            default:
                break;
        }        
    });   
}

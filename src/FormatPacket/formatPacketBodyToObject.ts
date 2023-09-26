import { storeEvent, storeMarket, storeOutcome } from "../StoreFixtures/storeFixtures";
import { MarketPacket, PacketHeader, OutcomeBody } from "@source/types"
import { Collection } from "mongodb";

export const formatEventToObject = async (packetArray: string[], header: PacketHeader, collection: Collection) => {
    const eventId = packetArray[4];
    const category = packetArray[5];
    const subCategory = packetArray[6];
    const name = packetArray[7];
    const startTime = parseInt(packetArray[8]);
    const displayed = packetArray[9] === '1' ? true : false
    const suspended = packetArray[10] === '1' ? true : false
    const markets: MarketPacket[] = []

    const event = {
        header: {...(header)},
        body : {
            eventId,
            category,
            subCategory,
            name,
            startTime,
            displayed,
            suspended,
            markets
        }
    };

    await storeEvent(collection, event);
}

export const formatMarketToObject = async (packetArray: string[], header: PacketHeader, collection: Collection) => {
    const eventId = packetArray[4];
    const marketId = packetArray[5];
    const name = packetArray[6];
    const displayed = packetArray[7] === '1' ? true : false
    const suspended = packetArray[8] === '1' ? true : false
    const outcomes: OutcomeBody[] = []

    const market = {
        header: {...(header)},
        body: {
            eventId,
            marketId,
            name,
            displayed,
            suspended,
            outcomes
        }
    }

    await storeMarket(collection, market);
}

export const formatOutcomeToObject = async (packetArray: string[], header: PacketHeader, collection: Collection) => {
    const marketId = packetArray[4];
    const outcomeId = packetArray[5];
    const name = packetArray[6];
    const price = packetArray[7];
    const displayed = packetArray[8] === '1' ? true : false
    const suspended = packetArray[9] === '1' ? true : false

    const outcome =  {
        header: {...(header)},
        body: {
            marketId,
            outcomeId,
            name,
            price,
            displayed,
            suspended
        }
    }

    await storeOutcome(collection, outcome);
}

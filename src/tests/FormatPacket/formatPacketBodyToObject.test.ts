import { formatEventToObject, formatMarketToObject, formatOutcomeToObject } from "@source/FormatPacket/formatPacketBodyToObject";
import { storeEvent, storeMarket, storeOutcome } from "@source/StoreFixtures/storeFixtures";
import { MarketPacket, OutcomePacket } from "@source/types";
import { Db } from "mongodb";

jest.mock('@source/StoreFixtures/storeFixtures');
const mockStoreEvent = storeEvent as jest.MockedFunction<typeof storeEvent>;
const mockStoreMarket = storeMarket as jest.MockedFunction<typeof storeMarket>;
const mockStoreOutcome = storeOutcome as jest.MockedFunction<typeof storeOutcome>;

describe('formatPacketBodyToObject', () => {
    const mDB = ({
        collection: jest.fn(),
      } as unknown) as Db;

    const collection = mDB.collection('test-collection')
    describe('formatEventToObject', () => {
        const header = {
            msgId: 2054,
            operation: 'create',
            type: 'event',
            timestamp: 1497359166352
        };
        it('should format and return PacketResponse', async () => {
            const eventPacket = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];
            await formatEventToObject(eventPacket, header, collection);
            const event = {
                header: {
                    msgId: 2054,
                    operation: 'create',
                    type: 'event',
                    timestamp: 1497359166352
                },
                body : {
                    eventId: 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2',
                    category: 'Football',
                    subCategory: 'Sky Bet League Two',
                    name: 'Accrington vs Cambridge',
                    startTime: 1497359216693,
                    displayed: false,
                    suspended: true,
                    markets: [] as MarketPacket[]
                }
            }

            expect(mockStoreEvent).toBeCalledWith(collection, event)
        });
    });

    describe('formatMarketToObject', () => {
        const header = {
            msgId: 61,
            operation: 'create',
            type: 'market',
            timestamp: 1695131740241
        };
        it('should format and return PacketResponse', async () => {
            const marketPacket = ['61', 'create', 'market', '1695131740241', 'ff6b98da-c9e4-4209-8ccf-e3555b71ab32', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'Goal Handicap (-1)', '0', '1'];
            await formatMarketToObject(marketPacket, header, collection);
            const market = {
                header: {
                    msgId: 61,
                    operation: 'create',
                    type: 'market',
                    timestamp: 1695131740241
                },
                body: {
                    eventId: 'ff6b98da-c9e4-4209-8ccf-e3555b71ab32',
                    marketId: '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28',
                    name: 'Goal Handicap (-1)',
                    displayed: false,
                    suspended: true,
                    outcomes: [] as OutcomePacket[]
                }
            }

            expect(mockStoreMarket).toBeCalledWith(collection, market);
        });
    });

    describe('formatOperationToObject', () => {
        const header = {
            msgId: 62,
            operation: 'create',
            type: 'outcome',
            timestamp: 1695131740241
        };
        it('should format and return PacketResponse', async () => {
            const outcomePacket = ['62', 'create', 'outcome', '1695131740241', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'b4cd040b-c3dd-4a6a-9ad4-a4469358dc5d', 'Port Vale -1', '4/11', '0', '1'];
            await formatOutcomeToObject(outcomePacket, header, collection);
            const outcome = {
                header: {
                    msgId: 62,
                    operation: 'create',
                    type: 'outcome',
                    timestamp: 1695131740241
                },
                body: {
                    marketId: '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28',
                    outcomeId: 'b4cd040b-c3dd-4a6a-9ad4-a4469358dc5d',
                    name: 'Port Vale -1',
                    price: '4/11',
                    displayed: false,
                    suspended: true
                }
            }

            expect(mockStoreOutcome).toBeCalledWith(collection, outcome);
        });
    });
});

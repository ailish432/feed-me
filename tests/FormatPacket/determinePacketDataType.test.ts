import { createSinglePacketArray } from "@source/FormatPacket/createSinglePacketArray";
import { determinePacketDataType } from "@source/FormatPacket/determinePacketDataType";
import { formatEventToObject, formatMarketToObject, formatOutcomeToObject } from "@source/FormatPacket/formatPacketBodyToObject";
import { formatPacketHeader } from "@source/FormatPacket/formatPacketHeaderToObject";
import { Db } from "mongodb";

jest.mock('@source/FormatPacket/formatPacketHeaderToObject')
const mockFormatPacketHeader = formatPacketHeader as jest.MockedFunction<typeof formatPacketHeader>

jest.mock('@source/FormatPacket/createSinglePacketArray')
const mockCreateSinglePacketArray = createSinglePacketArray as jest.MockedFunction<typeof createSinglePacketArray>

jest.mock('@source/FormatPacket/formatPacketBodyToObject')
const mockFormatEventToObject = formatEventToObject as jest.MockedFunction<typeof formatEventToObject>;
const mockFormatMarketToObject = formatMarketToObject as jest.MockedFunction<typeof formatMarketToObject>;
const mockFormatOutcomeToObject = formatOutcomeToObject as jest.MockedFunction<typeof formatOutcomeToObject>;

const eventHeader = {
    msgId: 2054,
    operation: 'create',
    type: 'event',
    timestamp: 1497359166352
};

const eventArray = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];
const marketArray = ['61', 'create', 'market', '1695131740241', 'ff6b98da-c9e4-4209-8ccf-e3555b71ab32', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'Goal Handicap (-1)', '0', '1'];
const outcomeArray = ['62', 'create', 'outcome', '1695131740241', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'b4cd040b-c3dd-4a6a-9ad4-a4469358dc5d', 'Port Vale -1', '4/11', '0', '1'];

const marketHeader = {
    msgId: 2054,
    operation: 'create',
    type: 'market',
    timestamp: 1497359166352
};

const outcomeHeader = {
    msgId: 2054,
    operation: 'create',
    type: 'outcome',
    timestamp: 1497359166352
};

describe('determinePacketDataType', () => {
    const mDB = ({
        collection: jest.fn(),
      } as unknown) as Db;

    const collection = mDB.collection('test-collection')
    
    beforeEach(() => {
        jest.clearAllMocks();
    })
  it('should return event for an event packet', () => {
        mockFormatPacketHeader.mockReturnValue(eventHeader);
        mockCreateSinglePacketArray.mockReturnValue(eventArray);
        mockFormatEventToObject.mockImplementation(jest.fn());
        
        const eventPacket = '|2054|create|event|1497359166352|ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2|Football|Sky Bet League Two|\|Accrington\| vs \|Cambridge\||1497359216693|0|1|'
        determinePacketDataType([eventPacket], collection);
        
        expect(mockFormatEventToObject).toBeCalledWith(eventArray, eventHeader, collection);
        expect(mockFormatMarketToObject).not.toBeCalled();
        expect(mockFormatOutcomeToObject).not.toBeCalled();
    });

    it('should return market for a market packet', () => {
        mockFormatPacketHeader.mockReturnValue(marketHeader);
        mockCreateSinglePacketArray.mockReturnValue(marketArray);
        mockFormatEventToObject.mockImplementation(jest.fn());
        
        const marketPacket = '|2461|create|market|1695131919506|f397cbdb-4eef-48c7-b389-6c13df45b43c|35c3bade-c3b2-4acc-86c7-5dff7c7ff70c|Goal Handicap (+2)|0|1|'
        determinePacketDataType([marketPacket], collection);

        expect(mockFormatMarketToObject).toBeCalledWith(marketArray, marketHeader, collection);
        expect(mockFormatEventToObject).not.toBeCalled();
        expect(mockFormatOutcomeToObject).not.toBeCalled();
    });

    it('should return outcome for an outcome packet', () => {
        mockFormatPacketHeader.mockReturnValue(outcomeHeader);
        mockCreateSinglePacketArray.mockReturnValue(outcomeArray);
        mockFormatEventToObject.mockImplementation(jest.fn());
        
        const outcomePacket = '|2474|update|outcome|1695131920369|c293cafa-5c19-46ac-a472-5f8c9594782b|abab3502-dfe1-4e69-8df6-2241e49fc691|\|Milos Raonic\| to win a set|10/3|1|0|'
        determinePacketDataType([outcomePacket], collection);

        expect(mockFormatOutcomeToObject).toBeCalledWith(outcomeArray, outcomeHeader, collection);
        expect(mockFormatEventToObject).not.toBeCalled();
        expect(mockFormatEventToObject).not.toBeCalled();
    });
});

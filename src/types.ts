export type PacketHeader = {
    msgId: number;
    operation: string;
    type: string;
    timestamp: number;
};

export type EventPacket = {
    header: PacketHeader;
    body: EventBody;
}

export type EventBody = {
    eventId: string;
    category: string;
    subCategory: string;
    name: string;
    startTime: number;
    displayed: boolean;
    suspended: boolean;
    markets: MarketPacket[]
}

export type MarketPacket = {
    header: PacketHeader;
    body: MarketBody;
}

export type MarketBody = {
    eventId: string;
    marketId: string;
    name: string;
    displayed: boolean;
    suspended: boolean;
    outcomes: OutcomeBody[]
}

export type OutcomePacket = {
    header: PacketHeader;
    body: OutcomeBody;
}

export type OutcomeBody = {
    marketId: string;
    outcomeId: string;
    name: string;
    price: string;
    displayed: boolean;
    suspended: boolean;
}

import { EventPacket, MarketPacket, OutcomePacket } from '@source/types';
import * as mongoDb from 'mongodb';
import { isTooManyTries, retryAsync } from 'ts-retry';

export const storeEvent = async (collection: mongoDb.Collection, event: EventPacket) => {
    try {
      await collection.insertOne({event})
      console.log(`document created containing event with eventId ${event.body.eventId}`)      
    } catch (err) {
        console.log(`document creation unsuccessful for event with eventId ${event.body.eventId}:`, err)
    }
}
export const storeMarket = async (collection: mongoDb.Collection, market: MarketPacket) => {
    const eventId = market.body.eventId;
    const marketId = market.body.marketId;

    await collection.findOne({"event.body.eventId":{$regex:`${eventId}`}});

        try {
            await retryAsync(
              async () => {
                return await collection.findOne({"event.body.eventId":{$regex:`${eventId}`}})
              },
              {
                delay: 100,
                maxTry: 3,
                until: (doc) => doc._id !== null,
              }
            );
          } catch (err) {
            if (isTooManyTries(err)) {
              console.log(`could not find document for eventId ${eventId}:`, err)
            } else {
              console.log(`something went wrong trying to find document for eventId ${eventId}:`, err);
            }
          }

        try {
          await collection.updateOne({"event.body.eventId":{$regex:`${eventId}`}}, {$addToSet:{"event.body.markets":{market}}})
          console.log(`document updated with market with marketId ${marketId}`)
        } catch (err) {
          console.log(`document update unsuccessful for market with marketId ${marketId}:`, err)
        }

    
}

export const storeOutcome = async (collection: mongoDb.Collection, outcome: OutcomePacket) => {
    const marketId = outcome.body.marketId;
    const outcomeId = outcome.body.outcomeId;

    try {
        await retryAsync(
          async () => {
            const document = await collection.findOne({"event.body.markets":{
                "$elemMatch": { "market.body.marketId": marketId }
            }});
            return document
          },
          {
            delay: 100,
            maxTry: 3,
            until: (doc) => doc._id !== null,
          }
        );
      } catch (err) {
        if (isTooManyTries(err)) {
          console.log(`could not find document for marketId ${marketId}:`, err)
        } else {
          console.log(`something went wrong trying to find document for marketId ${marketId}:`, err);
        }
      }

    try {
      await collection.updateOne({"event.body.markets":{
          "$elemMatch": { "market.body.marketId": marketId }
      }}, {$addToSet:{"event.body.markets.$[market].market.body.outcomes":{outcome}}}, {
          arrayFilters: [
              {"market.market.body.marketId": marketId}
            ]
        })
      console.log(`document updated with outcome with outcomeId ${outcomeId}`)
    } catch (error) {
      console.log(`document update unsuccessful for outcome with outcomeId ${outcomeId}:`, error)
    }

}

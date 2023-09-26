"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbCollection = void 0;
const mongoDb = require("mongodb");
const createDbCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = "mongodb://localhost:27017/local";
    const dbClient = new mongoDb.MongoClient(uri);
    yield dbClient.connect();
    const database = dbClient.db('Feed_Me');
    const collection = database.collection('Feed_Me_Collection');
    return collection;
});
exports.createDbCollection = createDbCollection;
//# sourceMappingURL=createDbCollection.js.map
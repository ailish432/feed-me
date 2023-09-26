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
const net = require("net");
const determinePacketDataType_1 = require("./FormatPacket/determinePacketDataType");
const convertBufferToArray_1 = require("./FormatPacket/convertBufferToArray");
const createDbCollection_1 = require("./CreateDbCollection/createDbCollection");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = net.createConnection({
        host: "localhost",
        port: 8282
    }, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Connected to provider service");
    }));
    const databaseCollection = yield (0, createDbCollection_1.createDbCollection)();
    client.on("data", data => {
        const packets = (0, convertBufferToArray_1.convertBufferToArray)(data);
        (0, determinePacketDataType_1.determinePacketDataType)(packets, databaseCollection);
    });
    client.on("end", () => {
        console.log("Disconnected from provider service");
    });
});
start();
//# sourceMappingURL=app.js.map
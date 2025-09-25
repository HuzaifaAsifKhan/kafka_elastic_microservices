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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const express_server_1 = __importDefault(require("./express.server"));
const PORT = process.env.PORT || 3001;
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Your server initialization logic here
    express_server_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    process.on("SIGINT", () => {
        console.log("SIGINT signal received: closing HTTP server");
        process.exit(0);
    });
    process.on("SIGTERM", () => {
        console.log("SIGTERM signal received: closing HTTP server");
        process.exit(0);
    });
    process.on("uncaughtException", (err) => {
        console.error("There was an uncaught error", err);
        process.exit(8); //mandatory (as per the Node.js docs)
    });
});
exports.StartServer = StartServer;
(0, exports.StartServer)()
    .then((res) => {
    console.log("Server started successfully");
})
    .catch((err) => {
    console.error("Error starting server: ", err);
});

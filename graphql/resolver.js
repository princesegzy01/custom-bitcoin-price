"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return "Hello world!";
    },
    // calculate price resolver calculates prices for buy and cell action
    // based on margin and exchange rates
    calculatePrice: function (_a) {
        var type = _a.type, margin = _a.margin, exchangeRate = _a.exchangeRate;
        return __awaiter(this, void 0, void 0, function () {
            var marginPrice, totalPrice, currentBTCPrice, url, response, data, error_1, ngnPrice;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        marginPrice = 0.0;
                        totalPrice = 0;
                        currentBTCPrice = 0;
                        url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        response = _b.sent();
                        data = response.data;
                        // return an error if unnable to get the float rate.
                        if (!data.bpi.USD.rate_float) {
                            return [2 /*return*/, "Cannot get bitcoin flat rate"];
                        }
                        // set the current price from the BTC float field
                        currentBTCPrice = data.bpi.USD.rate_float;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        // return error if unnable to get response from the API call
                        return [2 /*return*/, "Unnable to fetch bitcoin price from coindesk API"];
                    case 4:
                        // return error if margin is greater than 1
                        if (margin > 1) {
                            return [2 /*return*/, "Margin cannot be greater than 1"];
                        }
                        // return error if margin is less than or equal to 0
                        if (margin <= 0) {
                            return [2 /*return*/, "Margiin cannot be lesser or equal to 0"];
                        }
                        // return error if type is not equal to buy or sell
                        if (type != "buy" && type != "sell") {
                            return [2 /*return*/, "Invalid type"];
                        }
                        // get margiin price from the currentBTC price
                        // by getting the margin percentage on the currentBTCPrice
                        marginPrice = currentBTCPrice * margin;
                        // if type is buy
                        // add the margin price to the current BTC price
                        if (type == "buy") {
                            totalPrice = currentBTCPrice + marginPrice;
                        }
                        // if type is sell
                        // remove marginPrice from currentBTC price.
                        if (type == "sell") {
                            totalPrice = currentBTCPrice - marginPrice;
                        }
                        ngnPrice = exchangeRate * totalPrice;
                        // return the naira equivalent of the price
                        return [2 /*return*/, ngnPrice.toFixed(2).toString()];
                }
            });
        });
    }
};
module.exports = root;
exports.default = root;

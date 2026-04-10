"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceRollClient = exports.DEFAULT_CONFIG = void 0;
exports.callReadOnly = callReadOnly;
exports.getTotalRolls = getTotalRolls;
exports.getUserRolls = getUserRolls;
exports.getUserLastResult = getUserLastResult;
exports.getLeaderboard = getLeaderboard;
exports.createRollCall = createRollCall;
const network_1 = require("@stacks/network");
const transactions_1 = require("@stacks/transactions");
exports.DEFAULT_CONFIG = {
    contractAddress: "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM",
    contractName: "dice-roll",
    apiBase: "https://api.mainnet.hiro.so",
    network: network_1.STACKS_MAINNET,
};
function resolveConfig(overrides = {}) {
    return { ...exports.DEFAULT_CONFIG, ...overrides };
}
function serializeCvToHex(cv) {
    const serialized = (0, transactions_1.serializeCV)(cv);
    if (typeof serialized === "string") {
        return serialized.startsWith("0x") ? serialized : `0x${serialized}`;
    }
    return `0x${Buffer.from(serialized).toString("hex")}`;
}
async function callReadOnly(functionName, args = [], config = {}) {
    const resolved = resolveConfig(config);
    const response = await fetch(`${resolved.apiBase}/v2/contracts/call-read/${resolved.contractAddress}/${resolved.contractName}/${functionName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender: resolved.contractAddress,
            arguments: args,
        }),
    });
    if (!response.ok) {
        throw new Error(`Read-only call failed with status ${response.status}`);
    }
    return response.json();
}
function normalizeLeaderboardValue(raw) {
    const entries = Array.isArray(raw) ? raw : [];
    return entries
        .map(item => {
        const entry = item && typeof item === "object" && "value" in item
            ? item.value
            : item;
        const record = entry;
        return {
            who: String(record?.who && typeof record.who === "object" ? record.who.value ?? "" : record?.who ?? ""),
            rolls: Number(record?.rolls && typeof record.rolls === "object"
                ? record.rolls.value ?? 0
                : record?.rolls ?? 0),
        };
    })
        .filter(entry => entry.who && entry.rolls > 0);
}
async function getTotalRolls(config = {}) {
    const data = await callReadOnly("get-total-rolls", [], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getUserRolls(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-rolls", [principalArg], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getUserLastResult(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-last-result", [principalArg], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getLeaderboard(config = {}) {
    const data = await callReadOnly("get-leaderboard", [], config);
    if (!data.okay || !data.result) {
        return [];
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return normalizeLeaderboardValue(parsed);
}
function createRollCall(config = {}) {
    const resolved = resolveConfig(config);
    return {
        contractAddress: resolved.contractAddress,
        contractName: resolved.contractName,
        functionName: "roll",
        functionArgs: [],
        postConditionMode: transactions_1.PostConditionMode.Deny,
        postConditions: [],
        network: resolved.network,
    };
}
class DiceRollClient {
    constructor(config = {}) {
        this.config = resolveConfig(config);
    }
    getTotalRolls() {
        return getTotalRolls(this.config);
    }
    getUserRolls(userAddress) {
        return getUserRolls(userAddress, this.config);
    }
    getUserLastResult(userAddress) {
        return getUserLastResult(userAddress, this.config);
    }
    getLeaderboard() {
        return getLeaderboard(this.config);
    }
    createRollCall() {
        return createRollCall(this.config);
    }
}
exports.DiceRollClient = DiceRollClient;

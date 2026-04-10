import type { DiceRollConfig, LeaderEntry, ReadOnlyResponse, RollCall } from "./types";
export declare const DEFAULT_CONFIG: Required<DiceRollConfig>;
export declare function callReadOnly(functionName: string, args?: string[], config?: DiceRollConfig): Promise<ReadOnlyResponse>;
export declare function getTotalRolls(config?: DiceRollConfig): Promise<number>;
export declare function getUserRolls(userAddress: string, config?: DiceRollConfig): Promise<number>;
export declare function getUserLastResult(userAddress: string, config?: DiceRollConfig): Promise<number>;
export declare function getLeaderboard(config?: DiceRollConfig): Promise<LeaderEntry[]>;
export declare function createRollCall(config?: DiceRollConfig): RollCall;
export declare class DiceRollClient {
    private readonly config;
    constructor(config?: DiceRollConfig);
    getTotalRolls(): Promise<number>;
    getUserRolls(userAddress: string): Promise<number>;
    getUserLastResult(userAddress: string): Promise<number>;
    getLeaderboard(): Promise<LeaderEntry[]>;
    createRollCall(): RollCall;
}

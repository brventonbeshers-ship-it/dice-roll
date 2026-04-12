import {
  createRollCall,
  getLeaderboard as getDiceLeaderboard,
  getTotalRolls as getDiceTotalRolls,
  getUserRolls as getDiceUserRolls,
  getUserLastResult as getDiceUserLastResult,
} from "dice-roll-sdk";

export const CONTRACT_ADDRESS = "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM";
export const CONTRACT_NAME = "dice-roll";
export const API_BASE = "https://api.mainnet.hiro.so";

const DICE_CONFIG = {
  contractAddress: CONTRACT_ADDRESS,
  contractName: CONTRACT_NAME,
  apiBase: API_BASE,
};

export type { LeaderEntry } from "dice-roll-sdk";

export async function connectWallet(
  onFinish: (addresses: { stacks: string }) => void
) {
  const { showConnect } = await import("@stacks/connect");
  showConnect({
    appDetails: {
      name: "Dice Roll",
      icon: "/icon.png",
    },
    onFinish: (data: any) => {
      const stacks = data.authResponsePayload?.profile?.stxAddress?.mainnet;
      if (stacks) {
        onFinish({ stacks });
      }
    },
    onCancel: () => {},
  });
}

export const getTotalRolls = () => getDiceTotalRolls(DICE_CONFIG);
export const getUserRolls = (userAddress: string) =>
  getDiceUserRolls(userAddress, DICE_CONFIG);
export const getUserLastResult = (userAddress: string) =>
  getDiceUserLastResult(userAddress, DICE_CONFIG);
export const getLeaderboard = () => getDiceLeaderboard(DICE_CONFIG);

export const fetchTotalRolls = getTotalRolls;
export const fetchUserRolls = getUserRolls;
export const fetchUserLastResult = getUserLastResult;
export const fetchLeaderboard = getLeaderboard;

export async function sendRoll(_senderAddress: string) {
  const { openContractCall } = await import("@stacks/connect");
  const args = createRollCall(DICE_CONFIG);

  return new Promise<boolean>((resolve) => {
    openContractCall({
      ...args,
      onFinish: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}

// perf: 1775828298179

// retry: 1775828429984

// retry: 1775871472743

// perf: 1775871553739

// perf: 1775920337906

// retry: 1775920427772

// retry: 1775966689802

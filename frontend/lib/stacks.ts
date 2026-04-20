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

// perf: 1775966693980

// perf: 1776046514593

// retry: 1776062919451

// perf: 1776063061384

// retry: 1776083839432

// perf: 1776084009515

// perf: 1776115997294

// retry: 1776116203140

// retry: 1776143814379

// perf: 1776143877101

// perf: 1776170676936

// retry: 1776170762129

// retry: 1776186093502

// perf: 1776186279108

// retry: 1776215253991

// perf: 1776215259179

// perf: 1776247730235

// retry: 1776247792791

// perf: 1776269737061

// retry: 1776269836300

// perf: 1776315496812

// retry: 1776315699320

// retry: 1776330982990

// perf: 1776331042087

// retry: 1776349723189

// perf: 1776349888033

// perf: 1776372543392

// retry: 1776372696058

// retry: 1776400868647

// perf: 1776401089294

// perf: 1776431901881

// retry: 1776431941908

// perf: 1776460503941

// retry: 1776460592898

// retry: 1776480118206

// perf: 1776480121466

// perf: 1776494065876

// retry: 1776494240117

// perf: 1776518766853

// retry: 1776518829763

// perf: 1776550091232

// retry: 1776550285292

// perf: 1776585702632

// retry: 1776585786706

// perf: 1776619602744

// retry: 1776619604976

// retry: 1776644682531

// perf: 1776644740005

// retry: 1776672763610

// perf: 1776679736127

// retry: 1776679888158

// import { ethers } from "ethers";
// import { tokens, pools } from "./contracts";
// import { Pool } from "../types";
// import coingecko from "api/coingecko";
// import { ChainId, Token, Fetcher, Route } from "@uniswap/sdk";
// import { formatEther } from "ethers/lib/utils";

// export async function getYieldsFor(account: string, pool: Pool, provider) {
//   let yieldResults: any = null;
//   switch (pool.name) {
//     case "ZZZ": {
//       yieldResults = null;
//       break;
//     }
//     case "NAP": {
//       yieldResults = null;
//       break;
//     }
//     case "NAP2": {
//       yieldResults = null;
//       break;
//     }
//     case "NAP3": {
//       yieldResults = await napYieldForZZZETHUni(pool, provider);
//       break;
//     }
//     case "NAP4": {
//       yieldResults = await ZZZNAPUniYieldForZZZ(pool, provider);
//       break;
//     }
//     case "NAP5": {
//       yieldResults = await napYieldForUNI(pool, account, provider);
//       break;
//     }
//     case "NAP6": {
//       yieldResults = await napYieldForZZZ(pool, account, provider);
//       break;
//     }
//     case "NAP7": {
//       yieldResults = await dreamYieldForZZZ(pool, account, provider);
//       break;
//     }
//     case "RUBY": {
//       yieldResults = await napYieldForCoval(pool, account, provider);
//       break;
//     }
//     case "DREAMNAP": {
//       yieldResults = await dreamYieldForNap(pool, account, provider);
//       break;
//     }
//     case "ZZZNAPDREAM": {
//       yieldResults = await dreamYieldForUni(pool, account, provider);
//       break;
//     }
//   }
//   return yieldResults;
// }

// async function dreamYieldForUni(pool, account, provider) {
//   const POOL = new ethers.Contract(pool.address, pool.abi, provider);
//   // Staking token address (LP TOKENS)
//   const STAKE_TOKEN = new ethers.Contract(
//     pool.token.address,
//     pool.token.abi,
//     provider
//   );
//   const totalStakedUNI = (await STAKE_TOKEN.balanceOf(POOL.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(POOL);
//   const rewardPerToken = weeklyReward / totalStakedUNI;
//   const dreamPrice = await getDREAMPrice(provider);
//   const UNIPrice = await ZZZNAPUNIPRICE(provider);
//   const weeklyROI = ((rewardPerToken * dreamPrice * 100) / UNIPrice).toFixed(2);
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// async function napYieldForZZZETHUni(pool, provider) {
//   const POOL_E = new ethers.Contract(pool.address, pool.abi, provider);

//   const ZZZ_ETH_UNI = new ethers.Contract(
//     tokens.ZZZETHUNI.address,
//     tokens.ZZZETHUNI.abi,
//     provider
//   );

//   // Weekly reward for the pool
//   const totalStakedUNI = (await ZZZ_ETH_UNI.balanceOf(pool.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(POOL_E);

//   const rewardPerToken = weeklyReward / totalStakedUNI;
//   const napPrice = await getNAPPrice(provider);
//   const uniPrice = await getUNIPrice(provider);
//   const weeklyROI = ((rewardPerToken * napPrice * 100) / uniPrice).toFixed(2);

//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// async function ZZZNAPUniYieldForZZZ(pool, provider) {
//   const POOL_E = new ethers.Contract(pool.address, pool.abi, provider);
//   const ZZZ_TOKEN = new ethers.Contract(
//     tokens.ZZZ.address,
//     tokens.ZZZ.abi,
//     provider
//   );

//   const UNIPrice = await ZZZNAPUNIPRICE(provider);
//   const totalStakedZZZ = (await ZZZ_TOKEN.balanceOf(POOL_E.address)) / 1e18;

//   const weeklyReward = await getUniPoolWeeklyRewards(POOL_E);

//   const rewardPerToken = weeklyReward / totalStakedZZZ;

//   const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");

//   const weeklyROI = ((rewardPerToken * UNIPrice * 100) / ZZZPrice.usd).toFixed(
//     2
//   );

//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }
// // async function uniYield(
// //   pool: Pool,
// //   account: string,
// //   provider
// // ): Promise<{ weeklyROI: string; yearlyROI: string; rewardPerToken: number }> {
// //   const POOL_B = new ethers.Contract(pool.address, pool.abi, provider);
// //   const ZZZ_TOKEN = new ethers.Contract(
// //     tokens.ZZZ.address,
// //     tokens.ZZZ.abi,
// //     provider
// //   );

// //   const ZZZ_ETH_UNI_POOL = new ethers.Contract(
// //     tokens.ZZZETHUNI.address,
// //     tokens.ZZZETHUNI.abi,
// //     provider
// //   );
// //   const WETH_TOKEN = new ethers.Contract(
// //     tokens.WETH.address,
// //     tokens.WETH.abi,
// //     provider
// //   );

// //   const totalWethInUNI =
// //     (await WETH_TOKEN.balanceOf(tokens.ZZZETHUNI.address)) / 1e18;

// //   const totalUniSupply = (await ZZZ_ETH_UNI_POOL.totalSupply()) / 1e18;

// //   const prices = await coingecko.getPricingFor(tokens.WETH.address, "USD");

// //   const ethPrice = prices.usd;
// //   const totalPoolValue = totalWethInUNI * ethPrice * 2;
// //   const UNIPrice = totalPoolValue / totalUniSupply;
// //   const totalStakedZZZ = (await ZZZ_TOKEN.balanceOf(POOL_B.address)) / 1e18;

// //   const weeklyReward = await getUniPoolWeeklyRewards(POOL_B);

// //   const rewardPerToken = weeklyReward / totalStakedZZZ;

// //   const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");

// //   const weeklyROI = ((rewardPerToken * UNIPrice * 100) / ZZZPrice.usd).toFixed(
// //     2
// //   );

// //   return {
// //     rewardPerToken,
// //     weeklyROI,
// //     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
// //   };
// // }

// async function getUniPoolWeeklyRewards(contract) {
//   const rewardRate = await contract.rewardRate();
//   return Math.round((rewardRate / 1e18) * 604800);
// }

// async function napYieldForUNI(
//   pool: Pool,
//   account: string,
//   provider
// ): Promise<{ weeklyROI: string; yearlyROI: string; rewardPerToken: number }> {
//   const POOL_C = new ethers.Contract(pool.address, pool.abi, provider);

//   const NAP_TOKEN = new ethers.Contract(
//     tokens.ZZZNAPUNI.address,
//     tokens.ZZZNAPUNI.abi,
//     provider
//   );

//   // Weekly reward for the pool
//   const totalStakedUNI = (await NAP_TOKEN.balanceOf(POOL_C.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(POOL_C);

//   const rewardPerToken = weeklyReward / totalStakedUNI;
//   const napPrice = await getNAPPrice(provider);
//   const uniPrice = await getZZZNAPUNIPrice(provider);
//   const weeklyROI = ((rewardPerToken * napPrice * 100) / uniPrice).toFixed(2);
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// export async function napYieldForCoval(
//   pool: Pool,
//   account: string,
//   provider
// ): Promise<{ weeklyROI: string; yearlyROI: string; rewardPerToken: number }> {
//   const POOL_C = new ethers.Contract(pool.address, pool.abi, provider);

//   const COVAL_ETH_UNI = new ethers.Contract(
//     tokens.COVALETHUNI.address,
//     tokens.COVALETHUNI.abi,
//     provider
//   );

//   // Weekly reward for the pool
//   const totalStakedUNI = (await COVAL_ETH_UNI.balanceOf(pool.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(POOL_C);

//   const rewardPerToken = weeklyReward / totalStakedUNI;
//   const napPrice = await getNAPPrice(provider);
//   const uniPrice = await getCOVALETHUNIPrice(provider);

//   const weeklyROI = ((rewardPerToken * napPrice * 100) / uniPrice).toFixed(2);
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// async function dreamYieldForNap(pool: Pool, account: string, provider) {
//   const DREAM_POOL = new ethers.Contract(pool.address, pool.abi, provider);
//   const NAP = new ethers.Contract(pool.token.address, pool.token.abi, provider);

//   const totalStakednap = (await NAP.balanceOf(DREAM_POOL.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(DREAM_POOL);

//   const rewardPerToken = weeklyReward / totalStakednap;

//   const napPrice = await getNAPPrice(provider);
//   const dreamPrice = await getDREAMPrice(provider);
//   const weeklyROI = ((rewardPerToken * dreamPrice * 100) / napPrice).toFixed(2);
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// async function dreamYieldForZZZ(pool: Pool, account: string, provider) {
//   const DREAM_POOL = new ethers.Contract(pool.address, pool.abi, provider);
//   const NAP = new ethers.Contract(pool.token.address, pool.token.abi, provider);

//   const totalStakednap = (await NAP.balanceOf(DREAM_POOL.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(DREAM_POOL);

//   const rewardPerToken = weeklyReward / totalStakednap;

//   const ZZZPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
//   const dreamPrice = await getDREAMPrice(provider);
//   const weeklyROI = (
//     (rewardPerToken * dreamPrice * 100) /
//     ZZZPrice.usd
//   ).toFixed(2);
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// async function napYieldForZZZ(
//   pool: Pool,
//   account: string,
//   provider
// ): Promise<{ weeklyROI: string; yearlyROI: string; rewardPerToken: number }> {
//   const POOL_D = new ethers.Contract(pool.address, pool.abi, provider);

//   const ZZZ = new ethers.Contract(tokens.ZZZ.address, tokens.ZZZ.abi, provider);

//   // Weekly reward for the pool
//   const totalStakedZZZ = (await ZZZ.balanceOf(POOL_D.address)) / 1e18;
//   const weeklyReward = await getUniPoolWeeklyRewards(POOL_D);

//   const rewardPerToken = weeklyReward / totalStakedZZZ;
//   const napPrice = await getNAPPrice(provider);
//   const ZZZPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");

//   const weeklyROI = ((rewardPerToken * napPrice * 100) / ZZZPrice.usd).toFixed(
//     2
//   );
//   return {
//     rewardPerToken,
//     weeklyROI,
//     yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
//   };
// }

// export async function getUNIPrice(provider) {
//   const ZZZ_ETH_UNI_POOL = new ethers.Contract(
//     tokens.ZZZETHUNI.address,
//     require("../misc/abi/uniswap_pool_abi.json"),
//     provider
//   );

//   const WETH_TOKEN = new ethers.Contract(
//     tokens.WETH.address,
//     tokens.WETH.abi,
//     provider
//   );

//   const totalWethInUNI =
//     (await WETH_TOKEN.balanceOf(tokens.ZZZETHUNI.address)) / 1e18;
//   const totalUniSupply = (await ZZZ_ETH_UNI_POOL.totalSupply()) / 1e18;
//   const ethPrice = await coingecko.getPricingFor(tokens.WETH.address, "USD");
//   const totalpoolValue = totalWethInUNI * ethPrice.usd * 2;
//   const UNIPrice = totalpoolValue / totalUniSupply;
//   return UNIPrice;
// }

// export async function ZZZNAPUNIPRICE(provider) {
//   const ZZZ_ETH_UNI_POOL = new ethers.Contract(
//     tokens.ZZZNAPUNI.address,
//     require("../misc/abi/uniswap_pool_abi.json"),
//     provider
//   );

//   const ZZZ_TOKEN = new ethers.Contract(
//     tokens.ZZZ.address,
//     tokens.ZZZ.abi,
//     provider
//   );

//   const totalZZZInUNI =
//     (await ZZZ_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
//   const totalUniSupply = (await ZZZ_ETH_UNI_POOL.totalSupply()) / 1e18;
//   const zzzPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
//   const totalpoolValue = totalZZZInUNI * zzzPrice.usd * 2;
//   const UNIPrice = totalpoolValue / totalUniSupply;
//   return UNIPrice;
// }

// // Get price of the ZZZ/NAP Uni token price
// export async function getZZZNAPUNIPrice(provider) {
//   const ZZZ_NAP_UNI_POOL = new ethers.Contract(
//     tokens.ZZZNAPUNI.address,
//     require("../misc/abi/uniswap_pool_abi.json"),
//     provider
//   );

//   const ZZZ_TOKEN = new ethers.Contract(
//     tokens.ZZZ.address,
//     tokens.ZZZ.abi,
//     provider
//   );

//   const totalZZZInUNI =
//     (await ZZZ_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
//   const totalUniSupply = (await ZZZ_NAP_UNI_POOL.totalSupply()) / 1e18;
//   const zzzPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
//   const totalpoolValue = totalZZZInUNI * zzzPrice.usd * 2;
//   const UNIPrice = totalpoolValue / totalUniSupply;
//   return UNIPrice;
// }

// export async function getCOVALETHUNIPrice(provider) {
//   const COVALETHPOOL = new ethers.Contract(
//     tokens.COVALETHUNI.address,
//     tokens.COVALETHUNI.abi,
//     provider
//   );

//   const COVAL_TOKEN = new ethers.Contract(
//     tokens.COVAL.address,
//     tokens.COVAL.abi,
//     provider
//   );

//   const totalCOVALinUNI =
//     (await COVAL_TOKEN.balanceOf(tokens.COVALETHUNI.address)) / 1e8;

//   const totalUniSupply = (await COVALETHPOOL.totalSupply()) / 1e18;
//   const covalPrice = await coingecko.getPricingFor(tokens.COVAL.address, "USD");
//   const totalpoolValue = totalCOVALinUNI * covalPrice.usd * 2;
//   const UNIPrice = totalpoolValue / totalUniSupply;
//   return UNIPrice;
// }

// // Get DREAM price
// export async function getDREAMPrice(provider) {
//   const WETH_TOKEN = new ethers.Contract(
//     tokens.WETH.address,
//     tokens.WETH.abi,
//     provider
//   );

//   const DREAM_TOKEN = new ethers.Contract(
//     tokens.DREAM.address,
//     tokens.DREAM.abi,
//     provider
//   );

//   // Get amount of ZZZ in ZZZ/NAP uni pool. The UNI token itself holds the number of zzz
//   const WETHBALANCE =
//     (await WETH_TOKEN.balanceOf(tokens.DREAMETH.address)) / 1e18;
//   // Get DREAM BALANCE
//   const DREAMBALANCE =
//     (await DREAM_TOKEN.balanceOf(tokens.DREAMETH.address)) / 1e18;
//   const WETHPrice = await coingecko.getPricingFor(WETH_TOKEN.address, "USD");
//   const DREAMPrice = (WETHBALANCE * WETHPrice.usd) / DREAMBALANCE;

//   return DREAMPrice;
// }

// // Get NAP price
// export async function getNAPPrice(provider) {
//   const ZZZ_TOKEN = new ethers.Contract(
//     tokens.ZZZ.address,
//     tokens.ZZZ.abi,
//     provider
//   );

//   const NAP_TOKEN = new ethers.Contract(
//     tokens.NAP.address,
//     tokens.NAP.abi,
//     provider
//   );

//   // Get amount of ZZZ in ZZZ/NAP uni pool. The UNI token itself holds the number of zzz
//   const zzzBalance =
//     (await ZZZ_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
//   // Get number of NAP
//   const napBalance =
//     (await NAP_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
//   // Price of zzz
//   const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");
//   const NAPPrice = (zzzBalance * ZZZPrice.usd) / napBalance;
//   return NAPPrice;
// }

// // export async function getTVL(provider) {
// //   const ZZZ_TOKEN = new ethers.Contract(
// //     tokens.ZZZ.address,
// //     tokens.ZZZ.abi,
// //     provider
// //   );

// //   const totalZZZinETHUNI =
// //     (await ZZZ_TOKEN.balanceOf(tokens.ZZZETHUNI.address)) / 1e18;
// //   const totalZZZinNAPPER =
// //     (await ZZZ_TOKEN.balanceOf(retired[2].address)) / 1e18;
// //   const totalZZZinNAPUNI =
// //     (await ZZZ_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
// //   const totalZZZinBALANCER =
// //     (await ZZZ_TOKEN.balanceOf("0x4f9dde745bf54f207dfc1fe34896d6752c63ad07")) /
// //     1e18;
// //   const totalZZZinDREAMER =
// //     (await ZZZ_TOKEN.balanceOf(retired[1].address)) / 1e18;
// //   const totalZZZinSNORE = (await ZZZ_TOKEN.balanceOf(pools[6].address)) / 1e18;
// //   const totalZZZinNAPPERv2 =
// //     (await ZZZ_TOKEN.balanceOf(pools[1].address)) / 1e18;
// //   const totalZZZinSHEEP = (await ZZZ_TOKEN.balanceOf(pools[0].address)) / 1e18;

// //   const total =
// //     totalZZZinBALANCER +
// //     totalZZZinDREAMER +
// //     totalZZZinETHUNI +
// //     totalZZZinNAPUNI +
// //     totalZZZinNAPPER +
// //     totalZZZinSNORE +
// //     totalZZZinNAPPERv2 +
// //     totalZZZinSHEEP;

// //   return total;
// // }

// export async function getTVL(provider) {
//   const naptotals = await getDREAMTVL(provider);
//   const zzztotals = await getZZZPOOLTVL(provider);
//   const retiredTotals = await getRetiredPoolAmounts(provider);
//   const totalTVL = zzztotals.total + naptotals.total + retiredTotals.total;

//   return {
//     totalZZZ: zzztotals.supply + retiredTotals.supply,
//     totalZZZTLV: zzztotals.total + retiredTotals.total,
//     totalNAP: naptotals.supply,
//     totalNAPTLV: naptotals.total,
//     totalTVL,
//   };
// }

// export async function getRetiredPoolAmounts(provider) {
//   const promises = retired.map(async (pool) => {
//     if (pool.token.name === "ZZZ") {
//       const poolContract = new ethers.Contract(
//         pool.address,
//         pool.abi,
//         provider
//       );
//       const totalSupply = (await poolContract.totalSupply()) / 1e18;
//       return totalSupply;
//     }
//   });

//   const results = await Promise.all(promises);
//   const ZZZPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
//   let totalZZZ = 0;
//   results.forEach((res) => {
//     if (res) {
//       totalZZZ = totalZZZ + res;
//     }
//   });

//   return {
//     supply: totalZZZ,
//     total: totalZZZ + ZZZPrice.usd,
//   };
// }

// export async function getDREAMTVL(provider) {
//   const poolContract = new ethers.Contract(
//     pools[2].address,
//     pools[2].abi,
//     provider
//   );
//   const totalNAP = (await poolContract.totalSupply()) / 1e18;
//   const NAPPrice = await getNAPPrice(provider);

//   return {
//     supply: totalNAP,
//     total: NAPPrice * totalNAP,
//   };
// }

// export async function getZZZPOOLTVL(provider) {
//   const ZZZ_TOKEN = new ethers.Contract(
//     tokens.ZZZ.address,
//     tokens.ZZZ.abi,
//     provider
//   );

//   const promises = pools.map(async (pool) => {
//     const poolContract = new ethers.Contract(pool.address, pool.abi, provider);
//     if (pool.token.name === "ZZZ") {
//       const amountInPool = await ZZZ_TOKEN.balanceOf(poolContract.address);
//       return parseFloat(formatEther(amountInPool));
//     } else if (pool.uniPairToken && pool.uniPairToken2) {
//       const amountInPool = (await poolContract.totalSupply()) / 1e18;
//       const UNI_PAIR_1 = new Token(
//         ChainId.MAINNET,
//         pool.uniPairToken.address,
//         18
//       );
//       const UNI_PAIR_2 = new Token(
//         ChainId.MAINNET,
//         pool.uniPairToken2.address,
//         18
//       );
//       const pair = await Fetcher.fetchPairData(UNI_PAIR_1, UNI_PAIR_2);
//       const route = new Route([pair], UNI_PAIR_1);
//       const UNI_PAIR_1_AMOUNT = route.midPrice.invert().toSignificant(6);
//       const divider = 1 / parseFloat(UNI_PAIR_1_AMOUNT);
//       return (amountInPool / divider) * 2;
//     }
//   });

//   const results = await Promise.all(promises);
//   const ZZZPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
//   let totalZZZ = 0;
//   results.forEach((res) => {
//     if (res) {
//       totalZZZ = totalZZZ + res;
//     }
//   });

//   return {
//     supply: totalZZZ,
//     total: totalZZZ * ZZZPrice.usd,
//   };
// }

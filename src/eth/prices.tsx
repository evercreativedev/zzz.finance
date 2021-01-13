import { ethers } from "ethers";
import coingecko from "api/coingecko";
import { Token, Pool, PoolType } from "types";
import { formatResult } from "helpers/utils";
import { tokens } from "./contracts";
import PriceStore from "stores/prices";
import { runInAction } from "mobx";
/**
 *
 * @param token the token we are looking the price for
 * @param provider web3 provider
 * @param uniToken the uni LP token
 * @param pairToken ther pair token in the UNI we can search a price for, for example ZZZNAP it would be ZZZ.
 */
export async function getPriceFor(token: Token, provider: any, uniToken: Token, pairToken: Token) {
  const price = PriceStore.prices.get(token.name);
  if (!PriceStore.canFetch() && price) {
    return price;
  }
  const res = await coingecko.getPricingFor(token.address, "USD");
  if (res && res.usd) {
    return parseFloat(res.usd);
  }
  if (!token.isLPToken) {
    if (pairToken.name === "UNIC") return 0;
    let price = await getPriceAgainst(token, pairToken, uniToken, provider);
    if (!price) {
      price = 0;
    }
    runInAction(() => PriceStore.prices.set(token.name, price));
    return price;
  }

  const STAKING_TOKEN = new ethers.Contract(token.address, token.abi, provider);

  const PAIR_TOKEN = new ethers.Contract(pairToken.address, pairToken.abi, provider);

  // Get amount of primary token in pair
  const PAIRBALANCE = formatResult(await PAIR_TOKEN.balanceOf(uniToken.address), token.decimals);
  //Get number of secondary token in pair
  const TOKENBALANCE = formatResult(await STAKING_TOKEN.balanceOf(uniToken.address), token.decimals);

  // Price of the opposite pair
  const PAIRPRICE = await coingecko.getPricingFor(pairToken.address, "USD");
  let TOKENPRICE = (PAIRBALANCE * PAIRPRICE.usd) / TOKENBALANCE;
  if (!TOKENPRICE || !isFinite(TOKENPRICE)) {
    TOKENPRICE = 0;
  }
  return TOKENPRICE;
}

export async function getUNIPrice(pool: Pool, provider: any) {
  const priceInStore = PriceStore.prices.get(pool.token.name);
  if (!PriceStore.canFetch() && priceInStore) {
    return priceInStore;
  }
  if (pool.poolType === PoolType.LP && pool.uniPairToken) {
    /* MAIN */
    const UNI_POOL = new ethers.Contract(pool.token.address, pool.token.abi, provider);

    const UNI_PAIR_TOKEN = new ethers.Contract(pool.uniPairToken.address, pool.uniPairToken.abi, provider);

    const TOTAL_PAIR_IN_UNI_POOL = formatResult(await UNI_PAIR_TOKEN.balanceOf(pool.token.address), pool.uniPairToken.decimals);

    const TOTAL_PAIR_SUPPLY = formatResult(await UNI_POOL.totalSupply(), pool.token.decimals);

    let UNI_PAIR_PRICE = PriceStore.prices.get(pool.uniPairToken.name);
    if (!UNI_PAIR_PRICE) {
      // Make  a query if not
      const results = await coingecko.getPricingFor(pool.uniPairToken.address, "USD");
      runInAction(() => PriceStore.prices.set(pool.uniPairToken!.name, results.usd));
      UNI_PAIR_PRICE = results.usd;
    }

    const TOTAL_POOL_VALUE = TOTAL_PAIR_IN_UNI_POOL * UNI_PAIR_PRICE! * 2;
    const UNIPRICE = TOTAL_POOL_VALUE / TOTAL_PAIR_SUPPLY;

    return UNIPRICE;
  }

  if (pool.poolType === PoolType.SingleTokenLPOutput && pool.uniPairToken) {
    const UNI_POOL = new ethers.Contract(pool.reward.address, pool.reward.abi, provider);

    const UNI_PAIR_TOKEN = new ethers.Contract(pool.uniPairToken.address, pool.uniPairToken.abi, provider);

    const TOTAL_PAIR_IN_UNI_POOL = formatResult(await UNI_PAIR_TOKEN.balanceOf(pool.reward.address), pool.uniPairToken.decimals);

    const TOTAL_PAIR_SUPPLY = formatResult(await UNI_POOL.totalSupply(), pool.reward.decimals);
    let UNI_PAIR_PRICE = PriceStore.prices.get(pool.uniPairToken.name);
    if (!UNI_PAIR_PRICE) {
      // Make  a query if not
      const results = await coingecko.getPricingFor(pool.uniPairToken.address, "USD");
      runInAction(() => PriceStore.prices.set(pool.uniPairToken!.name, results.usd));
      UNI_PAIR_PRICE = results.usd;
    }

    const TOTAL_POOL_VALUE = TOTAL_PAIR_IN_UNI_POOL * UNI_PAIR_PRICE! * 2;
    const UNIPRICE = TOTAL_POOL_VALUE / TOTAL_PAIR_SUPPLY;
    runInAction(() => PriceStore.prices.set(pool.token.name, UNIPRICE));

    return UNIPRICE;
  }
  return 0;
}

// Get DREAM price
export async function getDREAMPrice(provider: any) {
  const WETH_TOKEN = new ethers.Contract(tokens.WETH.address, tokens.WETH.abi, provider);

  const DREAM_TOKEN = new ethers.Contract(tokens.DREAM.address, tokens.DREAM.abi, provider);

  // Get amount of ZZZ in ZZZ/NAP uni pool. The UNI token itself holds the number of zzz
  const WETHBALANCE = (await WETH_TOKEN.balanceOf(tokens.DREAMETH.address)) / 1e18;
  // Get DREAM BALANCE
  const DREAMBALANCE = (await DREAM_TOKEN.balanceOf(tokens.DREAMETH.address)) / 1e18;
  const WETHPrice = await coingecko.getPricingFor(WETH_TOKEN.address, "USD");
  const DREAMPrice = (WETHBALANCE * WETHPrice.usd) / DREAMBALANCE;

  return DREAMPrice;
}

// Get DREAM price
export async function getCORDPrice(provider: any) {
  const WETH_TOKEN = new ethers.Contract(tokens.WETH.address, tokens.WETH.abi, provider);

  const CORD_TOKEN = new ethers.Contract(tokens.CORD.address, tokens.CORD.abi, provider);

  // Get amount of ZZZ in ZZZ/NAP uni pool. The UNI token itself holds the number of zzz
  const WETHBALANCE = (await WETH_TOKEN.balanceOf(tokens.CORDETH.address)) / 1e18;
  // Get DREAM BALANCE
  const CORDBALANCE = (await CORD_TOKEN.balanceOf(tokens.CORDETH.address)) / 1e18;
  const WETHPrice = await coingecko.getPricingFor(WETH_TOKEN.address, "USD");
  const CORDPrice = (WETHBALANCE * WETHPrice.usd) / CORDBALANCE;

  return CORDPrice;
}

// Get NAP price
export async function getNAPPrice(provider: any) {
  const ZZZ_TOKEN = new ethers.Contract(tokens.ZZZ.address, tokens.ZZZ.abi, provider);

  const NAP_TOKEN = new ethers.Contract(tokens.NAP.address, tokens.NAP.abi, provider);

  // Get amount of ZZZ in ZZZ/NAP uni pool. The UNI token itself holds the number of zzz
  const zzzBalance = (await ZZZ_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
  // Get number of NAP
  const napBalance = (await NAP_TOKEN.balanceOf(tokens.ZZZNAPUNI.address)) / 1e18;
  // Price of zzz
  const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");
  const NAPPrice = (zzzBalance * ZZZPrice.usd) / napBalance;
  return NAPPrice;
}

// Get price against token
export async function getPriceAgainst(token: Token, againstToken: Token, uniToken: Token, provider: any) {
  const price = PriceStore.prices.get(token.name);
  if (!PriceStore.canFetch() && price) return price;
  if (!provider) return 0;
  // If againstToken is not found use WETH.
  if (!againstToken) {
    againstToken = tokens.WETH;
  }
  // Initialize contract for the against token
  const AGAINST_TOKEN = new ethers.Contract(againstToken.address, againstToken.abi, provider);

  // Initialize contract for the target token
  const TOKEN_TO_GET_PRICE_FOR = new ethers.Contract(token.address, token.abi, provider);

  // Get amount of against token in pool. The UNI token itself holds the number.
  const AGAINST_TOKEN_BALANCE = formatResult(await AGAINST_TOKEN.balanceOf(uniToken.address), uniToken.decimals);

  // Get target token balance. The UNI token itself holds the number.
  const TOKEN_TO_GET_PRICE_FOR_BALANCE = formatResult(
    await TOKEN_TO_GET_PRICE_FOR.balanceOf(uniToken.address),
    uniToken.decimals
  );

  // Get the against token price.
  let AGAINST_TOKEN_PRICE = PriceStore.prices.get(againstToken.name);
  if (!AGAINST_TOKEN_PRICE) {
    const result = await coingecko.getPricingFor(AGAINST_TOKEN.address, "USD");
    AGAINST_TOKEN_PRICE = result.usd;
  }

  // Get the target price.
  const TARGETPRICE = (AGAINST_TOKEN_BALANCE * AGAINST_TOKEN_PRICE!) / TOKEN_TO_GET_PRICE_FOR_BALANCE;

  runInAction(() => PriceStore.prices.set(token.name, TARGETPRICE));

  return TARGETPRICE;
}

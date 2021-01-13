import { observable, action, runInAction, autorun } from "mobx";
import { formatEther } from "ethers/lib/utils";
import { getERC20balance } from "eth/methods";
import EthStore from "stores/eth";
import coingecko from "api/coingecko";
import { getUNIPrice, getPriceAgainst } from "eth/prices";
import { pools } from "eth/contracts";
import { PoolType } from "types";

class Prices {
  @observable prices: Map<string, number> = new Map();
  @observable balances: Map<string, any> = new Map();

  lastTimeFetched: number | null;

  constructor() {
    const pricesCache = localStorage.getItem("zzz-prices");
    const balancesCache = localStorage.getItem("zzz-balances");
    const lastTimeFetched = localStorage.getItem("zzz-prices-fetched");

    if (pricesCache && lastTimeFetched) {
      const prices = JSON.parse(pricesCache);
      this.lastTimeFetched = parseInt(JSON.parse(lastTimeFetched));
      this.prices = new Map(Object.entries(prices));
    } else {
      this.lastTimeFetched = null;
    }
    if (balancesCache) {
      const balances = JSON.parse(balancesCache);
      this.balances = new Map(Object.entries(balances));
    }
    autorun(this.syncToStorage);
  }

  canFetch = () => !this.lastTimeFetched || this.lastTimeFetched + 30000 < Date.now();

  syncToStorage = () => {
    localStorage.setItem("zzz-prices", JSON.stringify(this.prices));
    localStorage.setItem("zzz-balances", JSON.stringify(this.balances));
  };

  @action fetchBalances = async (account: string, provider: any) => {
    const tokens = EthStore.getTokensForNetwork();
    for (const [, token] of Object.entries(tokens)) {
      token.name !== "WETH" &&
        getERC20balance(account, token, provider).then((val) => {
          runInAction(() => this.balances.set(token.name, val));
        });
    }
    provider.getBalance(account).then((balance: any) => {
      const etherAmount = formatEther(balance);
      const number = parseFloat(etherAmount);
      runInAction(() => this.balances.set("WETH", number));
    });
  };

  @action fetchPrices = async (provider: any) => {
    const tokens = EthStore.getTokensForNetwork();
    console.log("Checking if we need to fetch prices");
    if (EthStore.networkName !== "homestead") return;
    if (this.canFetch()) {
      console.log("Fetching prices");
      const addresses: any[] = [];

      for (const [key, value] of Object.entries(tokens)) {
        addresses.push([key, value.address.toLowerCase()]);
      }

      // Make the query
      const coinGeckoQuery = addresses.map((token) => `${token[1]},`).join();
      const result: any[] = await coingecko.getPricingFor(coinGeckoQuery, "USD", true);
      for (const [key, value] of Object.entries(result)) {
        addresses.forEach((token) => {
          const tokenName = token[0];
          const tokenAddr = token[1];
          if (tokenAddr === key.toLowerCase()) {
            runInAction(() => this.prices.set(tokenName, value.usd));
          }
        });
      }

      const NAPPrice = await getPriceAgainst(tokens.NAPV2, tokens.ZZZV2, tokens.ZZZNAPV2, provider);
      runInAction(() => this.prices.set("NAPV2", NAPPrice));

      const uniPricePromises = pools
        .filter((pool) => pool.poolType === PoolType.LP)
        .map(async (pool) => {
          const uniPrice = await getUNIPrice(pool, provider);
          runInAction(() => this.prices.set(pool.token.name, uniPrice));
          return;
        });

      await Promise.all(uniPricePromises);

      const dreamPrice = await getPriceAgainst(tokens.DREAM, tokens.WETH, tokens.DREAMETH, provider);
      runInAction(() => this.prices.set("DREAM", dreamPrice));
      this.lastTimeFetched = Date.now();
      localStorage.setItem("zzz-prices-fetched", JSON.stringify(this.lastTimeFetched));
    } else {
      console.log("Price cache hit");
    }
  };
}

export default new Prices();

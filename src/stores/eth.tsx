import { observable, action, runInAction } from "mobx";
import { ethers } from "ethers";
import PriceStore from "stores/prices";
import PoolStore from "stores/pools";
import { pools, kovanPools } from "eth/contracts";
import { tokens, kovanTokens } from "eth/contracts";
import debounce from "lodash.debounce";

const defaultNetwork = "homestead";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider(defaultNetwork, {
  etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY,
});

class Eth {
  @observable provider: any = provider;
  @observable networkName: string = "unknown";
  @observable currentBlock: number = 0;
  @observable signer: any = null;
  @observable account: any = null;

  @action initialize = async (account: string, provider: any) => {
    this.account = account;
    this.provider = provider;
    const signer = await provider.getSigner();
    runInAction(() => (this.signer = signer));
  };

  @action updateBlockNumber = (newBlock: number) => {
    if (newBlock - this.currentBlock > 2) {
      console.log("ZZZ *** block update");
      this.currentBlock = newBlock;
      const getPrices = debounce(PriceStore.fetchPrices, 2000, {
        leading: false,
        trailing: true,
      });
      getPrices(this.provider);
    }
  };

  @action changeProvider = async (account: string, provider: any) => {
    console.log("ZZZ *** changing provider", provider);
    this.provider = provider;
    const { name } = await provider.getNetwork();
    this.networkName = name;
    this.updatePricingData(account, provider);
    this.signer = await provider.getSigner();
    provider.off("block");
    provider.on("block", debounce(this.updateBlockNumber, 1000, { leading: false, trailing: true }));
  };

  updatePricingData = (account: string, library: any) => {
    PriceStore.fetchBalances(account, library);
    PriceStore.fetchPrices(library);
    PoolStore.getAllUserPoolData(account, library);
  };

  getTokensForNetwork = () => {
    switch (this.networkName) {
      case "kovan": {
        return kovanTokens;
      }
      default: {
        return tokens;
      }
    }
  };

  getPoolsForNetwork = () => {
    switch (this.networkName) {
      case "kovan": {
        return kovanPools;
      }
      default: {
        return pools;
      }
    }
  };
}

export default new Eth();

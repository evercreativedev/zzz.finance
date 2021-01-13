import { ChainId, Token, Fetcher, TokenAmount } from "@uniswap/sdk";
import ethers from "ethers";
import { Pool } from "types";
import { getTotalSupply } from "helpers/utils";

export async function getUnderlyingAssets(poolData: Pool, provider: any) {
  if (poolData.uniPairToken && poolData.uniPairToken2) {
    const poolContract = new ethers.Contract(
      poolData.address,
      poolData.abi,
      provider
    );
    const uniTokenContract = new ethers.Contract(
      poolData.token.address,
      poolData.token.abi,
      provider
    );
    const uniToken = new Token(ChainId.MAINNET, poolData.token.address, 18);
    const total = await getTotalSupply(poolContract, poolData);
    const uniTotal = await uniTokenContract.totalSupply();

    const totalSupplyInPool = new TokenAmount(uniToken, total);
    const totalSupplyInUNIPool = new TokenAmount(uniToken, uniTotal);

    const uniPair1 = new Token(
      ChainId.MAINNET,
      poolData.uniPairToken.address,
      poolData.uniPairToken.decimals
    );

    const uniPair2 = new Token(
      ChainId.MAINNET,
      poolData.uniPairToken2.address,
      poolData.uniPairToken2.decimals
    );

    const pair = await Fetcher.fetchPairData(uniPair1, uniPair2, provider);
    const uniPair1Amount = pair.getLiquidityValue(
      uniPair1,
      totalSupplyInUNIPool,
      totalSupplyInPool
    );
    const uniPair2Amount = pair.getLiquidityValue(
      uniPair2,
      totalSupplyInUNIPool,
      totalSupplyInPool
    );

    return {
      token1: parseFloat(uniPair1Amount.toFixed(2)),
      token2: parseFloat(uniPair2Amount.toFixed(2)),
    };
  }
}

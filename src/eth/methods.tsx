import React from "react";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { Pool, Token } from "../types";
import AppToast from "components/AppToast/AppToast";
import { toast } from "react-toastify";
import { formatResult, noExponents } from "helpers/utils";
import PriceStore from "stores/prices";
import "react-toastify/dist/ReactToastify.css";

export async function getERC20balance(address: string, token: Token, provider: any) {
  const contract = new ethers.Contract(token.address, token.abi, provider);
  const result = formatResult(await contract.balanceOf(address), token.decimals);
  return result;
}

export async function getCurrentTotalStake(address: string, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  return formatResult(await contract.totalSupply(), pool.token.decimals);
}

export async function stake(pool: Pool, signer: any, amount: number, setStakeAmount: Function) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending stake transaction confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const stakeToast = "stakeToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  const stakeAmount = parseUnits(noExponents(amount).toString(), pool.token.decimals);
  const tx = await contract.stake(stakeAmount);
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Staking.. " />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: stakeToast,
  });
  await tx.wait();

  toast.dismiss(stakeToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🤑 Staking complete." />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: stakeToast,
  });

  setStakeAmount(0);
  return true;
}

export async function maxStake(pool: Pool, signer: any, account: string, provider: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending maximum stake confirmation." />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const stakeToast = "stakeToast";
  const token = new ethers.Contract(pool.token.address, pool.token.abi, provider);

  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  const amount = await token.balanceOf(account);
  let tx = await contract.stake(amount);
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Staking.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: stakeToast,
  });
  await tx.wait();

  toast.dismiss(stakeToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🤑 Max stake complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: stakeToast,
  });

  return true;
}

export async function withdraw(pool: Pool, signer: any, amount: number, setStakeAmount: Function) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending withdrawal confirmation." />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const withdrawToast = "withdrawToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  const withdrawAmount = parseUnits(noExponents(amount).toString(), pool.token.decimals);
  const tx = await contract.withdraw(withdrawAmount);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Processing withdrawal" />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: withdrawToast,
  });
  await tx.wait();

  toast.dismiss(withdrawToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Withdrawal complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: withdrawToast,
  });

  setStakeAmount(0);
  return;
}

export async function maxWithdraw(pool: Pool, signer: any, provider: any, account: string) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending max withdrawal confirmation." />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const withdrawToast = "withdrawToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  const tx = await contract.withdraw(await contract.balanceOf(account));
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Withdrawing.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: withdrawToast,
  });
  await tx.wait();

  toast.dismiss(withdrawToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Max withdrawal complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: withdrawToast,
  });
  return;
}

export async function claim(pool: Pool, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending claim confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const claimToast = "claimToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  let tx = await contract.getReward();
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Claiming rewards.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: claimToast,
  });
  await tx.wait();

  toast.dismiss(claimToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Claim complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: claimToast,
  });
  return;
}

export async function exit(pool: Pool, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending exit confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const exitToast = "exitToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  let tx = await contract.exit();

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Exiting.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: exitToast,
  });
  await tx.wait();

  toast.dismiss(exitToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="👋 Exit complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: exitToast,
  });
  return;
}

export async function getStakedBalance(address: string, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  return formatResult(await contract.balanceOf(address), pool.token.decimals);
}

export async function checkNormalAllowance(address: string, target: Token, account: string, provider: any) {
  const contract = new ethers.Contract(target.address, target.abi, provider);
  const res = await contract.allowance(account, address);
  const allowance = formatResult(res, target.decimals);
  console.log(allowance);
  return allowance > 0;
}

export async function checkAllowance(address: string, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.token.address, pool.token.abi, provider);
  const res = await contract.allowance(address, pool.address);
  const allowance = formatResult(res, pool.token.decimals);
  return allowance > 0;
}

export async function getBoostCosts(address: string, pool: Pool, provider: any) {
  if (pool.boostToken && pool.boostLevels) {
    const contract = new ethers.Contract(pool.address, pool.abi, provider);
    const tokensSpent = await contract.getSpent(address);
    const promises = pool.boostLevels.map(({ level }) => contract.calculateCost(level));

    const costs = await Promise.all(promises);

    const decimals = pool.boostToken.decimals;
    const results = costs.map((levelCost) => formatResult(levelCost, decimals) - formatResult(tokensSpent, decimals));
    return results;
  }
}

export async function boost(level: number, pool: Pool, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="Waiting boost confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const boostToast = "boostToast";
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  let tx = await contract.purchase(level);
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Boosting.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: boostToast,
  });
  await tx.wait();

  toast.dismiss(boostToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🤑 Boost complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: boostToast,
  });
  return;
}

export async function getBoostLevel(address: string, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  return parseInt(await contract.getLevel(address));
}

export async function checkBoostAllowance(address: string, pool: Pool, provider: any) {
  if (pool.boostToken) {
    const contract = new ethers.Contract(pool.boostToken.address, pool.boostToken.abi, provider);
    return formatResult(await contract.allowance(address, pool.address), pool.token.decimals) > 0;
  } else {
    return false;
  }
}

export async function getTokensSpentOnBoost(address: string, pool: Pool, provider: any) {
  if (pool.boostToken) {
    const contract = new ethers.Contract(pool.address, pool.abi, provider);
    return formatResult(await contract.getSpent(address), pool.boostToken.decimals);
  }
}

export async function getBoostMultiplier(address: string, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  return formatResult(await contract.getTotalMultiplier(address), 18);
}

export async function getBoostAllowance(address: string, pool: Pool, signer: any) {
  if (pool.boostToken) {
    toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending boost token approval" />, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
    });
    const boostAllowanceToast = "boostAllowanceToast";
    const contract = new ethers.Contract(pool.boostToken.address, pool.boostToken.abi, signer);
    let wei = ethers.utils.parseEther("99999999999");
    let tx = await contract.approve(pool.address, wei);
    toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Approving boost token.. " />, {
      position: "top-left",
      autoClose: false,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
      toastId: boostAllowanceToast,
    });
    await tx.wait();

    toast.dismiss(boostAllowanceToast);

    toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Boost token approval complete" />, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
      toastId: boostAllowanceToast,
    });
  }
  return;
}

export async function getAllowance(pool: Pool, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending allowance confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const allowanceToast = "allowanceToast";
  const contract = new ethers.Contract(pool.token.address, pool.token.abi, signer);
  let wei = ethers.utils.parseEther("99999999999");
  let tx = await contract.approve(pool.address, wei);
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Approving token usage.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  await tx.wait();

  toast.dismiss(allowanceToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Token approval complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  return;
}

export async function getAllowanceQuick(token: Token, target: string, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message="🥱 Pending allowance confirmation" />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const allowanceToast = "allowanceToast";
  const contract = new ethers.Contract(token.address, token.abi, signer);

  let wei = ethers.utils.parseEther("99999999999");
  let tx = await contract.approve(target, wei);
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Approving token usage.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  await tx.wait();

  toast.dismiss(allowanceToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Token approval complete" />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  return true;
}

export async function swapV1toV2(token: Token, signer: any) {
  toast(<AppToast spinnerCondition={true} txId={""} message={`🥱 Pending swap ${token.name} confirmation`} />, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
  });
  const allowanceToast = "allowanceToast";
  const contract = new ethers.Contract(token.address, token.abi, signer);
  const v1 = await contract.V1();
  console.log(v1);

  let tx = await contract.swapV1toV2();
  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="🔮 Swapping.." />, {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  await tx.wait();

  toast.dismiss(allowanceToast);

  toast(<AppToast spinnerCondition={true} txId={tx.hash} message="✅ Swap complete " />, {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    progress: undefined,
    closeOnClick: false,
    toastId: allowanceToast,
  });
  return;
}

export async function getRewardsAvailable(address: any, pool: Pool, provider: any) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  const tokens = formatResult(await contract.earned(address), pool.reward.decimals);
  const rewardUSDPrice = PriceStore.prices.get(pool.reward.name);
  let USDRewards = 0;
  if (rewardUSDPrice) {
    USDRewards = tokens * rewardUSDPrice;
  }
  return {
    tokens,
    USDRewards,
  };
}

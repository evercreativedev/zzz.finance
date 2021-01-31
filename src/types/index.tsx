export type Pool = {
  id: string;
  name: string;
  address: string;
  abi: string;
  poolIcon: any;
  token: Token;
  boostToken?: Token;
  reward: Token;
  rewardTokenPair: Token;
  uniPairToken: Token;
  uniPairToken2?: Token;
  poolStatus: PoolStatus;
  uniToken: Token;
  poolType: PoolType;
  info: string;
  purchaseFrom: string;
  burst?: boolean;
  category: PoolCategory;
  boostLevels?: BoostLevel[];
  poolIconType?: PoolIconType;
  statusText?: string;
  usesNewAbi?: boolean;
  partnerName?: string;
  hasEffectiveStake?: boolean;
  isMigrationPool?: boolean;
  v4?: boolean;
  boostTokens?: Token[];
  startTime?: number;
};

export type BoostLevel = {
  level: number;
  percentage: string;
};

export type BoostInfo = {
  currentLevel: number;
  costs: number[];
  token: Token;
  hasAllowance: boolean;
  tokenAmount: number;
  multiplier: number;
};

export type UserPoolData = {
  id: string;
  staked: number;
  multiplier?: number;
  boostLevel?: number;
  rewards: {
    tokens: number;
    USDRewards: number;
  };
  hasAllowance: boolean;
  hasBoostAllowance?: boolean;
  tokenAmount: number;
  boostTokenAmount?: number;
  boostCosts?: number[];
  boostInfoV4?: BoostInfo[];
};

export type TimerData = {
  total: any;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type BasePoolData = {
  name: string;
  staked: number;
  underlyingTokens: UnderlyingTokens;
  TVL: number;
  APY: any;
  icon: any;
  id: string;
  stakingToken: Token;
  migrationStatus?: number;
};

export type LoaderTypes =
  | "Audio"
  | "BallTriangle"
  | "Bars"
  | "Circles"
  | "Grid"
  | "Hearts"
  | "Oval"
  | "Puff"
  | "Rings"
  | "TailSpin"
  | "ThreeDots"
  | "Watch"
  | "RevolvingDot"
  | "Triangle"
  | "Plane"
  | "MutatingDots"
  | "None"
  | "NotSpecified";

export type UnderlyingTokens = {
  token1: number;
  token2?: number;
};

export enum PoolType {
  LP = 1,
  SingleToken,
  SingleTokenLPOutput,
  Multi,
}

export enum PoolCategory {
  ZZZ = 1,
  Migration,
  Partners,
  Retired,
}

export enum PoolIconType {
  Emoji = 1,
  Image,
}

export enum PoolStatus {
  Incoming = 0,
  Ongoing,
  Retired,
  Closed,
}

export type Token = {
  name: string;
  address: string;
  abi: string;
  decimals: number;
  isLPToken?: boolean;
  purchaseFrom?: string;
};

export type Yields = {
  weeklyROI: any;
  dailyROI: any;
  yearlyROI: any;
  rewardPerToken: any;
};

export type VaultBoostData = {
  levels: number[];
  costs: number[][];
};

export type VaultUserInfo = {
  amount: number; // How many tokens the user has provided.
  ZZZRewardDebt: number; // Reward debt. See explanation below.
  NAPRewardDebt: number; // Reward debt. See explanation below.
  timelockEnd: number;
  timelockBoost: number;
  boostAmount: number;
  APY: number;
  hasAllowance: boolean;
  zzzRewards: number;
  napRewards: number;
  stakeBalance: number;
};

export type VaultInfo = {
  token: any; // Staking token contract.
  epoch: number;
  epochStartBlock: number;
  allocPointZZZ: number; // How many allocation points assigned to this vault. NAPs to distribute per block.
  allocPointNAP: number; // How many allocation points assigned to this vault. NAPs to distribute per block.
  accZZZPerShare: number; // Accumulated NAPs per share, times 1e12. See below.
  accNAPPerShare: number; // Accumulated NAPs per share, times 1e12. See below.
  withdrawable: boolean; // Is this vault withdrawable?
  totalTimelockBoost: number; // Timelocked
  totalEffective: number; // Epoch -> Pools total effective
  totalStaked: number;
  ZZZPerBlock: number;
  NAPPerBlock: number;
};

import CordIcon from "../assets/cord.png";
import sslIcon from "../assets/ssl_logo.png";
import level2Icon from "../assets/level_2.svg";
import catSmallIcon from "../assets/cat_smaller.png";

import { Pool, Token, PoolStatus, PoolType, PoolCategory, BoostLevel, PoolIconType } from "../types";

const boostLevels: { [key: string]: BoostLevel[] } = {
  normal: [
    { level: 1, percentage: "10%" },
    { level: 2, percentage: "20%" },
    { level: 3, percentage: "40%" },
  ],
  extended: [
    { level: 1, percentage: "10%" },
    { level: 2, percentage: "20%" },
    { level: 3, percentage: "30%" },
    { level: 4, percentage: "50%" },
    { level: 5, percentage: "75%" },
    { level: 6, percentage: "100%" },
  ],
  new: [
    { level: 1, percentage: "5%" },
    { level: 2, percentage: "10%" },
    { level: 3, percentage: "15%" },
    { level: 4, percentage: "25%" },
    { level: 5, percentage: "30%" },
    { level: 6, percentage: "40%" },
  ],
};

// Mainnet tokens
export const tokens: { [tokenName: string]: Token } = {
  ZZZ: {
    name: "ZZZ",
    address: "0xc75F15AdA581219c95485c578E124df3985e4CE0",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  ZZZV2: {
    name: "ZZZV2",
    address: "0x93ED140172Ff226daD1F7F3650489b8Daa07aE7F",
    abi: require("./abi/zzzv2.json"),
    decimals: 18,
  },
  NAPV2: {
    name: "NAPV2",
    address: "0xBc35D7753f0Db8Fb9c788b7d7d284cDd78A4EdE3",
    abi: require("./abi/napv2.json"),
    decimals: 18,
    purchaseFrom: "https://info.uniswap.org/pair/0x5c599e277c981d796dbf94c6e79ddac610d6052b",
  },
  BPT: {
    name: "BPT",
    address: "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  ZZZETH: {
    name: "ZZZETHLP",
    address: "0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    abi: require("./abi/erc20_abi.json"),
    isLPToken: true,
    decimals: 18,
  },
  ZZZNAP: {
    name: "ZZZNAPLP",
    // Change this
    address: "0x0DE0322D3ac0d5002e2bc9c3a188728728D90799",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  ZZZNAPV2: {
    name: "ZZZNAPLPV2",
    // Change this
    address: "0x5c599e277c981d796dbf94c6e79ddac610d6052b",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  ZZZETHV2: {
    name: "ZZZETHLPV2",
    // Change this
    address: "0x4b29ed4190d8387755510feee729fbc974152a0c",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  DREAMETH: {
    name: "DREAMETHLP",
    address: "0x19b3de48392778f8e6ef332fee002aa5e15fe41a",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  DREAM: {
    name: "DREAM",
    address: "0xa93D5Cfaa41193b13321c035b4bDD2B534172762",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://info.uniswap.org/pair/0x19b3de48392778f8e6ef332fee002aa5e15fe41a",
  },
  WETH: {
    name: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  DAI: {
    name: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://info.uniswap.org/pair/0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
  },
  NAP: {
    name: "NAP",
    address: "0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  // NAPV2: {
  //   name: "NAPV2",
  //   address: "",
  //   abi: require("./abi/erc20_abi.json"),
  //   decimals: 18,
  // },
  COVAL: {
    name: "COVAL",
    address: "0x3d658390460295fb963f54dc0899cfb1c30776df",
    abi: require("./abi/erc20_abi.json"),
    decimals: 8,
  },
  COVALETH: {
    name: "COVALETHLP",
    address: "0x3bf1b837ccc1f62114a3e74ced4fcfb121d7e52a",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  CORD: {
    name: "CORD",
    address: "0x74Fb9DA15d4f9a34D8C825798DA0Fa5c400DadE1",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  CORDETH: {
    name: "CORDETH",
    address: "0xf5ae4b8017fdd81d5ee25132d6bbcd75442be90a",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  AHFETH: {
    name: "AHFETHLP",
    address: "0x0b1d5a651c16e4218613ca4a261cc9ef71f2ac9d",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  AHF: {
    name: "AHF",
    address: "0xd6d3608f2d770d0a8d0da62d7afe21ea1da86d9c",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  SSL: {
    name: "SSL",
    address: "0x0d9227f9c4ab3972f994fccc6eeba3213c0305c4",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  SSLETH: {
    name: "SSLETHLP",
    address: "0x287856d10418e01ef1e93df9962b04d9a3a521c9",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  UNICETH: {
    name: "UNICETH",
    address: "0x4c988e54b253389683d30494e4e4da12ba985bf6",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  UNIC: {
    name: "UNIC",
    address: "0x37114773d5d74bd27c8e1167aeb50a6e0a3a354c",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  CATETH: {
    name: "CATETH",
    address: "0x781ce9a6808503261ab27973f3a34dd9f851a6fc",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    isLPToken: true,
  },
  CAT: {
    name: "CAT",
    address: "0x56015BBE3C01fE05bc30A8a9a9Fd9A88917e7dB3",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  Axioms: {
    name: "Axioms",
    address: "0x73ee6d7e6b203125add89320e9f343d65ec7c39a",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://info.uniswap.org/pair/0x0f3ce875cd56870ec7915e0fa247a202685888c5",
  },
};

// Mainnet pools
export const pools: Pool[] = [
  {
    id: "10210",
    name: "ZZZV2",
    address: "0x9527dcf941D474A52B74eed5E041c2dBa2eEe1CA",
    token: tokens.ZZZV2,
    reward: tokens.NAPV2,
    poolIcon: level2Icon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZ to V2 and earn NAPV2.",
    purchaseFrom: "https://info.uniswap.org/pair/0x4b29ed4190d8387755510feee729fbc974152a0c",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.SingleToken,
    rewardTokenPair: tokens.ZZZV2,
    uniPairToken: tokens.WETH,
    uniToken: tokens.ZZZETHV2,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "1201",
    name: "NAPV2",
    address: "0x2F867Bf441D62584B3F0a84828C2e62dAC9fb4e6",
    token: tokens.NAPV2,
    reward: tokens.NAPV2,
    poolIcon: level2Icon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/migration_pool.json"),
    info: "Migrate NAP to V2 and earn NAP V2.",
    purchaseFrom: "https://info.uniswap.org/pair/0x5c599e277c981d796dbf94c6e79ddac610d6052b",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.SingleToken,
    rewardTokenPair: tokens.ZZZV2,
    uniPairToken: tokens.ZZZV2,
    uniToken: tokens.ZZZNAPV2,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "1015",
    name: "ZZZETHV2",
    address: "0x2B255A6B4d7b147f75Bb44fc093CA39e08B20B7E",
    token: tokens.ZZZETHV2,
    reward: tokens.NAPV2,
    poolIcon: level2Icon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZETH to V2 and earn NAPV2",
    purchaseFrom: "https://info.uniswap.org/pair/0x4b29ed4190d8387755510feee729fbc974152a0c",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.LP,
    rewardTokenPair: tokens.ZZZV2,
    uniPairToken: tokens.WETH,
    uniToken: tokens.ZZZETHV2,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "10402",
    name: "ZZZNAPV2",
    address: "0x3c183C7D18089093316d1BFA124De15556f8Ae5c",
    token: tokens.ZZZNAPV2,
    reward: tokens.NAPV2,
    poolIcon: level2Icon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZNAP to V2 and earn NAPV2",
    purchaseFrom: "https://info.uniswap.org/pair/0x5c599e277c981d796dbf94c6e79ddac610d6052b",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.LP,
    rewardTokenPair: tokens.ZZZV2,
    uniPairToken: tokens.ZZZV2,
    uniToken: tokens.ZZZNAPV2,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "458",
    name: "Napper V3",
    address: "0x89B533C8D99CC298A7f55a1b1f175e79Be777BA7",
    token: tokens.ZZZ,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "😴",
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake ZZZ for NAP.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    hasEffectiveStake: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
  },
  {
    id: "419",
    name: "Dreamer",
    address: "0x84b68BD08155D5BB4FB8c40882838684AB20F4f6",
    token: tokens.ZZZETH,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "🔮",
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake ZZZETHLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    hasEffectiveStake: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
  },
  {
    id: "331",
    name: "Napping Cat",
    address: "0x267251225BDFe3b2E0e101E741b9b29ff97b37A1",
    token: tokens.NAP,
    reward: tokens.CAT,
    rewardTokenPair: tokens.WETH,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "😻",
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake NAP for CAT.",
    purchaseFrom: "https://info.uniswap.org/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
    hasEffectiveStake: true,
    partnerName: "CAT",
  },
  {
    id: "330",
    name: "Cat",
    address: "0x32BaA31EE17E072D00e0BFD6FD1af6E7e3a416Cc",
    token: tokens.CATETH,
    reward: tokens.CAT,
    rewardTokenPair: tokens.WETH,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.CAT,
    uniToken: tokens.CATETH,
    poolIcon: catSmallIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake CATETH LP for CAT.",
    purchaseFrom: "https://info.uniswap.org/pair/0x781ce9a6808503261ab27973f3a34dd9f851a6fc",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.LP,
    category: PoolCategory.Partners,
    hasEffectiveStake: true,
    partnerName: "CAT",
  },
  {
    id: "332",
    name: "Cat Nap",
    address: "0x03248C084F11E71e97ba857B03331BB7f466512B",
    token: tokens.CAT,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.CAT,
    uniToken: tokens.CATETH,
    poolIcon: catSmallIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake CAT for NAP.",
    purchaseFrom: "https://info.uniswap.org/pair/0x781ce9a6808503261ab27973f3a34dd9f851a6fc",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    hasEffectiveStake: true,
    partnerName: "CAT",
  },
  {
    id: "329",
    name: "Phased Out",
    address: "0x3aD3e22281E18a03D86fE790d8336Ef039Ae7591",
    token: tokens.ZZZ,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "😵",
    abi: require("./abi/effective_stake_abi.json"),
    info: "Stake ZZZ for NAP.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
    hasEffectiveStake: true,
  },
  {
    id: "25",
    name: "White Dreams",
    address: "0xf7fc2c35057392881ca51924b8cb7ee4c3fec56d",
    token: tokens.ZZZ,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "🤍",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZ for NAP.",
    purchaseFrom: "https://whitebit.com/trade/ZZZ_ETH",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
  },
  {
    id: "247",
    name: "Just Napping",
    address: "0xc77284551ad1bd65669eee360b636a2241f35f8b",
    token: tokens.NAP,
    reward: tokens.UNIC,
    rewardTokenPair: tokens.UNIC,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "😴",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "",
    purchaseFrom: "https://info.uniswap.org/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
    usesNewAbi: true,
    statusText: "Exit from the pool, do not buy UNICORN, boost purchases will be refunded.",
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
  },
  // {
  //   id: "248",
  //   name: "UNICORN",
  //   address: "0x0612dc677Fbd98E0DfdFFd7E3Eb153a0F526fae6",
  //   token: tokens.UNICETH,
  //   reward: tokens.UNIC,
  //   rewardTokenPair: tokens.WETH,
  //   boostToken: tokens.NAP,
  //   uniPairToken: tokens.WETH,
  //   uniPairToken2: tokens.UNIC,
  //   uniToken: tokens.UNICETH,
  //   poolIcon: "🦄",
  //   abi: require("./abi/v3_multiplier_pool_abi.json"),
  //   info: "",
  //   purchaseFrom:
  //     "https://info.uniswap.org/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
  //   usesNewAbi: true,
  //   statusText: "Exit from the pool, boost purchases will be refunded.",
  //   boostLevels: boostLevels.new,
  //   poolStatus: PoolStatus.Ongoing,
  //   poolType: PoolType.LP,
  //   category: PoolCategory.Partners,
  // },
  {
    id: "24",
    name: "Lucid Dream",
    address: "0x0e15f2d62dad62ceeec44a61c93d7909747f7bdc",
    token: tokens.ZZZETH,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "🔮",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZETHLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
  },
  {
    id: "28",
    name: "Snoozer V4",
    address: "0x3e93ee1645974078fb6a4f4b9dc8f34ba60a920b",
    token: tokens.ZZZNAP,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "💤",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZNAPLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
    usesNewAbi: true,
    boostLevels: boostLevels.new,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
  },
  {
    id: "1",
    name: "Sheep Counting",
    address: "0x3D46A6F8059DDA0cBcF923e8658AF6613DAbCdfE",
    token: tokens.ZZZ,
    reward: tokens.DREAM,
    rewardTokenPair: tokens.WETH,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniToken: tokens.ZZZETH,
    poolIcon: "🐏",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZ for DREAM.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Closed,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.extended,
  },
  {
    id: "2",
    name: "Napper v2",
    address: "0x4d16545f92F76a519b476F058A144a5e6dc543bc",
    token: tokens.ZZZ,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniToken: tokens.ZZZNAP,
    poolIcon: "😴",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZ for NAP.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Closed,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.normal,
  },
  {
    id: "3",
    name: "Dream",
    address: "0xe1fb77d1bb84d364c141591d3a8d6e7827846d27",
    token: tokens.NAP,
    boostToken: tokens.NAP,
    reward: tokens.DREAM,
    rewardTokenPair: tokens.WETH,
    uniPairToken: tokens.ZZZ,
    uniToken: tokens.ZZZNAP,
    poolIcon: "🔮",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake NAP for DREAM.",
    purchaseFrom: "https://uniswap.info/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
    poolStatus: PoolStatus.Closed,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.extended,
  },
  {
    id: "4",
    name: "Deep Sleep",
    address: "0xfeefac18962d8d5e16701ec0efa57af71279671d",
    token: tokens.ZZZNAP,
    boostToken: tokens.NAP,
    reward: tokens.DREAM,
    rewardTokenPair: tokens.WETH,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "🛌",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZNAPLP for DREAM.",
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
    poolStatus: PoolStatus.Closed,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.extended,
  },
  // {
  //   id: "5",
  //   name: "Yawn",
  //   address: "0x6aA4478C45c7818A9b5c1C513D894cF74b596bd6",
  //   token: tokens.ZZZETH,
  //   reward: tokens.NAP,
  //   boostToken: tokens.NAP,
  //   rewardTokenPair: tokens.ZZZ,
  //   uniPairToken: tokens.WETH,
  //   uniPairToken2: tokens.ZZZ,
  //   uniToken: tokens.ZZZETH,
  //   poolIcon: "🥱",
  //   abi: require("./abi/multiplier_pool_abi.json"),
  //   info: "Stake ZZZETHLP for NAP.",
  //   purchaseFrom: "https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0",
  //   poolStatus: PoolStatus.Retired,
  //   poolType: PoolType.LP,
  //   category: PoolCategory.ZZZ,
  //   boostLevels: boostLevels.normal,
  //   statusText: "Pools is running low, please withdraw or exit!",
  // },
  {
    id: "6",
    name: "Snore",
    address: "0x02B8F9372958bD36BB1B6aB6eefeA36D2b0F4C14",
    token: tokens.ZZZ,
    reward: tokens.ZZZNAP,
    boostToken: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "😪",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZ for ZZZNAPLP.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleTokenLPOutput,
    category: PoolCategory.ZZZ,
    statusText: "Pools is running low, please withdraw or exit!",
  },
  {
    id: "7",
    name: "Snoozer v2",
    address: "0xd264865B9B70e95E274480EF61501e8E9D54220D",
    token: tokens.ZZZNAP,
    reward: tokens.NAP,
    boostToken: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "💤",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZNAPLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.normal,
  },
  // {
  //   id: "8",
  //   name: "Hidden Gem",
  //   address: "0x4265c97020E1Cdead329BeDEa590F8a350f2B2f6",
  //   poolIconType: PoolIconType.Image,
  //   token: tokens.COVALETH,
  //   reward: tokens.NAP,
  //   rewardTokenPair: tokens.ZZZ,
  //   boostToken: tokens.NAP,
  //   uniPairToken: tokens.COVAL,
  //   uniPairToken2: tokens.WETH,
  //   uniToken: tokens.COVALETH,
  //   poolIcon: covalIcon,
  //   abi: require("./abi/multiplier_pool_abi.json"),
  //   info: "Stake COVALETHLP for NAP.",
  //   purchaseFrom: "https://app.uniswap.org/#/add/0x3d658390460295fb963f54dc0899cfb1c30776df/ETH",
  //   poolStatus: PoolStatus.Retired,
  //   poolType: PoolType.LP,
  //   category: PoolCategory.Partners,
  //   boostLevels: boostLevels.normal,
  //   partnerName: "COVAL",
  // },
  // {
  //   id: "9",
  //   name: "Sleeper",
  //   address: "0x2d0b69300c4637625681a19d840e8e9c1ebe4126",
  //   token: tokens.BPT,
  //   reward: tokens.ZZZ,
  //   rewardTokenPair: tokens.WETH,
  //   uniPairToken: tokens.WETH,
  //   uniToken: tokens.ZZZETH,
  //   poolIcon: "🛌",
  //   abi: require("./abi/zzz_bpt_pool_abi.json"),
  //   info: "Stake BPT for ZZZ.",
  //   purchaseFrom: "https://pools.balancer.exchange/#/pool/0x4f9dde745bf54f207dfc1fe34896d6752c63ad07/",
  //   poolStatus: PoolStatus.Closed,
  //   poolType: PoolType.SingleToken,
  //   category: PoolCategory.ZZZ,
  // },
  // {
  //   id: "10",
  //   name: "Dreamer",
  //   address: "0xeEE0B2ED62615441CE31c3166a4179a4B8FcE615",
  //   token: tokens.ZZZ,
  //   reward: tokens.ZZZETH,
  //   rewardTokenPair: tokens.WETH,
  //   uniPairToken: tokens.WETH,
  //   uniPairToken2: tokens.ZZZ,
  //   uniToken: tokens.ZZZETH,
  //   poolIcon: "🔮",
  //   abi: require("./abi/zzz_uni_pool_abi.json"),
  //   info: "Stake ZZZ for ZZZETHLP.",
  //   purchaseFrom: "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
  //   poolStatus: PoolStatus.Closed,
  //   poolType: PoolType.SingleTokenLPOutput,
  //   category: PoolCategory.ZZZ,
  // },
  {
    id: "11",
    name: "Napper",
    address: "0x05d0c213386e25BFB3f3872FCE6c7c7998A3E54C",
    token: tokens.ZZZ,
    reward: tokens.NAP,
    boostToken: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    uniPairToken: tokens.WETH,
    uniToken: tokens.ZZZNAP,
    poolIcon: "😴",
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake ZZZ for NAP.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Closed,
    poolType: PoolType.SingleToken,
    category: PoolCategory.ZZZ,
  },
  {
    id: "17",
    name: "Sergey's Dream",
    address: "0xdD676eb1a386EdE9896A8E99464A09D146677D3e",
    token: tokens.SSLETH,
    reward: tokens.SSL,
    boostToken: tokens.NAP,
    rewardTokenPair: tokens.WETH,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.SSL,
    uniToken: tokens.SSLETH,
    poolIcon: sslIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake SSLETHLP for SSL.",
    purchaseFrom: "https://uniswap.info/pair/0x287856d10418e01ef1e93df9962b04d9a3a521c9",
    usesNewAbi: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    boostLevels: boostLevels.normal,
    partnerName: "SSL",
  },
  {
    id: "18",
    name: "Sergey's Nap",
    address: "0x3b9b119ce819425cfca04d362ac6273f290b4e05",
    token: tokens.NAP,
    reward: tokens.SSL,
    boostToken: tokens.NAP,
    rewardTokenPair: tokens.WETH,
    uniPairToken: tokens.ZZZ,
    uniToken: tokens.ZZZNAP,
    poolIcon: sslIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake NAP for SSL.",
    purchaseFrom: "https://uniswap.info/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
    usesNewAbi: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    boostLevels: boostLevels.normal,
    partnerName: "SSL",
  },
  {
    id: "12",
    name: "Do good",
    address: "0x0525CCB9B7Df582dB9913b4d4cff5EeF4B3F2379",
    token: tokens.NAP,
    reward: tokens.CORD,
    rewardTokenPair: tokens.WETH,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniToken: tokens.ZZZNAP,
    poolIcon: CordIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake NAP for CORD.",
    purchaseFrom: "https://uniswap.info/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799",
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    partnerName: "CORD",
  },
  {
    id: "13",
    name: "Be good",
    address: "0xf19Aeea493912398c7C6262bBB1652dBbBc84e87",
    token: tokens.CORD,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniToken: tokens.CORDETH,
    poolIcon: CordIcon,
    poolIconType: PoolIconType.Image,
    abi: require("./abi/multiplier_pool_abi.json"),
    info: "Stake CORD for NAP.",
    purchaseFrom: "https://uniswap.info/pair/0xf5ae4b8017fdd81d5ee25132d6bbcd75442be90a",
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    boostLevels: boostLevels.normal,
    partnerName: "CORD",
  },
  {
    id: "14",
    name: "Nightmare",
    address: "0x99f76eef412713164be0378bfb7332e561cc63a0",
    token: tokens.ZZZ,
    reward: tokens.AHF,
    rewardTokenPair: tokens.WETH,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniToken: tokens.ZZZETH,
    poolIcon: "😱",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZ for AHF.",
    purchaseFrom: "https://uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    usesNewAbi: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.SingleToken,
    category: PoolCategory.Partners,
    boostLevels: boostLevels.normal,
    partnerName: "AHF",
  },
  {
    id: "15",
    name: "Power Nap",
    address: "0xd38ce7463e89511b8056d78963487e6f14318172",
    token: tokens.ZZZETH,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.WETH,
    uniPairToken2: tokens.ZZZ,
    uniToken: tokens.ZZZETH,
    poolIcon: "🤫",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZETHLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0",
    usesNewAbi: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.normal,
  },
  {
    id: "16",
    name: "Snoozer v3",
    address: "0xbaeb03803f19d3aaa9d365ee51c9587bfcdc7c55",
    token: tokens.ZZZNAP,
    reward: tokens.NAP,
    rewardTokenPair: tokens.ZZZ,
    boostToken: tokens.NAP,
    uniPairToken: tokens.ZZZ,
    uniPairToken2: tokens.NAP,
    uniToken: tokens.ZZZNAP,
    poolIcon: "💤",
    abi: require("./abi/v3_multiplier_pool_abi.json"),
    info: "Stake ZZZNAPLP for NAP.",
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
    usesNewAbi: true,
    poolStatus: PoolStatus.Retired,
    poolType: PoolType.LP,
    category: PoolCategory.ZZZ,
    boostLevels: boostLevels.normal,
  },
];

// Local test network tokens
export const localTokens: { [tokenName: string]: Token } = {
  Axioms: {
    name: "Axioms",
    address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  DREAM: {
    name: "DREAM",
    address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  ZZZETH: {
    name: "ZZZETH",
    address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  ZZZNAP: {
    name: "ZZZNAP",
    address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  ZZZV2: {
    name: "ZZZV2",
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  NAPV2: {
    name: "NAP",
    address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
};
// Kovan test network tokens
export const kovanTokens: { [tokenName: string]: Token } = {
  ZZZV1: {
    name: "ZZZ",
    address: "0x1393D632257Fb3efd4370f8035d8bC400CFC1007",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  NAPV1: {
    name: "NAP",
    address: "0xAc269dF7b498692aB3882B79A8D1B75757408e65",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  ZZZV2: {
    name: "ZZZV2",
    address: "0x4Df9BF9Bd6EF8146f48D9F021A2cd688182d18B0",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  NAPV2: {
    name: "NAP",
    address: "0x5e4ceB65D878F770f915Fa53Bbac2A3bA0291016",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
  },
  Axioms: {
    name: "Axioms",
    address: "0x1ED62Ffa07507920f8b670Cca62361ab8a76E531",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
  DREAM: {
    name: "DREAM",
    address: "0xDF0C9883F97A70A6457E159E28e5495a8a3497fd",
    abi: require("./abi/erc20_abi.json"),
    decimals: 18,
    purchaseFrom: "https://app.uniswap.org/#/add/0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c/0xc75f15ada581219c95485c578e124df3985e4ce0",
  },
};

export const vaultContracts: { [network: string]: any } = {
  unknown: {
    vault: {
      address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
      abi: require("./abi/vault.json"),
    },
    multiplier: {
      address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
      abi: require("./abi/multiplier.json"),
    },
    boostTokens: [localTokens.Axioms, localTokens.NAPV2, localTokens.DREAM],
  },
  kovan: {
    vault: {
      address: "0xCc86278d36FcF29681CBDbCe7eFcb9f96710155a",
      abi: require("./abi/vault.json"),
    },
    multiplier: {
      address: "0x82Dd362c2c55a74A25Bb316c41150Cd33Acc4a52",
      abi: require("./abi/multiplier.json"),
    },
    boostTokens: [kovanTokens.Axioms, kovanTokens.NAPV2, kovanTokens.DREAM],
  },
  homestead: {
    vault: {
      address: "0xf9747560d0E82f91EF4953fc9415F05a9ca05906",
      abi: require("./abi/vault.json"),
    },
    multiplier: {
      address: "0xe41058D378B972c48F5bCBec2b39A8b1f8964706",
      abi: require("./abi/multiplier.json"),
    },
    boostTokens: [tokens.Axioms, tokens.NAPV2, tokens.DREAM, tokens.DAI],
  },
};

export const kovanPools: Pool[] = [
  {
    id: "1",
    name: "ZZZV2",
    address: "0x76200Ef8319022D1C8dd1A2c2999B10480A5F653",
    token: kovanTokens.ZZZV1,
    reward: kovanTokens.NAPV2,
    poolIcon: "⬆️",
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZ to V2 and earn NAPV2.",
    purchaseFrom: "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.SingleToken,
    rewardTokenPair: kovanTokens.ZZZV1,
    uniPairToken: kovanTokens.ZZZV1,
    uniToken: kovanTokens.ZZZV1,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "2",
    name: "NAPV2",
    address: "0x2982483393B9FF6D0134131bD6E1dc8846798bCc",
    token: kovanTokens.NAPV1,
    reward: kovanTokens.NAPV2,
    poolIcon: "⬆️",
    abi: require("./abi/migration_pool.json"),
    info: "Migrate NAP to V2 and earn NAP V2.",
    purchaseFrom: "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.SingleToken,
    rewardTokenPair: kovanTokens.ZZZV1,
    uniPairToken: kovanTokens.ZZZV1,
    uniToken: kovanTokens.ZZZV1,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "3",
    name: "ZZZETHV2",
    address: "0x3Cf5E8ab26230787960cdE766841edc13EFD346e",
    token: kovanTokens.ZZZV1,
    reward: kovanTokens.NAPV2,
    poolIcon: "⬆️",
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZETH to V2 and earn NAPV2",
    purchaseFrom: "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.LP,
    rewardTokenPair: kovanTokens.ZZZV1,
    uniPairToken: kovanTokens.ZZZV1,
    uniToken: kovanTokens.ZZZV1,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
  {
    id: "4",
    name: "ZZZNAPV2",
    address: "0x3C779170f0f8FEB0fFe657569C7525ebbdE665d5",
    token: kovanTokens.NAPV1,
    reward: kovanTokens.NAPV1,
    poolIcon: "⬆️",
    abi: require("./abi/migration_pool.json"),
    info: "Migrate ZZZNAP to V2 and earn NAPV2",
    purchaseFrom: "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    poolStatus: PoolStatus.Ongoing,
    poolType: PoolType.LP,
    rewardTokenPair: kovanTokens.ZZZV1,
    uniPairToken: kovanTokens.ZZZV1,
    uniToken: kovanTokens.ZZZV1,
    category: PoolCategory.ZZZ,
    isMigrationPool: true,
  },
];

export const otherPools = [
  {
    name: "Balancer Pool",
    skipRender: false,
    address: "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07",
    abi: require("./abi/balancer_pool_abi.json"),
  },
];

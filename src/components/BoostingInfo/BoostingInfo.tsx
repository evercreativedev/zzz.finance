import React from "react";
import "./BoostingInfo.scss";

function BoostingInfo({ effectiveStake = false }) {
  if (effectiveStake) {
    return (
      <div className="boosting-info-content">
        <h2>Effective stake multiplier</h2>
        <p>Effective stake differs from the original boosting in a few ways:</p>
        <h2>Examples</h2>
        <p>
          <b>EXAMPLE: User stakes 10ZZZ and buys a 25% boost.</b>
        </p>
        <p>User has now effective stake of 12.5 ZZZ staked, that means a bonus of 2.5 ZZZ is added to the staking amount</p>
        <p>
          <b>EXAMPLE2: User stakes 100ZZZ and buys a 40% boost.</b>
        </p>
        <p>User has now effective stake of 140 ZZZ staked, that means a bonus of 40 ZZZ is added to the staking amount</p>
        <p>
          <b>NOTE:</b>
          <br />
          <br />
          This has an effect on users who do not have a boost since there is more effective balance on the pool. <br />
          <br />
          That means a non-boosted user will have a effective balance LESS than the users who have bought boosts, meaning that
          their rewards are reduced while boosted users gain more share of the total staked amount.
          <br />
          <br />
          Also the pools with an effective staking bonus will have a reward taxation of 4% sent to the treasury.
        </p>
      </div>
    );
  }
  return (
    <div className="boosting-info-content">
      <h2>Multiplier / Boosting</h2>
      <p>A multiplier effect has been created for holding or staking ZZZ.</p>
      <p>
        It is crucial to note that these are linked to individual ETH addresses. Bonuses do not apply across multiple addresses.{" "}
      </p>
      <p style={{ marginBottom: "30px" }}>
        <b>
          1. Staking in ZZZ or ZZZ/ETH pools. <br />
          <br />
          2. ZZZ held in your wallet. <br />
          <br />
          3. Total amount of ZZZ redeemable from your ETH / ZZZ UNI Liquidity Tokens on Uniswap.
        </b>
      </p>
      <p>
        As a thank you for contributing to the ETH/ZZZ UNISWAP Liquidity Pool: <br />
        <br />
        The ZZZs wrapped in UNISWAP ZZZ / ETH LP tokens themselves will count as double <br />
        (if you have 5 ZZZs in your UNI tokens, it will count as 10).
        <br />
        <br />
        More methods of holding and staking ZZZ will be added in the future.
      </p>
      <p>
        <h3>NOTE</h3>
        Staked UNI Liquidity Tokens <b>DO NOT</b> count towards your boost level.
      </p>
      <h2>Examples</h2>
      <p>
        <b>EXAMPLE 1: </b>Provide <b>5 ZZZ </b> of liquidity to{" "}
        <a
          href="https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH/ZZZ pool
        </a>{" "}
        and it will count as <b>10 ZZZ</b> for pool multiplier (<b>30%</b>)
      </p>
      <p>
        <b>EXAMPLE 2: </b>Provide <b>10 ZZZ </b> of liquidity to{" "}
        <a
          href="https://app.uniswap.org/#/add/ETH/0xc75f15ada581219c95485c578e124df3985e4ce0"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH/ZZZ pool
        </a>{" "}
        and it will count as <b>20 ZZZ</b> for pool multiplier (<b>60%</b>)
      </p>
      <p className="important-paragraph">
        <b>
          <i>This will not double your actual ZZZ balance for anyone wondering!</i>
        </b>
      </p>
      <p className="important-paragraph">
        <b>
          <i>Unclaimed rewards from any pools will not count towards your multiplier.</i>
        </b>
      </p>
      <p>Here’s the breakdown on the multiplier:</p>
      <h3>1. Global Multiplier for ZZZ in Wallet</h3>
      <p>This is a global effect, with some exceptions based on the needs of the individual pools.</p>
      <p>The following tiered bonus structure applies:</p>
      <p>
        1 ZZZ = 2% <br />
        5 ZZZ = 10% <br />
        10 ZZZ = 30% <br />
        20 ZZZ = 60% <br />
      </p>
      <h3>2. Local Multiplier for SPENDING NAP</h3>
      <p>In addition to the multiplier for staking ZZZs, you may also spend NAPs to get bonuses on individual pools.</p>
      <p>Depending on the amount you spend it increases your bonus. This effect works exclusively on the pools you choose.</p>
      <p>
        {" "}
        It will <b>NOT</b> be transferred from a version 1 pool to a version 2 eventhough the pools might share the same name.
      </p>
      <p>* Example 1</p>
      <p>
        Level 1: 10,000 NAP:10% <br />
        Level 2: 20,000 NAP: 20% <br />
        Level 3: 30,000 NAP: 40% <br />
      </p>
      <p>* Example 2</p>
      <p>
        Level 1: 1,000 NAP: 10% <br />
        Level 2: 2,000 NAP: 20% <br />
        Level 3: 3,000 NAP: 30% <br />
        Level 4: 7,000 NAP: 50% <br />
        Level 5: 10,000 NAP: 75% <br />
        Level 6: 20,000 NAP: 100% <br />
      </p>
      <p>
        <b>* Prices will vary</b>
      </p>
      <h3>3. Step Down Effect</h3>
      <p>
        To help increase the ability to gain a bonus that both rewards early adopters (who may have larger balances) and newcomers
        (who may have small balances), we have implemented a solution that we like to call ‘Step Down’ on the cost of the NAPs
        bonuses.
      </p>
      <p>
        The cost of the multipliers drop by 10% every X hours according to pool duration. This will occur 5 times, and then hold
        steady.
      </p>
      <p>Examples:</p>
      <p>
        Level 1 step down numbers: <br />
        <br />
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>10,000, 9,000, 8,100, 7,290, 6,561, 5,904.9</span>
      </p>
      <p>
        Level 2 step down numbers: <br />
        <br />
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>20,000, 18,000, 16,200, 14,580, 13,122, 11,809.8</span>
      </p>
      <p>
        Level 3 step down numbers: <br />
        <br />
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>30,000, 27,000, 24,300, 21,870, 19,683, 17,714.7</span>
      </p>
      <h3>What happens to your NAP once spent?</h3>
      <p>
        We decided to go with a self sustaining ecosystem where the multipliers spent (NAP) will be distributed back into the
        ecosystem at a ratio of 50% to fund rewards for future Pools, and 50% towards the Dev Fund to fund future initiatives,
        project needs, and community proposals that will be voted on through our upcoming, decentralized governance system.
      </p>
      <p>
        This ensures the long term health and viability of the ZZZ ecosystem, thus allowing us to enrich the governance model
        where we are able to afford the swift execution and implementation of the proposals voted on by our community Holders.
      </p>
      <p>
        Most importantly, everyone may decide for themselves if they wish to apply the NAP multiplier and, by doing so, not only
        get better rewards, but also make the project grow by fostering development and more pools.
      </p>
      <p>
        The idea of a self-sustaining, growing ecosystem model without inflation puts us in a very unique position, and sets the
        ZZZ and NAP protocols apart from other major yield farming projects out there in the DeFi space in both stability and
        sustainability.
      </p>
    </div>
  );
}

export default BoostingInfo;

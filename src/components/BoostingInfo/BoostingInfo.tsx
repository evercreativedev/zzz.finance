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
          That means a non-boosted user will have a effective balance LESS than the users who have bought boosts, meaning that their rewards
          are reduced while boosted users gain more share of the total staked amount.
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
      <p>A multiplier effect has been created for staking ZZZ, ZZZ/ETH or ZZZ/NAP in the Vault (NOT IN THE POOLS).</p>
      <p>Underlying ZZZ in the ZZZ/NAP and ZZZ/ETH is calculated.</p>
      <p>It is crucial to note that these are linked to individual ETH addresses. Bonuses do not apply across multiple addresses. </p>
      <p className="important-paragraph">
        <b>
          <i>Unclaimed rewards from vault will not count towards your multiplier.</i>
        </b>
      </p>
      <p>The following tiered bonus structure applies:</p>
      <p>
        5-15 ZZZ = 5% <br />
        15-30 ZZZ = 10% <br />
        30-60 ZZZ = 25% <br />
        60+ ZZZ = 50% <br />
      </p>
      <h3>2. Local Multiplier for SPENDING NAP</h3>
      <p>In addition to the multiplier for staking ZZZs, you may also spend different tokens to get bonuses on individual pools.</p>
      <p>Depending on the amount you spend it increases your bonus. This effect works exclusively on the pools you choose.</p>
      <p>
        {" "}
        It will <b>NOT</b> be transferred from a version 1 pool to a version 2 eventhough the pools might share the same name.
      </p>
      <p>* Examples</p>
      <p>
        1,000 NAP: 5% <br />
        2,000 NAP: 10% <br />
        3,000 NAP: 15% <br />
        7,000 NAP: 25% <br />
        <br />
        10 DAI: 5% <br />
        50 DAI: 10% <br />
        100 DAI: 15% <br />
        200 DAI: 25% <br />
        <br />
        <p>Bonuses purchased will stack together</p>
      </p>
      <p>
        <b>* Prices will vary</b>
      </p>
      <p>Examples:</p>
      <h3>What happens to your boosts once spent?</h3>
      <p>In case of nap 50% of the cost is sent to vault.</p>
      <p>Dream boosts are burned</p>
      <p>Other boosts go to ZZZ treasury for project funding</p>
    </div>
  );
}

export default BoostingInfo;

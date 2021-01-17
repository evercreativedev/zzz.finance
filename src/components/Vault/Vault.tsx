import React, { useEffect, useState } from "react";
import VaultStore from "stores/vault";
import EthStore from "stores/eth";
import { observer } from "mobx-react";
import "./Vault.scss";
import Loader from "react-loader-spinner";
import { vaultContracts } from "eth/contracts";
import { Token } from "types";
import TimerNumbaaTwoo from "components/TimerNumbaaTwoo/TimerNumbaaTwoo";

type Props = {
  vaultId: number;
};

const names: { [id: number]: string } = {
  0: "ZZZ",
  1: "ZZZ / ETH",
  2: "ZZZ / NAP",
  3: "NAP",
};

const boostAmounts = [5, 10, 20, 25];

function Vault({ vaultId }: Props) {
  const [inputValue, setInputValue] = useState("0");
  const [currentBoost, setCurrentBoost] = useState(0);
  const boostTokens = vaultContracts.homestead.boostTokens;
  const { currentBlock } = EthStore;
  useEffect(() => {
    if (currentBlock > 0) {
      VaultStore.fetchVaultData(vaultId);
      VaultStore.fetchBoostData(vaultId);
    }
  }, [vaultId, currentBlock]);

  const vaultData = VaultStore.vaultData.get(vaultId.toString());
  const vaultUserData = VaultStore.userVaultData.get(vaultId.toString());
  const vaultBoostData = VaultStore.vaultBoostData.get(vaultId.toString());
  const vaultName = names[vaultId];

  if (!vaultData || !vaultUserData || !vaultBoostData)
    return (
      <div className="vault">
        <div className="header">
          <div className="title">{vaultName} vault</div>
        </div>
        <div className="vault-interactions">
          <Loader type="Bars" height={30} width={30} color="rgb(11, 219, 39)" />
        </div>
      </div>
    );

  const { boostTokenAllowances } = VaultStore;
  const { totalStaked, token } = vaultData;
  const { amount, boostAmount, APY, hasAllowance, zzzRewards, napRewards, timelockEnd, stakeBalance } = vaultUserData;
  const { costs } = vaultBoostData;
  const currentBoostToken = boostTokens[currentBoost];

  const hasTimelock = timelockEnd > 0;

  return (
    <div className="vault">
      <div className="header">
        <div className="title">
          {vaultId + 1}. {vaultName}
        </div>
        <div className="user-staked">
          assets: <b>{totalStaked}</b> {vaultName}
        </div>
        <div className="total-staked" onClick={() => setInputValue(amount.toString())}>
          your stake: <b>{amount}</b> {vaultName}
        </div>
        <div className="bonus-staked">
          bonus: <b>{boostAmount}</b> {vaultName}
        </div>
      </div>
      <div className="sub-header">
        <div className="zzz-rewards">
          ZZZ rewards: <b>{amount > 0 ? zzzRewards : 0} ZZZ</b>
        </div>
        <div className="nap-rewards">
          NAP rewards: <b>{amount > 0 ? napRewards : 0} NAP</b>
        </div>
        <div className="apy">
          APY: <b>{!isNaN(APY) ? APY : 0}%</b>
        </div>
      </div>

      <div className="vault-interactions">
        <div className="vault-balance" onClick={() => setInputValue(stakeBalance.toString())}>
          balance: <b>{stakeBalance}</b> {vaultName}
        </div>
        {hasAllowance ? (
          <>
            <input
              type="number"
              defaultValue={inputValue}
              value={inputValue}
              className="the-input"
              onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="vault-buttons">
              <InteractionButtons vaultId={vaultId} inputValue={inputValue} hasTimelock={hasTimelock} />
            </div>
          </>
        ) : (
          <div className="vault-button" onClick={() => VaultStore.approve(token, vaultId)}>
            Approve {vaultName} to participate
          </div>
        )}
      </div>

      <div className={`sub-header timelock-container ${hasTimelock && "disabled"}`}>
        {!hasTimelock ? (
          <div className={`vault-button ${amount === 0 && `disabled`}`} onClick={() => amount > 0 && VaultStore.timelock(vaultId)}>
            ⏱ ENABLE STAKE TIMELOCK (4 WEEKS, 50% bonus) {amount === 0 && "(STAKE TO ENABLE)"}
          </div>
        ) : (
          <div className="vault-button disabled">
            <TimerNumbaaTwoo date={new Date(timelockEnd * 1000)} />
          </div>
        )}
      </div>

      <div className="vault-buttons boost-section">
        {boostTokens.map((token: Token, i: number) =>
          boostTokenAllowances[i] ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={`boost-token-${token.name}-${vaultId}`}>
              <a href={token.purchaseFrom} target="blank" rel="noopener noreferrer" className="vault-button get-token">
                Get
              </a>
              <div className={`vault-button ${currentBoost === i && "selected"}`} onClick={() => setCurrentBoost(i)}>
                Boost with {token.name}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }} key={`boost-token-${token.name}-${vaultId}`}>
              <a href={token.purchaseFrom} target="blank" rel="noopener noreferrer" className="vault-button get-token">
                Get
              </a>
              {!boostTokenAllowances[i] && (
                <div className={`vault-button ${currentBoost === i && "selected"}`} onClick={() => setCurrentBoost(i)}>
                  Peek
                </div>
              )}
              <div
                className={`vault-button boost-button ${currentBoost === i && "selected"}`}
                onClick={() => VaultStore.boostApprove(i, vaultId)}
              >
                Approve {token.name} for boosting
              </div>
            </div>
          )
        )}
      </div>
      <div className="vault-buttons boost-buttons">
        {boostAmounts.map((p, i) => {
          const cost = costs[currentBoost][i];
          const bought = cost === 0;
          return (
            <div className="vault-button vault-boost-button" key={`boost-${p}-${i}`}>
              {!bought ? (
                <div className="boost" onClick={() => VaultStore.purchase(vaultId, currentBoostToken.address, i + 1)}>
                  {p}% boost <br />
                  {costs[currentBoost][i]} {currentBoostToken.name}
                </div>
              ) : (
                <div className="boost">Bought! {p}% boost</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const InteractionButtons = ({ inputValue, vaultId, hasTimelock }: { inputValue: string; vaultId: number; hasTimelock: boolean }) => (
  <>
    <div className="vault-button" onClick={() => parseFloat(inputValue) > 0 && VaultStore.deposit(inputValue, vaultId)}>
      Deposit
    </div>
    <div
      className={`vault-button ${hasTimelock && "disabled"}`}
      onClick={() => !hasTimelock && parseFloat(inputValue) > 0 && VaultStore.withdraw(inputValue, vaultId)}
    >
      Withdraw
    </div>
    <div className="vault-button" onClick={() => VaultStore.claim(vaultId)}>
      Claim
    </div>
  </>
);

export default observer(Vault);

import React from "react";
import "./VaultReadme.scss";

function VaultReadme() {
  return (
    <div className="vault-readme">
      <div className="vault-readme-header">VAULT INFO</div>
      <div className="vault-readme-text">
        <h2>Hello and welcome to the ZZZ vaults!</h2>
        <p>Before participating please get to know the mechanics:</p>
        <h3>Basics</h3>
        <p>
          These vaults are fed from the network fees on ZZZV2 and NAPV2 tokens. Initially a 2.5% sell fee and a 1.5% regular tx fee is
          implemented for both tokens.
        </p>
        <i>These fees are subject to change.</i>
        <p>Addittional fees are implemented for blacklisted addresses, like frontrunning contracts. </p>

        <p>
          From the fees a adjustable percentage (initially set at 90%) will be delivered to the vault-contract as a reward which will be
          shared between all four vaults
        </p>
        <p>All four vaults have different allocations for these rewards - but all of them are earning both tokens.</p>
        <p>Initially vault allocations are set as following: </p>
        <ul>
          <li>ZZZ vault: ~25% of ZZZ fees / ~16.5% of NAP fees</li>
          <li>ZZZETH vault: ~43% of ZZZ fees / ~25% of NAP fees</li>
          <li>ZZZNAP vault: ~25% of ZZZ fees / ~42% of NAP fees</li>
          <li>NAP vault: ~7% of ZZZ fees / ~16.5% of NAP fees</li>
        </ul>
        <p>
          The treasury will be bonus-funding the vault for a certain period of time from the ZZZ / NAP tokens gained from the tx fees after
          migration.
        </p>
        <p>If you are used to our previous yield-farming pools there are a few differences to keep in mind here:</p>
        <p>This contract will send you your rewards on each deposit / withdraw / boost / claim action you take.</p>
        <p>There is no end-date. This contract will run as long as Ethereum-network stays alive.</p>
        <h3>Boosting</h3>
        <p>All of the vaults have spendable boosting with multiple tokens. The boosts will stack so you can purchase each one of them.</p>
        <p>
          <b>Boost are RESET on each epoch! Failing to claim rewards before epoch change will lead to LOSS of the boost gains.</b>
        </p>
        <p>Purchasing NAP boosts will send 50% of the amount into the vault while the other 50% is sent to the treasury.</p>
        <p>Axioms purchases will be sent straight to burn address.</p>
        <p>Other purchases are sent to the ZZZ treasury.</p>
        <p>Spendable boosts and the timelock bonus will stack.</p>
        <h3>Timelock </h3>
        <p>Users have an option to timelock their stake for a period of 4 weeks - this gives user an 50% stake boost for the time being</p>
        <p>
          <b>
            You have a 1-day period to withdraw your stake after the timelock ends. Trying to withdraw after it will RESET the timelock to 4
            weeks again. <i>This might be subject to change.</i>
          </b>
        </p>
        <p>
          As a friendly reminder the project itself holds NO responsibility of any losses that incur from using the vault contract or the
          multiplier contract.
        </p>
        <p>These contracts have not been formally audited. You can observe the source code from Etherscan by clicking on the page title.</p>
        <p>Have a great stay!</p>
      </div>
    </div>
  );
}

export default VaultReadme;

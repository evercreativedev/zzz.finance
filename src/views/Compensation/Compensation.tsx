import { useWeb3React } from "@web3-react/core";
import Layout from "components/Layout";
import Spinner from "components/Spinner/Spinner";
import WalletUnlock from "components/WalletUnlock/WalletUnlock";
import {
  claimCompensation,
  getClaimLimit,
  getCurrentRound,
  getTokensClaimed,
  getTotalCompensationAmount,
  getTotalPerRound,
  getTotalRounds,
} from "eth/compensationMethods";
import React, { useEffect, useState } from "react";
import { CompensationContainer, CompensationTitle } from "views/Compensation/Compensation.styles";

const title = "Snoozer compensations";

function Governance() {
  const { library, account } = useWeb3React();
  const [claimLimit, setClaimLimit] = useState(0);
  const [tokensClaimed, setTokensClaimed] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalPerRound, setTotalPerRound] = useState(0);
  const [totalNap, setTotalNap] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account && library) {
      (async () => {
        setLoading(true);
        setTokensClaimed(await getTokensClaimed(account, library));
        setClaimLimit(await getClaimLimit(account, library));
        setTotalRounds(await getTotalRounds(library));
        setTotalPerRound(await getTotalPerRound(library));
        setTotalNap(await getTotalCompensationAmount(library));
        setCurrentRound(await getCurrentRound(library));
        setLoading(false);
      })();
    }
  }, [library, account]);
  const userClaimPerRound = claimLimit / totalRounds;
  return (
    <Layout view="Compensation" type="vertical">
      <Layout.ExtraContent>
        <CompensationTitle>
          <div id="title">{title}</div>
        </CompensationTitle>
      </Layout.ExtraContent>
      <Layout.MainContent view="compensation">
        <CompensationContainer>
          {!account && (
            <div className="user-info">
              <div className="wallet-unlock">Please unlock wallet to accesss</div>
              <WalletUnlock />
            </div>
          )}
          {loading ? (
            <Spinner type="Rings" color="lightgreen" width={500} height={500} condition={undefined}>
              {" "}
            </Spinner>
          ) : (
            <>
              <h2 style={{ margin: "4px" }}>Current round: {currentRound}</h2>
              <h3 style={{ margin: "4px" }}>
                Total rounds: {totalRounds} ({totalRounds - currentRound} remaining)
              </h3>
              <h4>{totalPerRound} NAP per round total.</h4>
              <h3 className="total-naps">
                {totalNap} NAP total to be distributed over the {totalRounds} rounds.
              </h3>
              {account && (
                <div className="user-info">
                  {claimLimit > 0 ? (
                    <>
                      {" "}
                      <div className="token-limit">
                        Your overall claimables: <b>{claimLimit}</b>
                      </div>
                      <div className="token-limit-round">
                        Per round: <b>{userClaimPerRound}</b>
                      </div>
                      <div className="token-limit-round">
                        You have claimed: <b>{tokensClaimed}</b> NAP
                      </div>
                      <h5>Missing a round does not matter, you will receive it on a later round.</h5>
                      <div
                        className={`claim-button ${currentRound === 0 && "disabled"}`}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        onClick={() => currentRound > 0 && claimCompensation(library.getSigner())}
                      >
                        Claim NAP{" "}
                        {currentRound === 0 && (
                          <div style={{ display: "block", fontSize: "10px", color: "hotpink" }}>Rounds not started yet</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>Your account is not eligible for compensation.</div>
                  )}
                </div>
              )}
            </>
          )}
        </CompensationContainer>
      </Layout.MainContent>
    </Layout>
  );
}
export default Governance;

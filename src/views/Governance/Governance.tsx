import img_join_convo from "assets/join_convo.png";
import img_governance from "assets/justice.png";
import Layout from "components/Layout";
import React from "react";
import { GovernanceTitle, GovernanceIframe } from "views/Governance/Governance.styles";

const title = "Vote on the future of ZZZ";

type Props = {};

function Governance({}: Props) {
  return (
    <Layout view="Governance" type="vertical">
      <Layout.ExtraGovernanceContent>
        <GovernanceTitle>
          <div id="title">{title}</div>
          <img className="title-image" src={img_governance} id="subtitle" alt="governance" />
          <div className="discuss-container">
            <img className="convo-image" src={img_join_convo} id="subtitle" alt="governance" />
            <a
              href="https://forums.zzz.finance"
              target="blank"
              rel="noopener noreferrer"
              style={{ pointerEvents: "none", opacity: "0.4" }}
            >
              <button className="join-button">
                <s>Discuss</s> (offline)
              </button>
            </a>
          </div>
        </GovernanceTitle>
      </Layout.ExtraGovernanceContent>
      <Layout.MainContent view="governance">
        <GovernanceIframe className="governance-frame" src="https://snapshot.page/#/zzz-finance" title="snapshot-governance" />
        {/* <GovernanceContent>
          <div className="placeholder">COMING SOON &trade;</div>
          <div className="container">
            <div className="main-content">
              {proposals
                .slice(currentIndex, currentIndex + amountPerPage)
                .map((proposal) => (
                  <GovernanceProposal>
                    <div className="proposal">
                      <div className="proposal-left">
                        <div className="proposal-title">
                          <span className="proposal-id">{proposal.title}:</span>
                          <div className="proposal-desc">{proposal.desc}</div>
                        </div>
                        <div className="proposal-buttons">
                          <button className="yes">Yes</button>
                          <button className="no">No</button>
                          <button className="read-more">Read More</button>
                        </div>
                      </div>
                      <div className="proposal-right">
                        <div className="proposal-countdown">
                          {proposal.hours}
                          <span className="proposal-remaining">
                            {proposal.remaining} Hours to vote
                          </span>
                        </div>
                        <p className="proposal-remaining"></p>
                        <div className="proposal-vote-results">
                          <p className="proposal-vote-tally">
                            {proposal.yes} Yes / {proposal.no} No
                          </p>
                          <div className="proposal-vote-bar"></div>
                        </div>
                      </div>
                    </div>
                  </GovernanceProposal>
                ))}
              <div className="tabs">
                {tabs.map((tab, index) => (
                  <div className="tab" onClick={() => setStartIndex(index)}>
                    {index === startIndex ? (
                      <div className="page selected"></div>
                    ) : (
                      <div className="page"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="side-content">
              <div className="image">
                <img src={img_governance} alt="zzz-governance" />
              </div>
              <GovernanceJoin>
                <div className="title">Join the conversation</div>
                <div className="join">
                  <div className="join-text">
                    Before a proposal goes to the ZZZ Parliament, it's debated
                    in the Town Square.
                  </div>
                  <img src={img_join_convo} alt="zzz-join_convo" />
                </div>
                <button className="join-button">Discuss</button>
              </GovernanceJoin>
            </div>
          </div>
        </GovernanceContent> */}
      </Layout.MainContent>
    </Layout>
  );
}
export default Governance;

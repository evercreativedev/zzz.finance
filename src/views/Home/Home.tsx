import discordIcon from "assets/discord_logo.webp";
import mediumIcon from "assets/medium_icon.webp";
import telegramIcon from "assets/telegram_logo.webp";
import certiklogo from "assets/certik.png";
import twitterIcon from "assets/twitter_icon.svg";
import Layout from "components/Layout";
import Newsfeed from "components/Newsfeed/Newsfeed";
import PoolPreviewContainer from "components/PoolPreviewContainer/PoolPreviewContainer";
import SocialLink from "components/SocialLink";
import { SocialLinks } from "components/SocialLink/SocialLink.styles";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import zzzlogo from "assets/zzz_token_logo.png";
import communityIcon from "assets/community_icon-trimmy.png";
import napIcon from "assets/catnap-trimmy.png";
import connectionIcon from "assets/connection_icon-trimmy.png";
import News from "components/News/News";

import {
  Certik,
  HomeContent,
  HomeTitle,
  InfoBox,
  InfoBoxes,
  Introduction,
} from "./Home.styles";
import Listings from "components/Listings/Listings";

let i = 0;
const title =
  "Decentralized finance reimagined. For the people, by the people.";

function typeWriter(setTyped: Function) {
  if (i < title.length) {
    const el = document.getElementById("title");
    if (el) {
      el.innerHTML += title.charAt(i);
      i++;
    }
    setTimeout(() => typeWriter(setTyped), 20);
  } else {
    setTyped(true);
  }
}

const infoBoxes = [
  {
    title: "Community First",
    text:
      "The protocol is determined by the community. Proposals are made by and voted on by holders of ZZZ / NAP.",
    icon: <img src={communityIcon} alt="community" />,
  },
  {
    title: "NAP Token",
    text:
      "NAP is the an extra layer for the economy. It act's as a gas token in the system. It can be spent to increase your yields by the Boost functionality. Revenues from purchases are halved 50% towards future products and 50% towards development fund.",
    icon: <img src={napIcon} alt="community" />,
  },
  {
    title: "Partnerships",
    text:
      "ZZZ is committed to continuing innovations with other Ethereum projects.",
    icon: <img src={connectionIcon} alt="connection" />,
  },
];

function Home() {
  const [typed, setTyped] = useState(false);
  useEffect(() => {
    typeWriter(setTyped);
  }, []);

  return (
    <Layout view="Home" type="vertical">
      <Layout.ExtraContent>
        <HomeTitle>
          <div id="title">{typed && title}</div>
          <SocialLinks>
            <SocialLink
              title="Telegram"
              icon={telegramIcon}
              href="https://t.me/ZZZfinance/"
            />
            <SocialLink
              title="Twitter"
              icon={twitterIcon}
              href="https://twitter.com/zzzfinance/"
            />
            <SocialLink
              title="Medium"
              icon={mediumIcon}
              href="https://medium.com/@zzzfinance/"
            />
            <SocialLink
              title="Discord"
              icon={discordIcon}
              href="https://discord.gg/DQXmtB3"
            />
          </SocialLinks>
        </HomeTitle>
      </Layout.ExtraContent>
      <Layout.MainContent>
        <HomeContent>
          <Introduction>
            <div className="info">
              <News />
              <div className="info-content">
                <img src={zzzlogo} alt="zzz" className="zzz-logo" />
                <h2>What is ZZZ?</h2>
                <p>
                  ZZZ is a community-centered DeFi project by the people, for
                  the people. The decisions and actions of ZZZ are made by its
                  members and community to assure equity and fairness for all.
                </p>
                <p>
                  It all started by a single developer and as of now the project
                  is handed to the community to grow forwards.
                </p>
                <p>
                  It is a new form of governance system. A think-tank. A place
                  where innovation, entrepreneurship, and technological
                  advancements are the priority, creating a much needed utility
                  focus to the blockchain space. The value of ZZZ is determined
                  by the contribution and innovation of the community as a
                  whole.
                </p>
                <h2>Why ZZZ?</h2>
                <p>
                  Owning <b>$ZZZ</b> enables your voice to be heard regarding
                  the future of the project by enabling you to vote on and
                  initiate proposals for the protocol.
                </p>
                <p>
                  Proposal initiation and voting will be avalaible in the near
                  future using a snapshotting system. A gas-relayer system where
                  users pay no fees is coming later.
                </p>
                <p>
                  Owning ZZZ provides you with unique bonuses on our
                  DeFi-platform by giving your deposited assets a yield bonus
                  according to the amount of ZZZ you are holding. So you are
                  gaining the upper hand.
                </p>
                <h2>Okay, anything more?</h2>
                <p>
                  Mandatory part of the ZZZ ecosystem is its{" "}
                  <b>collaborations</b> with other projects in the space to
                  expand the reach of the ecosystem.
                </p>
                <p>
                  The community knows that ZZZ keeps on introducing new
                  interesting projects and that we require the projects to meet
                  a certain standard.
                </p>
                <p>
                  ZZZ is able to provide a platform for the already established
                  or for the upcoming projects who need the initial push.
                  Combined with our expertise and the community, there is no
                  doubt that greater results will be achieved by collaborating
                  rather than competing.
                </p>
                <h2>Tokenomics</h2>
                <p>
                  A capped supply of <b>20,000 $ZZZ</b> has been distributed to
                  the community. There was no presale, dev or VC wallets.
                </p>
                <p>
                  A capped supply of <b>20,000,000 $NAP</b> has been created to
                  fuel the ecosystem and its development.
                </p>
                <p>
                  A dynamic supply of <b>$DREAM</b> has been created for further
                  use cases including a gamifying-experience
                </p>
              </div>
            </div>
            <div className="just-a-container">
              <Listings />
              <Newsfeed />
            </div>
          </Introduction>
          <InfoBoxes>
            {infoBoxes.map((box) => (
              <InfoBox key={`infobox-${box.title}`}>
                <div className="icon">{box.icon}</div>
                <div className="title">{box.title}</div>
                <div className="explanation">{box.text}</div>
              </InfoBox>
            ))}
          </InfoBoxes>
          <Certik>
            <img src={certiklogo} alt="certik" className="certik-logo" />
            <div className="certik-text">
              <h2>What?</h2>
              <p>
                We have just completed an audit process with CertiK for our
                yield farming contracts. After a few revisions all major and
                critical issues found by CertiK were alleviated and the
                finalized report has been received and our pools have been
                implemented with this standard for quite some time.
              </p>
              <h2>Why?</h2>
              <p>
                We found it necessary to provide a proof of authenticity for our
                partners and investors and we are determined to maintain the
                standards for all upcoming projects.
              </p>
              <h2>CertiK?</h2>
              <p>
                We have chosen CertiK as they are a trusted and reputable brand
                with unrivalled expertise in the quality of conducting extensive
                and efficient code auditing. Our community deserves nothing but
                the best, and quality polished code is paramount to that.
              </p>
            </div>
            <a
              href="https://medium.com/zzzfinance/certik-completes-audit-of-zzz-smart-contracts-c925ae8786d"
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Read more
            </a>
          </Certik>
          <h2 style={{ textAlign: "center" }}>Ongoing farms</h2>
          <PoolPreviewContainer showLink={true} />
        </HomeContent>
      </Layout.MainContent>
    </Layout>
  );
}
export default observer(Home);

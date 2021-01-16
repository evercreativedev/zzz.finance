import learn_img from "assets/learn.png";
import Layout from "components/Layout";
import React from "react";
import boxes from "./LearnBoxes";
import { HomeContent, InfoBox, InfoBoxes, LearnTitle } from "./Learn.styles";

const title = "Welcome to the ZZZ University.";
const subtitle =
  "Even if you've never used cryptocurrency before, we'll walk you through the basics of DeFi and the new features to the ZZZ ecosystem.";

function Learn() {
  return (
    <Layout view="Learn" type="vertical">
      <Layout.ExtraLearnContent>
        <LearnTitle>
          <img src={learn_img} alt="zzz-university" />
          <div id="learn-right">
            <div id="title">{title}</div>
            <div id="subtitle">{subtitle}</div>
          </div>
        </LearnTitle>
      </Layout.ExtraLearnContent>
      <Layout.MainContent view="learn">
        <HomeContent>
          <InfoBoxes>
            {boxes.map((box) => (
              <InfoBox color={box.color}>
                <div className="title">{box.title}</div>
                {box.image && <img src={box.image} className={box.id} alt="crypto university" />}
                <div className="explanation">
                  <div className="explanation-content">
                    {box.text}
                    <a className="button" href={box.link} target="_blank" rel="noopener noreferrer">
                      {box.linkText ? box.linkText : "Watch"}
                    </a>
                  </div>
                </div>
              </InfoBox>
            ))}
          </InfoBoxes>
        </HomeContent>
      </Layout.MainContent>
    </Layout>
  );
}
export default Learn;

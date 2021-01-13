import styled from "styled-components";

export const GovernanceIframe = styled.iframe`
  width: 100%;
  height: 100vh;
`;
export const GovernanceTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 150px;
  margin-left: 15%;
  color: #000;
  font-size: 45px;
  font-weight: bold;
  line-height: 1.5;
  justify-content: space-evenly;

  .title-image {
    height: 200px;
    width: auto;
  }

  .discuss-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 100px;
      width: auto;
    }
  }

  .join-button {
    margin-top: 5%;
    align-self: center;
    background-color: #9553a0;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 8px 10px;
    width: 100px;
    font-weight: 700;

    &:hover {
      background-color: #ba68c8;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 0.75em;
    margin-left: 0;
    font-size: 35px;
    line-height: 1.2;

    #title {
      font-size: 30px;
    }

    #subtitle {
      font-size: 12px;
      max-width: 500px;
    }
  }

  #subtitle {
    font-weight: normal;
    font-size: 18px;
    max-width: 500px;
  }
  @media (max-width: 1024px) {
  }
`;

export const GovernanceContent = styled.div`
  opacity: 0.7;
  pointer-events: none;
  /* position: relative; */

  .placeholder {
    font-size: 100px;
    font-weight: bold;
    opacity: 0.7;
    transform: rotate(-45deg);
    position: absolute;
    left: 20%;
    top: 20%;

    @media (max-width: 1024px) {
      left: 1%;
      font-size: 50px;
    }
  }

  .container {
    flex: 1;
    height: 100%;
    display: flex;
    margin-top: 2%;
    margin-left: 15%;
  }

  .main-content {
    flex: 2;
  }

  .side-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    margin-left: 5%;
  }

  .tabs {
    display: flex;
    justify-content: space-evenly;
    padding: 0 30px;
  }

  .page {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c4c4c4;

    &:hover {
      background-color: #5e5d5d;
    }
  }

  .page.selected {
    background-color: #000;
  }

  .tab {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    .side-content {
      display: none;
    }

    .container {
      margin-left: 16px;
    }
  }
`;

export const GovernanceProposal = styled.div`
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: -4px 4px 5px #dfdfdf;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 5%;
  display: flex;
  flex: 1;
  flex-direction: column;

  .proposal {
    display: flex;
  }

  .proposal-left {
    flex: 2;
    margin-right: 20px;
  }

  .proposal-right {
  }

  .proposal-id {
    text-decoration: underline;
    font-weight: 700;
    font-size: 24px;
  }

  .proposal-desc {
    margin-left: 10px;
    display: inline;
    font-weight: 700;
    font-size: 22px;
    line-height: 1;
  }

  .proposal-buttons {
    margin-top: 20px;
  }

  .proposal-buttons button {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    margin-right: 10px;
    min-width: 100px;

    &:hover {
      cursor: pointer;
    }
  }

  .proposal-buttons button.yes {
    background-color: #079992;
    &:hover {
      background-color: #28cec6;
    }
  }

  .proposal-buttons button.no {
    background-color: #d63031;
    &:hover {
      background-color: #e27a7b;
    }
  }

  .proposal-buttons button.read-more {
    background-color: #0984e3;
    &:hover {
      background-color: #a2cdf0;
    }
  }

  .proposal-countdown {
    background-color: #f8f9f9;
    align-items: center;
    border-radius: 10px;
    padding: 20px 20px 0px;
    font-size: 40px;
    font-weight: 700;
    border: 1px solid #c8c8c8;
  }

  .proposal-remaining {
    font-size: 16px;
    display: block;
    font-weight: 500;
  }

  .proposal-vote-results {
    background-color: #d63031;
    width: 200px;
    color: #fff;
    height: 30px;
  }

  .proposal-vote-bar {
    background-color: #079992;
    width: 50%;
    height: 30px;
  }

  .proposal-vote-tally {
    padding-left: 20px;
    position: absolute;
    margin: 0;
  }
`;

export const GovernanceJoin = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: -4px 4px 5px #dfdfdf;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10%;

  .title {
    font-size: 24px;
    font-weight: 700;
  }

  .join {
    display: flex;
    align-items: center;
  }

  .join-text {
    line-height: 1.5;
  }
`;

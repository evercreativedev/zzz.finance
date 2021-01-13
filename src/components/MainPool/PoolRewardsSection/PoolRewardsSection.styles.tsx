import styled from "styled-components";

export const RewardsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;

  .button {
    margin: 5px;
    font-size: 11px;
    display: flex;
    align-items: center;
    color: white;
    text-transform: uppercase;
  }

  .button-container {
    display: flex;
    div {
      max-height: 20px;
    }
  }

  .rewards-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    flex: 1;
    margin-top: 15px;
  }

  .rewards-amount {
    font-size: 12px;
    flex: 0.5;
  }

  .rewards-amount-usd {
    font-weight: bold;
    color: #60db97;
    flex: 0.5;
  }
  .button-container {
    flex: 2;
    margin-bottom: 10px;
  }
`;

import styled from "styled-components";

export const CompensationContainer = styled.div`
  height: 100%;
  min-width: 320px;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid black;
  background-color: #1d1d1d;
  border-radius: 8px;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  .wallet-unlock {
    margin-top: 24px;
  }

  .user-info {
    margin-bottom: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .claim-button {
    background-color: #fff;
    color: #1d1d1d;
    cursor: pointer;
    margin-top: 14px;
    padding: 10px 28px 7px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 18px;
    :hover {
      opacity: 0.8;
    }
  }

  .disabled {
    pointer-events: none;
    opacity: 0.3;
  }
  @media (max-width: 1024px) {
    .user-info {
      border-radius: 0;
      height: 60vh;
    }

    .total-naps {
      text-align: center;
      font-size: 14px;
      padding: 0 14px;
    }
  }
  @media (max-width: 1024px) {
    border-radius: 0;
  }
`;
export const CompensationTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 150px;
  color: #f3f3f3;
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

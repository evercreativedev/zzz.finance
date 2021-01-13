import styled from "styled-components";

export const BoostModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "60%",
    height: "80%",
    padding: "12px 40px",
  },
};

export const BuyButtons = styled.div<any>`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-left: ${({ activePools }) => activePools && "10%"};
  @media (max-width: 1024px) {
    margin-top: 16px;
    margin-left: 0px;
    font-size: 12px;
  }
`;

export const SwapButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.65);
  padding: 0.3em 2em;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  line-height: 36px;
  text-decoration: none;
  box-shadow: 3px 3px 27px 6px rgba(53, 0, 53, 0.7);

  cursor: pointer;
  transition: opacity 0.25s linear;

  img {
    border-radius: 50px;
    border: 2px solid rgba(255, 255, 255, 0.65);
  }
  :hover {
    opacity: 0.85;
  }

  :active {
    transform: translateY(1px);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0.2em 1.5em;
  }
`;

export const SwapButtonZZZ = styled(SwapButton)`
  background-color: #26063b;
`;
export const SwapButtonNAP = styled(SwapButton)`
  background-color: #17202a;
`;

const BuyButton = styled.a`
  display: flex;
  align-items: center;
  padding: 0.3em 2em;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  line-height: 36px;
  text-decoration: none;
  box-shadow: 3px 3px 27px 6px rgba(0, 0, 0, 0.7);
  span {
    margin-left: 5px;
    margin-top: 5px;
  }
  .uni-logo {
    width: 25px;
    height: auto;
    margin-bottom: 5px;
    margin-left: 5px;
  }

  cursor: pointer;
  transition: opacity 0.25s linear;
  :hover {
    opacity: 0.85;
  }

  :active {
    transform: translateY(1px);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0.2em 1.5em;
  }
`;

export const BuyButtonZZZ = styled(BuyButton)`
  background-color: #26063b;
`;
export const BuyButtonNAP = styled(BuyButton)`
  background-color: #17202a;
`;

export const TopBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(57, 58, 125, 0.15);
  padding: 6px;
  border-radius: 10px;
  flex-flow: wrap;
  @media (max-width: 768px) {
    border-radius: 0;
    flex-direction: column;
  }
`;
export const MarginForMenu = styled.div`
  margin-left: 20%;
  margin-top: 24px;
  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 76%;
  margin-left: 24%;
  margin-top: 10px;

  .flex-split {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    margin: 14px 0;
    line-height: 1;
    width: 50vw;
    text-align: center;

    border-radius: 10px;
    background-color: rgba(57, 58, 125, 0.15);

    @media (max-width: 768px) {
      width: 100%;
    }

    img {
    }

    .text-container {
      text-align: left;
      padding: 8px;
      flex: 3;
    }

    .balances-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.4s;
    }
  }

  .info-balances {
    background-color: transparent;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .balance-token {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .balance-token-name {
    margin-top: 7px;
    font-size: 11px;
  }

  .balance-token-icon {
    background: rgba(255, 255, 255, 1);
    border-radius: 25px;
    border: 2px solid black;
    height: 22px;
    margin: 2px 4px;
    padding: 4px;
    width: 22px;
  }

  .balances {
    width: 20vw;
    padding: 0 7px;
    justify-content: flex-start;
    line-height: 1.1;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;

    h3 {
      margin: 9px 14px 0;
    }
  }

  .account-number {
    font-size: 12px;
  }

  .balances-container {
    .balances-title {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      svg {
        cursor: pointer;
        :hover {
          opacity: 0.7;
        }
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    width: 100%;
    .info {
      justify-content: center;
      margin: 14px 0;
      border-radius: 0;
    }
  }

  a {
    color: black;
  }

  .info-scam {
    padding: 20px;
    width: 91%;
    text-align: center;
  }
`;
type PoolCategoryLinkProps = {
  isActive: boolean;
};

export const ExtraContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  margin-top: 15px;
  align-items: flex-start;
  flex: 1;
  position: relative;

  .box-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .help-box {
    display: none;

    @media (max-width: 768px) {
      h3 {
        margin: 0;
      }
      display: block;
      background-color: transparent !important;
      width: 150px;
      padding: 0;
      margin-bottom: 14px;
      color: white;
      font-size: 13px;
    }
  }

  @media (max-width: 1400px) {
    padding: 0;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #17202a;
  border-radius: 10px;
  justify-content: center;
  margin: 8px;
  padding: 14px;
  min-width: 150px;
  flex: 1;

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  @media (max-width: 1400px) {
    min-width: 0;
    h3 {
      font-size: 12px;
    }
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 10px;
  }
`;

export const FuckThisBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: #17202a;
  border-radius: 10px;
  justify-content: center;
  margin: 8px;
  padding: 14px;
  min-width: 150px;
  flex: 1;

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  @media (max-width: 768px) {
    min-width: 0;
    h3 {
      font-size: 12px;
    }
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 10px;
    border-radius: 0;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

export const HelpBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;

  svg {
    fill: white;
    width: 18px;
    margin-bottom: 6px;
  }
`;

export const PoolCategoryLink = styled.div<PoolCategoryLinkProps>`
  margin: 0 18px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: ${(props) => props.isActive && "underline"};
  :hover {
    opacity: 0.8;
  }
`;

export const PoolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  .pool-categories {
    display: flex;
  }
`;

export const AcademyBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: -4px 4px 5px #dfdfdf;
  border-radius: 10px;
  margin: 8px;
  padding: 14px;
  min-width: 150px;
  flex: 1;

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

  .join-button {
    align-self: flex-start;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 8px 10px;
    width: 100px;
    font-weight: 700;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

export const BoostingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: -4px 4px 5px #dfdfdf;
  border-radius: 10px;
  margin: 8px;
  padding: 14px;
  height: 100px;
  flex: 1;

  .boosting-title {
    font-sizee: 22px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .join {
    display: flex;
    align-items: center;
  }

  .join-text {
    line-height: 1.5;
  }

  .join-button {
    align-self: flex-start;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 8px 10px;
    font-weight: 700;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .boosting-icon {
    width: 40px;
    margin-bottom: 10px;
  }
`;

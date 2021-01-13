import styled from "styled-components";
import url from "assets/pools_bg.svg";
import academy_bg from "assets/academy_bg2.png";
import gov_bg from "assets/gov_bg.png";

type ContainerProps = {
  type?: "horizontal" | "vertical";
  view?: string;
  backgroundColor?: string;
};

export const FlexContainer = styled.div<ContainerProps>`
  display: flex;
  background: ${(props) => (props.view === "Pools" ? "linear-gradient(90deg, #cbcde5 12%, #f8f9f9 50%)" : "#f8f9f9")};
  flex-direction: ${(props) => (props.type === "horizontal" ? "row" : "column")};
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: ${(props) => props.view === "Pools" && "column-reverse"};
  }
`;

export const MainContent = styled.div<ContainerProps>`
  padding: ${(props) => (props.view === "governance" ? 0 : "1em")};
  flex: ${(props) => (props.view === "compensation" ? 50 : 1)};
  background-color: ${({ backgroundColor }) => backgroundColor || undefined};
  background: ${(props) => props.view === "learn" && `url(${academy_bg})`};
  background-size: cover;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ExtraContent = styled.div<ContainerProps>`
  background-color: ${(props) => (props.color ? props.color : "#021b31")};
  flex: ${(props) => (props.view === "Pools" ? "0.4" : "1")};
  background-image: ${(props) => props.view === "Pools" && `url(${url})`};
  background-repeat: no-repeat;
  :before {
    height: 10px;
    background-size: 20px 20px;
    background-image: radial-gradient(circle at 10px -5px, transparent 12px, white 13px);
  }

  :after {
    height: 15px;
    background-size: 40px 20px;
    background-image: radial-gradient(circle at 10px 15px, white 12px, transparent 13px);
  }

  @media (max-width: 1024px) {
    flex: 0;
  }
`;

export const ExtraLearnContent = styled.div<ContainerProps>`
  background-color: #0984e3;
  :before {
    height: 10px;
    background-size: 20px 20px;
    background-image: radial-gradient(circle at 10px -5px, transparent 12px, white 13px);
  }

  :after {
    height: 15px;
    background-size: 40px 20px;
    background-image: radial-gradient(circle at 10px 15px, white 12px, transparent 13px);
  }
`;

export const ExtraGovernanceContent = styled.div<ContainerProps>`
  background: #fff;
  background-image: url(${gov_bg});
  background-repeat: no-repeat;
  background-size: 25%;
  :before {
    height: 10px;
    background-size: 20px 20px;
    background-image: radial-gradient(circle at 10px -5px, transparent 12px, white 13px);
  }

  :after {
    height: 15px;
    background-size: 40px 20px;
    background-image: radial-gradient(circle at 10px 15px, white 12px, transparent 13px);
  }

  @media (max-width: 1024px) {
    .title-image {
      border-radius: 100px;
      margin-bottom: 1em;
      height: 175px !important;
      border: 2px solid #1d1d1d;
    }

    .convo-image {
      border-radius: 60px;
      border: 2px solid #1d1d1d;
    }
    background-size: cover;
  }
`;

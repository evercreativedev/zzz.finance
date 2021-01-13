import styled from "styled-components";

export const LearnTitle = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 350px;
  margin-left: 15%;
  margin-top: 5.5vh;
  color: #f8f9f9;
  font-size: 45px;
  font-weight: bold;
  line-height: 1.5;
  justify-content: flex-start;

  img {
    height: 235px;
    margin-right: 86px;
  }

  #title {
  }

  #subtitle {
    font-size: 26px;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    width: 90vw;
    margin-right: auto;
    margin-left: auto;
    font-size: 35px;
    line-height: 1.2;
    margin-top: 0.5vh;

    #title {
      font-size: 30px;
    }

    #subtitle {
      font-size: 16px;
      max-width: 500px;
    }

    #learn-right {
      padding: 16px;
    }

    img {
      width: 135px;
      height: 135px;
    }
  }

  @media (max-width: 1024px) {
    margin-left: 5%;
    width: 80%;
  }
`;

export const HomeContent = styled.div`
  width: 75vw;
  margin-left: 15%;
  margin-right: auto;

  .learn-links {
    display: flex;
    justify-content: space-evenly;
    max-width: 300px;
  }

  .underlined {
    text-decoration: underline;
  }

  .info {
    background-color: rgba(57, 58, 125, 0.15);
    padding: 14px;
    border-radius: 10px;
    text-align: center;
    line-height: 1.2;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
      width: 80vw;
    }
  }

  p {
    text-align: left;
    margin-left: 30px;
    margin-right: 30px;
  }

  .buy-links {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    margin-left: auto;
    width: 50%;
    margin-right: auto;

    .learn-links {
      margin: 6px auto;
      font-size: 12px;
    }
  }

  @media (max-width: 1024px) {
    margin-left: auto;
    width: 100%;
  }
`;

export const InfoBoxes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

type InfoBoxProps = {
  color: string;
};

export const InfoBox = styled.div<InfoBoxProps>`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  background-color: ${(props) => props.color};
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  margin-bottom: 16px;

  .icon {
    position: relative;
    border: 2px solid #0b5345;
    border-radius: 30px;
    width: 35px;
    height: 35px;

    svg {
      position: absolute;
      bottom: 6px;
      left: -1px;
      width: 20px;
      height: 20px;
    }
  }

  .title {
    padding: 8px;
    color: #e7e7e7;
    font-size: 27px;
    font-weight: bold;
    min-height: 50px;
    padding-top: 35px;
  }
  .explanation {
    color: #000;
    font-size: 19px;
    line-height: 28px;
    font-weight: bold;
    background-color: #f3f3f3;
    width: 100%;
    min-height: 150px;
  }

  img {
    width: 50%;
    height: auto;
    margin-bottom: 0px;
  }

  .uni {
    border-radius: 10px;
  }

  .explanation-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 134px;
    align-items: center;
    text-align: center;
    line-height: 1.1;
    padding: 16px 28px;
  }
  .button {
    display: block;
    background: #0984e3;
    width: 80px;
    border-radius: 2px;
    color: white;
    padding: 14px 28px 8px 28px;
    margin-top: 14px;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 19px;
      padding-top: 14px;
    }
    .explanation {
      font-size: 14px;
    }

    img {
      margin-bottom: 25px;
    }
    margin-top: 1em;
    margin-bottom: 1em;
    width: 250px;
  }
`;

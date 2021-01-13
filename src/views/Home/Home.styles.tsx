import styled from "styled-components";

export const HomeTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 70vw;
  min-height: 178px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5vh;
  color: #f8f9f9;
  font-size: 45px;
  font-weight: bold;
  line-height: 1.5;

  @media (max-width: 768px) {
    #title {
      font-size: 24px;
      margin-bottom: 14px;
    }
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    margin-right: auto;
    margin-left: auto;
    font-size: 35px;
    line-height: 1.2;
  }
`;
export const Certik = styled.div`
  background-color: rgba(2, 27, 49, 0.85);
  color: #eee;
  width: 60%;
  margin-top: 28px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 75%;
    height: auto;
  }
  .certik-text {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 120px;
  }

  a {
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 21px;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 14px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    img {
      width: 100%;
    }
    .certik-text {
      padding: 10px 16px;
    }
  }
`;

export const HomeContent = styled.div`
  width: 75vw;
  margin-left: auto;
  margin-right: auto;

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
    width: 100%;
    p {
      margin-left: 7px;
      margin-right: 7px;
    }
  }
`;

export const InfoBoxes = styled.div`
  display: flex;
  align-items: space-evenly;
  justify-content: space-evenly;
  margin-top: 2.5em;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 175px;
      width: auto;
    }
    position: relative;

    width: 150px;
    height: 150px;

    svg {
      position: absolute;
      bottom: 15px;
      left: 10px;
    }
  }

  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .explanation {
    text-align: center;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    margin-bottom: 1em;
  }
`;

export const Introduction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 80vw;

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 24px;
    width: 50vw;

    background-color: rgba(57, 58, 125, 0.15);
    border-radius: 10px;
    box-shadow: 2px 2px 5px -2px rgba(140, 140, 140, 1);
    @media (max-width: 1280px) {
      width: 100%;
    }
  }

  .info-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    line-height: 1.5;

    padding: 0 80px;
  }
  @media (max-width: 1280px) {
    max-width: 100vw;
    flex-direction: column;
    align-items: center;
    .info {
      margin: 14px 0;
      margin-left: 4px;
    }

    .info-content {
      padding: 0 30px;
    }
  }

  a {
    color: black;
  }
`;

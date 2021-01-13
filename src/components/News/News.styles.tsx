import styled from "styled-components";

export const NewsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  margin-bottom: 28px;

  font-size: 16px;
  font-weight: bold;

  background-color: black;
  color: white !important;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .info-icon-container {
    display: flex;
    justify-content: center;
    flex: 0.15;
    span {
      font-size: 60px;
      max-height: 50px;
      margin-bottom: 70px;
      color: white;
    }
  }
  .news-content-link {
    color: #eee;
  }

  .news-browse {
    flex: 0.15;
    margin-right: 14px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    width: 100%;
    border-radius: 0;
    .extra-text {
      text-align: center;
      padding: 0 14px;
    }
  }
`;

export const NewsContentLink = styled.a`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  .main-text {
    padding: 0 28px;
    text-align: center;
  }
  .extra-text {
    font-size: 12px;
    font-weight: normal;
  }
  &:hover {
    opacity: 0.8;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 50vw;
  @media (max-width: 768px) {
    width: 100vw;
  }

  .pool-status-info {
    color: hotpink;
    font-weight: bold;
    font-size: 18px;
    margin: 8px 0;
  }
  @media (max-width: 768px) {
    .pool-status-info {
      font-size: 13px;
    }
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  margin-bottom: 8px;

  box-shadow: 0px 6px 5px #dfdfdf;

  .button {
    font-weight: bold;
    font-size: 18px;
    flex: 1;
    margin: 0;
    border-radius: 0;
  }
  .button:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .button:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media (max-width: 768px) {
    button {
      font-size: 15px;
    }
    button:first-child {
      border-radius: 0;
    }
    button:last-child {
      border-radius: 0;
    }
  }
`;

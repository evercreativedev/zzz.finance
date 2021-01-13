import styled from "styled-components";

export const WalletUnlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const WalletUnlockButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;

  background-color: black;

  color: white;
  font-weight: bold;
  margin: 0 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  transition: opacity 0.2s;

  .connector {
    padding: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    img {
      margin-left: 14px;
      margin-bottom: 4px;
    }
  }

  .connector-title {
  }

  :hover {
    opacity: 0.65;
  }
`;

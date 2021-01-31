import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to right, rgba(23, 32, 42, 1), rgba(44, 62, 80, 1));
  margin: 5px;
  border-radius: 10px;
  /* position: relative; */
  width: 100%;
  color: #eee;
  -webkit-box-shadow: 3px 6px 31px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 31px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 31px -1px rgba(0, 0, 0, 0.55);

  .boost-selectors {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .col {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    margin: 4px;
    text-align: center;
  }

  @media (max-width: 1400px) {
    margin: 16px 0;
    border-radius: 0;
  }

  .status-text {
    color: lightyellow;
  }
`;

export const PoolData = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1400px) {
    flex-direction: column;
  }
`;

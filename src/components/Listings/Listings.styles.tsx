import styled from "styled-components";

export const ListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(57, 58, 125, 0.15);
  border-radius: 10px;
  box-shadow: 2px 2px 5px -2px rgba(140, 140, 140, 1);

  min-width: 340px;

  margin-bottom: 36px;
  .uniswaps {
    margin: 24px 0;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    a {
      padding: 0 21px;
      // border: 2px solid black;
      border-radius: 150px;
    }
    .zzz-listing {
      background-color: #ffffff;
      color: #000;
    }
    .nap-listing {
      background-color: #263b4e54;
    }

    .dream-listing {
      background-color: #e3eeff;
    }
  }
  .listing {
    margin: 14px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    align-self: center;
    .whitebit-image {
      // background-color: #27221f;
    }
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }
`;

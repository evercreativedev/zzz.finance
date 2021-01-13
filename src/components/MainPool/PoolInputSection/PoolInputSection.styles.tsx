import styled from "styled-components";

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1.75;

  .button {
    margin: 5px 2px;
    font-size: 11px;
    text-transform: uppercase;
    color: white;
  }
  .button-container {
    margin-top: 7px;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 1fr;
  }

  .title {
    font-size: 12px;
    font-weight: bold;
  }

  input {
    height: 45px;
    border: none;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.7)
    );
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    color: white;
    width: 220px;
  }

  @media (max-width: 768px) {
    input {
      width: 75%;
    }
    .button-container {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }
`;

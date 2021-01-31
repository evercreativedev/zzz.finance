import styled from "styled-components";

export const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: rgba(23, 32, 42, 0.8);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  .boost-approve {
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: center;

    &:hover {
      opacity: 0.7;
    }
  }

  .too-poor {
    opacity: 0.7;
  }

  .boost-button {
    height: 100%;
    width: 100%;
    padding: 4px 2px;
    cursor: pointer;

    &.active {
      background-color: #58aa58;
      opacity: 1 !important;
    }
    &.disabled {
      /* pointer-events: none; */
    }

    &:hover:not(.active):not(.disabled) {
      background-color: rgba(88, 214, 141, 0.35);
    }
  }

  .boost-button:first-child {
    border-bottom-left-radius: 10px;
  }
  .boost-button:last-child {
    border-bottom-right-radius: 10px;
  }

  .button {
    color: white;
    font-weight: bold;
    width: 100%;
    height: 15px;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      font-size: 10px;
    }
  }

  @media (max-width: 768px) {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    flex-direction: column;

    .boost-button:first-child {
      border-bottom-left-radius: 0px;
    }
    .boost-button:last-child {
      border-bottom-right-radius: 0px;
    }
  }
`;

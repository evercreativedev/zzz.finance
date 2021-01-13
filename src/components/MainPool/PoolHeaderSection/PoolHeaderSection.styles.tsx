import styled from "styled-components";

export const PartnerModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "65%",
    height: "70%",
    padding: "12px 40px",
  },
};

export const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: rgba(23, 32, 42, 0.8);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  a {
    color: white;
  }
  .header-text {
    text-align: center;
    padding-top: 6px;
    font-weight: bold;
    font-size: 14px;
    flex: 1;
  }

  .buy-button {
    cursor: pointer;
    color: #eee;
  }
  .buy-button:hover {
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    .header-text {
      font-size: 12px;
    }
  }
`;

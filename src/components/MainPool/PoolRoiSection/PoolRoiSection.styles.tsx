import styled from "styled-components";

export const RoiSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 0.75;
  margin: 4px 0;

  .roi-title {
    font-size: 15px;
    font-weight: bold;
  }

  .roi-entry {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      margin-left: 5px;
      color: #60db97;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .roi-title {
      margin-right: 10px;
    }
    .roi-entry {
      margin-right: 10px;
    }
  }
`;

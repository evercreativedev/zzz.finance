import styled from "styled-components";

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  .pool-icon {
    font-size: 43px;
    flex: 1;
    line-height: 45px;
    max-width: 100px;
  }

  .migration-pool {
    margin-top: -15px;
    box-shadow: 10px 2px 58px 18px rgba(71, 189, 167, 0.35);
    border-radius: 40px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    padding: 0px 4px;
  }

  .pool-name {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 22px;
    flex: 2;
  }
  .pool-info {
    font-size: 12px;
    font-weight: bold;
    flex: 2;
  }

  .pool-balance {
    font-size: 12px;
    span {
      font-weight: bold;
      color: #60db97;
      margin-left: 4px;
    }
  }

  @media (max-width: 768px) {
    .pool-icon {
      font-size: 35px;
    }
  }
`;

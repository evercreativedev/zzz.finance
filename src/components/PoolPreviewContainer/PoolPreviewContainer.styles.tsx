import styled from "styled-components";
type ContainerProps = {
  full: boolean;
};
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  margin: 14px;
  justify-content: center;
  width: ${(props) => (props.full ? "100%" : "50vw")};
  margin-left: auto;
  margin-right: auto;

  .header {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const PoolCategoryContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const PoolsContainer = styled.div`
  display: grid;
  grid-template-columns: 30px repeat(5, minmax(50px, 1fr));
  grid-gap: 5px;
  background-color: #fff;
  color: #444;
  padding: 12px;
  border-radius: 10px;

  @media (max-width: 1280px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const Headers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex: 1;
`;

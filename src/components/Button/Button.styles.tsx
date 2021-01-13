import styled from "styled-components";
type ButtonProps = {
  color: string;
  rounded: boolean;
  textColor?: string;
  disabled?: boolean;
};
export const ButtonContainer = styled.div<ButtonProps>`
  font-family: "Arial";
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 80px;
  padding: 8px 4px;
  text-align: center;
  border-radius: ${(props) => (props.rounded ? "5px" : "0")};
  transition: opacity 0.2s;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  opacity: ${(props) => (!props.disabled ? "1" : "0.35")};
  cursor: ${(props) => (!props.disabled ? "pointer" : "default")};

  &:hover {
    opacity: ${({ disabled }) => !disabled && 0.7};
  }

  @media (max-width: 768px) {
  }
`;

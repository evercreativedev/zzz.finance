import React from "react";
import { ButtonContainer } from "./Button.styles";
type Props = {
  onClick?: any;
  color?: string;
  textColor?: string;
  children: any;
  disabled?: boolean;
  styles?: any;
  tooltip?: string;
  rounded?: boolean;
  style?: any;
};
function Button({
  onClick,
  color = "transparent",
  textColor,
  disabled = false,
  children,
  tooltip,
  style,
  rounded = true,
}: Props) {
  return (
    <ButtonContainer
      className={`button ${disabled && "disabled"}`}
      onClick={!disabled ? onClick : () => {}}
      color={color}
      textColor={textColor}
      rounded={rounded}
      disabled={disabled}
      data-tip={tooltip}
      style={style}
    >
      {children}
    </ButtonContainer>
  );
}
export default Button;

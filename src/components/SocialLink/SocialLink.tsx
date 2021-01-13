import React from "react";
import { SocialLinkContainer } from "./SocialLink.styles";

type Props = {
  href: string;
  icon: string;
  title: string;
  color?: string;
  iconType?: string;
  iconStyle?: {};
  style?: any;
};
function SocialLink({
  href,
  icon,
  title,
  color = "#2c3e50",
  iconType,
  iconStyle,
  style,
}: Props) {
  return (
    <SocialLinkContainer color={color}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {iconType !== "emoji" ? (
          <img src={icon} alt="link-icon" style={iconStyle} />
        ) : (
          <span
            className="emoji-icon"
            role="img"
            aria-label="emoji"
            style={iconStyle}
          >
            {icon}
          </span>
        )}
        <div className="social-title">{title}</div>
      </a>
    </SocialLinkContainer>
  );
}
export default SocialLink;

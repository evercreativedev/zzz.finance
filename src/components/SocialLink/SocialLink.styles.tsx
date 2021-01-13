import styled from "styled-components";

export const SocialLinkContainer = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  width: 75px;
  height: 10px;
  margin: 0 4px;
  transition: opacity 0.2s;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    color: white;
  }
  img {
    height: 20px;
  }
  .social-title {
    margin-top: 7px;
    margin-left: 5px;
    font-weight: bold;
  }

  .emoji-icon {
    margin-top: 6px;
  }

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin: 4px;
    img {
      height: 18px;
      font-size: 8px;
      a {
        font-size: 8px;
      }
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.25em;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 14px;
  }
`;

import React from "react";
import {
  ExtraContent,
  ExtraGovernanceContent,
  ExtraLearnContent,
  FlexContainer,
  MainContent,
} from "./Layout.styles";

type Props = {
  children: any;
  view: string;
  type: "vertical" | "horizontal";
};

function Layout({ view, children, type }: Props) {
  return (
    <FlexContainer type={type} view={view}>
      {children}
    </FlexContainer>
  );
}

Layout.MainContent = ({ children, view, backgroundColor }: any) => {
  return (
    <MainContent view={view} backgroundColor={backgroundColor}>
      {children}
    </MainContent>
  );
};

Layout.ExtraContent = ({ children, view, color }: any) => {
  return (
    <ExtraContent view={view} color={color}>
      {children}
    </ExtraContent>
  );
};

Layout.ExtraLearnContent = ({ children }: any) => {
  return <ExtraLearnContent>{children}</ExtraLearnContent>;
};

Layout.ExtraGovernanceContent = ({ children }: any) => {
  return <ExtraGovernanceContent>{children}</ExtraGovernanceContent>;
};

export default Layout;

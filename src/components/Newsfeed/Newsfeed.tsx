import Spinner from "components/Spinner/Spinner";
import React, { useEffect } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}
window.twttr = window.twttr || {};

function Newsfeed() {
  useEffect(() => {
    if (window?.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <a
      className="twitter-timeline"
      data-width="375"
      data-height="525"
      href="https://twitter.com/zzzfinance?ref_src=twsrc%5Etfw"
      style={{
        display: window?.twttr?.widgets ? "flex" : "inital",
        justifyContent: window?.twttr?.widgets && "center",
      }}
    >
      <Spinner height={100} width={100} color="#6e7ba7" type="ThreeDots" condition={false} timeout={5000}>
        {" "}
      </Spinner>
    </a>
  );
}
export default Newsfeed;

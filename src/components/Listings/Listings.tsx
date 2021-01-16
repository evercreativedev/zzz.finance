import React from "react";
import whitebit from "assets/whitebit_grey.webp";
import cointiger from "assets/cointiger.webp";
import coinmarket from "assets/coinmarketcap.webp";
import bilaxy from "assets/bilaxy.webp";
import uniswap from "assets/whitebite.webp";

import coingecko from "assets/coingecko.webp";
import { ListingsContainer } from "./Listings.styles";

function Listings() {
  return (
    <ListingsContainer>
      <h1 style={{ gridColumn: "1/3", justifySelf: "center" }}>Uniswap</h1>
      <div className="uniswaps">
        <a
          className="listing zzz-listing"
          href="https://info.uniswap.org/pair/0x4b29ed4190d8387755510feee729fbc974152a0c"
          target="blank"
          rel="noopener noreferrer"
        >
          <img
            className="uniswap-image"
            src={uniswap}
            alt="uniswap"
            style={{
              padding: "8px",
              width: "75px",
              height: "auto",
            }}
          />
          ZZZ
        </a>
        <a
          className="listing nap-listing"
          href="https://info.uniswap.org/pair/0x5c599e277c981d796dbf94c6e79ddac610d6052b"
          target="blank"
          rel="noopener noreferrer"
        >
          <img
            className="uniswap-image"
            src={uniswap}
            alt="uniswap"
            style={{
              padding: "8px",
              width: "75px",
              height: "auto",
            }}
          />
          NAP
        </a>
        <a
          className="listing dream-listing"
          href="https://info.uniswap.org/pair/0x19b3de48392778f8e6ef332fee002aa5e15fe41a"
          target="blank"
          rel="noopener noreferrer"
        >
          <img
            className="uniswap-image"
            src={uniswap}
            alt="uniswap"
            style={{
              padding: "8px",
              width: "75px",
              height: "auto",
            }}
          />
          DREAM
        </a>
      </div>
      <h1 style={{ gridColumn: "1/3", justifySelf: "center" }}>Exchanges</h1>
      <a className="listing" href="https://whitebit.com/referral/zzz_finance1" target="blank" rel="noopener noreferrer">
        WhiteBIT
        <img
          className="whitebit-image"
          src={whitebit}
          alt="whitebit"
          style={{
            // backgroundColor: "#27221f",
            padding: "8px",
            width: "165px",
            height: "auto",
          }}
        />
      </a>
      <a className="listing" href="https://bilaxy.com/trade/ZZZ_ETH" target="blank" rel="noopener noreferrer">
        Bilaxy
        <img
          className="bilaxy-image"
          src={bilaxy}
          alt="bilaxy"
          style={{
            padding: "8px",
            width: "128px",
            height: "auto",
          }}
        />
      </a>
      <a className="listing" href="https://www.cointiger.com/en-us/#/trade_center?coin=zzz_usdt" target="blank" rel="noopener noreferrer">
        Cointiger
        <img
          className="cointiger-image"
          src={cointiger}
          alt="cointiger"
          style={{
            padding: "8px",
            width: "128px",
            height: "auto",
          }}
        />
      </a>
      <h1 style={{ gridColumn: "1/3", justifySelf: "center" }}>Find us on</h1>
      <a className="listing" href="https://www.coingecko.com/en/coins/zzz-finance" target="blank" rel="noopener noreferrer">
        Coingecko
        <img
          className="coingecko-image"
          src={coingecko}
          alt="coingecko"
          style={{
            padding: "8px",
            width: "128px",
            height: "auto",
          }}
        />
      </a>
      <a className="listing" href="https://coinmarketcap.com/currencies/zzz-finance/" style={{ gridColumn: "1 / 3" }}>
        Coinmarketcap
        <img
          className="coinmarket-image"
          src={coinmarket}
          alt="coinmarket"
          style={{
            padding: "8px",
            width: "128px",
            height: "auto",
          }}
        />
      </a>
    </ListingsContainer>
  );
}
export default Listings;

import React from "react";
import { BalanceContainer } from "./Balances.styles";

type Props = {};
function Balances({}: Props) {
  return (
    <BalanceContainer>
      <table>
        <th></th>
        <th>Token</th>
        <th>Amount</th>
        <th>USD</th>
        <tr>
          <td>
            <span role="img" aria-label="zzz">
              💤
            </span>
          </td>
          <td>ZZZ</td>
          <td>20</td>
          <td>2000</td>
        </tr>
        <tr>
          <td>
            <span role="img" aria-label="nap">
              😪
            </span>
          </td>
          <td>NAP</td>
          <td>200000</td>
          <td>1443</td>
        </tr>
        <tr>
          <td>
            <span role="img" aria-label="dream">
              🔮
            </span>
          </td>
          <td>DREAM</td>
          <td>175000</td>
          <td>200</td>
        </tr>
      </table>
    </BalanceContainer>
  );
}
export default Balances;

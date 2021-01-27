import React from "react";
import "./MigrationInfo.scss";

function MigrationInfo() {
  return (
    <div className="boosting-info-content">
      <h2>Migration to V2</h2>
      <p>
        So as time passes and further ecosystem requirements are needed the time
        has come to implement the next version of ZZZ.
      </p>
      <h3>The process</h3>
      <p>
        Most importantly:{" "}
        <b>V1 tokens staked in the pools will not be withdrawable back.</b>
        <br />
        <br />
        Secondly:{" "}
        <b>
          After the two weeks running time it is NOT possible to convert your V1
          tokens to V2 natively.
        </b>
      </p>
      <p>
        During the pools running time, withdrawal, exit and claim are disabled.
      </p>
      <p>
        When the pool ends a migration state will be triggered and we will be
        updating the token references in the contracts to the version 2 tokens.
      </p>
      <p>
        During this phase <b>NO</b> user actions are available.
      </p>
      <p>
        After this phase is done the contracts will be triggered to a finished
        state and users will be able to fully exit the pools.
      </p>
      <br />
      <h4>Your deposits and rewards will be both in V2.</h4>
    </div>
  );
}

export default MigrationInfo;

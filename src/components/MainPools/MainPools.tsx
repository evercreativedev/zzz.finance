import React, { useState } from "react";
import { pools } from "eth/contracts";
import { Container, CategoryContainer } from "./MainPools.styles";
import { observer } from "mobx-react";
import Button from "components/Button/Button";
import { Pool, PoolCategory, PoolStatus } from "types";
import MainPool from "components/MainPool/MainPool";
import EthStore from "stores/eth";
const poolCategories = [
  { category: PoolCategory.ZZZ, name: "ZZZ" },
  { category: PoolCategory.Partners, name: "Partners" },
  { category: PoolCategory.Retired, name: "Retired" },
];

function MainPools() {
  const [selectedCategory, setSelectedCategory] = useState(PoolCategory.ZZZ);
  const selectedPools = pools.filter(filterDeadPools(selectedCategory));
  const { currentBlock } = EthStore;
  return (
    <Container>
      {selectedCategory === PoolCategory.Retired && (
        <div className="pool-status-info">
          These pools are closed / closing. Please exit or withdraw all.
        </div>
      )}
      <CategoryContainer>
        {poolCategories.map(({ category, name }) => (
          <Button
            key={`button category-${category}`}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? "white" : "#17202a"}
            textColor={selectedCategory === category ? "black" : "white"}
          >
            {name}
          </Button>
        ))}
      </CategoryContainer>
      {selectedPools.map((pool) => (
        <MainPool
          key={`main-pool-${pool.id}`}
          pool={pool}
          currentBlock={currentBlock}
        />
      ))}
    </Container>
  );
}

const isAlive = (poolStatus: PoolStatus) =>
  poolStatus === PoolStatus.Ongoing || poolStatus === PoolStatus.Incoming;

const filterDeadPools = (selectedCategory: PoolCategory) => (pool: Pool) => {
  const alive = isAlive(pool.poolStatus);
  if (selectedCategory === PoolCategory.ZZZ) {
    return pool.category === PoolCategory.ZZZ && alive;
  }
  if (selectedCategory === PoolCategory.Retired) {
    return !alive;
  }
  if (selectedCategory === PoolCategory.Partners) {
    return pool.category === PoolCategory.Partners && alive;
  }
  return null;
};

export default observer(MainPools);

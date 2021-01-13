import React, { useState } from "react";
import { pools } from "eth/contracts";
import PoolPreview from "components/PoolPreview/PoolPreview";
import {
  Container,
  PoolCategoryContainer,
  PoolsContainer,
} from "./PoolPreviewContainer.styles";
import { observer } from "mobx-react";
import Button from "components/Button/Button";
import { useHistory } from "react-router-dom";
import { PoolCategory, PoolStatus } from "types";

type Props = {
  showLink?: boolean;
  full?: boolean;
};

const poolCategories = [
  { category: PoolCategory.ZZZ, name: "ZZZ" },
  { category: PoolCategory.Partners, name: "Partners" },
];

function PoolsBrowser({ showLink = false, full = false }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(PoolCategory.ZZZ);
  const selectedPools = pools.filter(
    (pool) =>
      pool.category === selectedCategory &&
      pool.poolStatus === PoolStatus.Ongoing
  );
  const history = useHistory();
  const handleClick = () => history.push("/pools");
  return (
    <Container full={full}>
      <PoolCategoryContainer>
        {poolCategories.map(({ category, name }) => (
          <Button
            key={`button category-${category}`}
            onClick={() => setSelectedCategory(category)}
            color="#2c3e50"
          >
            <span style={{ color: "#eee" }}>{name}</span>
          </Button>
        ))}
      </PoolCategoryContainer>
      <PoolsContainer>
        <div className="header header-icon"></div>
        <div className="header header-name">name</div>
        <div className="header header-staked">TVL</div>
        <div className="header header-tvl">staked</div>
        <div className="header header-tokens">LP assets</div>
        <div className="header header-roi">APY</div>
        {selectedPools.map((pool) => (
          <PoolPreview key={`farm-${pool.name}-${pool.id}`} pool={pool} />
        ))}
      </PoolsContainer>
      {showLink && (
        <Button color="#2c3e50" onClick={handleClick}>
          <span style={{ color: "#eee" }}>Enter our pools</span>
        </Button>
      )}
    </Container>
  );
}
export default observer(PoolsBrowser);

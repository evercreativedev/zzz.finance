import React, { useState } from "react";
import newsItems from "./contents/newsItems";
import { NewsContainer, NewsContentLink } from "./News.styles";

function News() {
  const [newsIndex, setNewsIndex] = useState(16);
  const newsItem = newsItems[newsIndex];
  if (!newsItem) {
    setNewsIndex(0);
    return null;
  }
  return (
    <NewsContainer>
      <div className="info-icon-container">
        <span className="info-icon" role="img" aria-label="info">
          ℹ
        </span>
      </div>
      <NewsContentLink
        className="news-content-link"
        href={newsItem.link}
        target={newsItem.id === 2 ? "" : "blank"}
        rel="noopener noreferrer"
      >
        {newsItem.text()}
        {newsItem.extra && newsItem.extra()}
      </NewsContentLink>
      <div
        className="news-browse"
        onClick={() => setNewsIndex((old) => old + 1)}
      >
        More news
      </div>
    </NewsContainer>
  );
}
export default News;

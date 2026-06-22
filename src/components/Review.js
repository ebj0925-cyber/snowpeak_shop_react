import React, { useMemo, useState } from "react";
import "./Review.css";

const FILTERS = [
  "전체",
  "디자인",
  "신축성",
  "착용감",
  "라인(핏)",
  "색상",
  "사이즈",
  "소재",
  "배송",
  "가격",
];

function maskName(name = "") {
  if (name.length <= 2) return `${name[0] || ""}*`;
  return `${name.slice(0, 1)}${"*".repeat(Math.max(2, name.length - 2))}${name.slice(-1)}`;
}

function ReviewSection({ reviews = [] }) {
  const [sortType, setSortType] = useState("latest");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [keyword, setKeyword] = useState("");
  const [photoOnly, setPhotoOnly] = useState(false);

  const averageScore = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingCounts = useMemo(() => {
    return [5, 4, 3, 2, 1].map((score) => ({
      score,
      count: reviews.filter((review) => review.rating === score).length,
    }));
  }, [reviews]);

  const photoItems = useMemo(() => {
    return reviews
      .filter((review) => review.images && review.images.length > 0)
      .flatMap((review) =>
        review.images.map((image, index) => ({
          id: `${review.id}-${index}`,
          image,
          alt: `${review.user} 리뷰 이미지 ${index + 1}`,
        }))
      )
      .slice(0, 5);
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let next = [...reviews];

    if (selectedFilter !== "전체") {
      next = next.filter((review) => review.tags?.includes(selectedFilter));
    }

    if (photoOnly) {
      next = next.filter((review) => review.images && review.images.length > 0);
    }

    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      next = next.filter(
        (review) =>
          review.content.toLowerCase().includes(q) ||
          (review.option && review.option.toLowerCase().includes(q))
      );
    }

    if (sortType === "high") {
      next.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "photo") {
      next.sort((a, b) => (b.images?.length || 0) - (a.images?.length || 0));
    } else {
      next.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return next;
  }, [reviews, selectedFilter, photoOnly, keyword, sortType]);

  return (
    <section className="review-wrap">
      <div className="review-head">
        <h3 className="review-main-title">리뷰</h3>
        <button type="button" className="review-link-btn">
          전체 상품 리뷰 보기
        </button>
      </div>

      <div className="review-ai-box">
        <div className="review-ai-title-row">
          <strong className="review-ai-title">✨ AI 리뷰 요약</strong>
          <span className="review-ai-info">i</span>
        </div>
        <p className="review-ai-text">
          가성비, 소재감, 컬러 만족도가 자주 언급됐어요.
          <br />
          포토 리뷰에서는 실물 색감과 핏에 대한 반응이 좋았습니다.
        </p>
      </div>

      <div className="review-score-summary">
        <div className="review-score-left">
          <p className="review-score-star">★{averageScore}</p>
          <p className="review-score-desc">
            {reviews.length ? `${Math.round((ratingCounts[0].count / reviews.length) * 100)}%가 아주 좋아요 라고 평가했습니다.` : "아직 등록된 리뷰가 없어요."}
          </p>
          <p className="review-score-count">리뷰 {reviews.length}개</p>
        </div>

        <div className="review-score-right">
          {ratingCounts.map((item) => (
            <div className="review-bar-row" key={item.score}>
              <span className="review-bar-label">
                {item.score === 5 && "아주 좋아요"}
                {item.score === 4 && "맘에 들어요"}
                {item.score === 3 && "보통이에요"}
                {item.score === 2 && "그냥 그래요"}
                {item.score === 1 && "별로예요"}
              </span>
              <div className="review-bar-track">
                <div
                  className="review-bar-fill"
                  style={{
                    width: reviews.length ? `${(item.count / reviews.length) * 100}%` : "0%",
                  }}
                />
              </div>
              <span className="review-bar-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-photo-section">
        <div className="review-sub-head">
          <h4 className="review-sub-title">포토&amp;동영상</h4>
          <button type="button" className="review-link-btn small">
            전체보기
          </button>
        </div>

        <div className="review-photo-row">
          {photoItems.map((item) => (
            <div className="review-photo-card" key={item.id}>
              <img src={item.image} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>

      <div className="review-toolbar">
        <div className="review-sort-tabs">
          <button
            type="button"
            className={`review-sort-btn ${sortType === "latest" ? "active" : ""}`}
            onClick={() => setSortType("latest")}
          >
            최신순
          </button>
          <button
            type="button"
            className={`review-sort-btn ${sortType === "photo" ? "active" : ""}`}
            onClick={() => setSortType("photo")}
          >
            AI 추천순
          </button>
          <button
            type="button"
            className={`review-sort-btn ${sortType === "high" ? "active" : ""}`}
            onClick={() => setSortType("high")}
          >
            별점순
          </button>
        </div>

        <div className="review-toolbar-right">
          <label className="review-photo-check">
            <input
              type="checkbox"
              checked={photoOnly}
              onChange={(e) => setPhotoOnly(e.target.checked)}
            />
            포토/동영상 먼저 보기
          </label>

          <input
            type="text"
            className="review-search-input"
            placeholder="리뷰 키워드 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="review-chip-row">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`review-chip ${selectedFilter === filter ? "active" : ""}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="review-list">
        {filteredReviews.map((review) => (
          <article className="review-item" key={review.id}>
            <div className="review-item-main">
              {review.option && <p className="review-item-option">상품 옵션 {review.option}</p>}
              <p className="review-item-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="review-item-text">{review.content}</p>

              {!!review.images?.length && (
                <div className="review-item-images">
                  {review.images.map((image, index) => (
                    <div className="review-item-image-box" key={index}>
                      <img src={image} alt={`리뷰 이미지 ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              <div className="review-item-actions">
                <button type="button">도움돼요 {review.helpful}</button>
                <button type="button">도움안돼요</button>
                <button type="button">댓글 {review.comments}</button>
              </div>
            </div>

            <aside className="review-item-meta">
              <p className="review-item-user">{maskName(review.user)}</p>
              <div className="review-item-spec">
                <p>키 {review.height}cm</p>
                <p>몸무게 {review.weight}kg</p>
                <p>평소사이즈-상의 {review.topSize}</p>
                <p>평소사이즈-하의 {review.bottomSize}</p>
              </div>
              <p className="review-item-date">{review.date}</p>
            </aside>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
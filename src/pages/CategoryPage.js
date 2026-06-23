import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProductCatalog, { CATEGORY_LABELS, GROUP_LABELS } from '../db/ProductCatalog';
import './CategoryPage.css';

const DEFAULT_FILTERS = {
  men: ['all', 'top', 'outer', 'bottom'],
  women: ['all', 'top', 'outer', 'bottom'],
  kids: ['all', 'top', 'bottom'],
  acc: ['all', 'bag', 'hat', 'goods', 'shoes'],
  outlet: ['all', 'top', 'outer', 'bottom', 'acc'],
};

const SORT_LABELS = [
  '판매인기순',
  '낮은가격순',
  '높은가격순',
  '신상품순',
];

function CategoryPage() {
  const navigate = useNavigate();
  const { group = 'men' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const groupLabel = GROUP_LABELS[group] || GROUP_LABELS.men;
  const filterKeys = DEFAULT_FILTERS[group] || DEFAULT_FILTERS.men;

  const products = ProductCatalog.filter((product) => {
    if (product.group !== groupLabel) return false;
    if (activeCategory === 'all') return true;
    return product.category === CATEGORY_LABELS[activeCategory];
  });

  const changeCategory = (category) => {
    if (category === 'all') {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <main className="category-page">
      <section className="category-inner">
        <div className="category-head">
          <h1>{groupLabel}</h1>
          <div className="category-filter-row">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                className={activeCategory === key ? 'active' : ''}
                onClick={() => changeCategory(key)}
              >
                {key === 'acc' ? 'ACC & SHOES' : CATEGORY_LABELS[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="category-sort-row">
          {SORT_LABELS.map((label) => (
            <button type="button" key={label}>{label}</button>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="category-grid">
            {products.map((product) => (
              <article
                key={product.id}
                className="category-card"
                onClick={() => navigate(`/detail/${product.id}`)}
              >
                <div className="category-thumb">
                  {product.badge && (
                    <span className={product.badge === 'SOLD OUT' ? 'sold-out' : ''}>
                      {product.badge}
                    </span>
                  )}
                  <img src={product.img} alt={product.title} />
                </div>
                <h2>{product.title}</h2>
                <p>{product.price}{'원'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="category-empty">
            <p>{'표시할 상품이 없습니다.'}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default CategoryPage;
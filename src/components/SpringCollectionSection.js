import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import SpringCollection from '../db/SpringCollectionData';

function SpringCollectionSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = SpringCollection[activeTab];

  return (
    <section className="spring-collection">
      <Title
        subtitle={'\uC2A4\uB178\uC6B0\uD53C\uD06C\uC758 \uC0C8\uB85C\uC6B4 \uACC4\uC808'}
        title="SPRING COLLECTION"
        tabs={SpringCollection.map((tab) => tab.tabTitle)}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      <div className="spring-wrap">
        <div className="spring-main-banner">
          <img src={currentTab.mainBanner} alt={currentTab.tabTitle} />
        </div>

        <div className="spring-grid">
          {currentTab.items.map((item) => (
            <div
              key={item.id}
              className="product-card spring-card"
              onClick={() => navigate(`/detail/spring-${item.id}`)}
            >
              <div className="product-thumb-wrap">
                {item.isNew && <span className="product-badge">NEW</span>}
                {item.isSoldOut && (
                  <span className="product-badge soldout">SOLD OUT</span>
                )}
                <img
                  src={item.img}
                  alt={item.title}
                  className="product-thumb"
                />
              </div>

              <div className="product-info">
                <p className="product-name">{item.title}</p>
                <div className="product-price-row">
                  <span className="product-price">{item.price}{'\uC6D0'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpringCollectionSection;

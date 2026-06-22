import React from "react";

const Title = ({ subtitle, title, tabs = [], activeTab = 0, onTabClick }) => {
  return (
    <>
      <style>{`
        .title-section {
          width: 100%;
          padding: 18px 20px 20px;
          background: #fff;
        }

        .title-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .title-subtitle {
          margin: 0 0 14px;
          font-size: 18px;
          font-weight: 400;
          color: #222;
          line-height: 1.4;
        }

        .title-main {
          margin: 0;
          font-size: 35px;
          font-weight: 800;
          line-height: 1.1;
          color: #111;
          letter-spacing: -1px;
        }

        .title-tabs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 24px;
          margin-bottom: 25px;
        }

        .title-tab-btn {
          height: 46px;
          padding: 0 22px;
          border: 1px solid #a8a8a8;
          border-radius: 999px;
          background: #fff;
          color: #222;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .title-tab-btn.active {
          background: #222;
          border-color: #222;
          color: #fff;
        }

        @media (max-width: 768px) {
          .title-section {
            padding: 16px 16px 18px;
          }

          .title-subtitle {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .title-main {
            font-size: 28px;
          }

          .title-tabs {
            gap: 10px;
            margin-top: 18px;
            margin-bottom: 18px;
          }

          .title-tab-btn {
            height: 40px;
            padding: 0 18px;
            font-size: 13px;
          }
        }
      `}</style>

      <section className="title-section">
        <div className="title-inner">
          <p className="title-subtitle">{subtitle}</p>
          <h2 className="title-main">{title}</h2>

          {tabs.length > 0 && (
            <div className="title-tabs">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  type="button"
                  className={`title-tab-btn ${activeTab === index ? "active" : ""}`}
                  onClick={() => onTabClick && onTabClick(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Title;
import React from "react";

function Banner({
  image = "/img/banner/banner02.jpg",
  title = "Anywhere, Any Step 스니커즈 컬렉션",
  desc = "걷고, 오르고, 달리는 일상과 자연 속 발끝에서 시작되는 자유로운 움직임을 느껴보세요.",
  buttonText = "VIEW MORE",
}) {
  return (
    <>
      <style>{`
        .banner {
          width: 100%;
          padding: 90px 20px 110px;
          background: #fff;
        }

        .banner-inner {
          max-width: 1500px;
          margin: 0 auto;
        }

        .banner-image-wrap {
          width: 100%;
          overflow: hidden;
        }

        .banner-image {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .banner-content {
          text-align: center;
          padding: 42px 20px 0;
        }

        .banner-title {
          margin: 0 0 20px;
          font-size: 34px;
          font-weight: 800;
          line-height: 1.25;
          color: #111;
          letter-spacing: -1px;
        }

        .banner-desc {
          margin: 0 0 32px;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.7;
          color: #4b4b4b;
        }

        .banner-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 26px;
          min-width: 178px;
          height: 54px;
          padding: 0 22px;
          border: 1px solid #222;
          background: #fff;
          color: #111;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .banner-btn:hover {
          background: #111;
          color: #fff;
        }

        .banner-btn-icon {
          width: 14px;
          height: 14px;
          object-fit: contain;
        }

        @media (max-width: 1024px) {
          .banner {
            padding: 70px 20px 90px;
          }

          .banner-title {
            font-size: 28px;
          }

          .banner-desc {
            font-size: 17px;
          }
        }

        @media (max-width: 768px) {
          .banner {
            padding: 56px 16px 72px;
          }

          .banner-content {
            padding-top: 28px;
          }

          .banner-title {
            font-size: 24px;
          }

          .banner-desc {
            font-size: 15px;
            margin-bottom: 24px;
          }

          .banner-btn {
            min-width: 150px;
            height: 48px;
            gap: 18px;
            font-size: 14px;
          }

          .banner-btn-icon {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>

      <section className="banner">
        <div className="banner-inner">
          <div className="banner-image-wrap">
            <img src={image} alt={title} className="banner-image" />
          </div>

          <div className="banner-content">
            <h2 className="banner-title">{title}</h2>
            <p className="banner-desc">{desc}</p>

            <button type="button" className="banner-btn">
              <span>{buttonText}</span>
              <img
                src="/img/icons/yt_icon.png"
                alt="arrow icon"
                className="banner-btn-icon"
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
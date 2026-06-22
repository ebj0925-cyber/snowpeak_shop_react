import React from "react";
import Title from "./Title";
import InfluencerData from "../db/InfluencerData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function InfluencerSection() {
  const items = InfluencerData;

  return (
    <section className="influencer-section">
      <Title
        subtitle="다채로운 스타일을 완성하는"
        title="INFLUENCER STYLE"
      />

      <div className="influencer-slider">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".influencer-slider .next-btn",
            prevEl: ".influencer-slider .prev-btn",
          }}
          loop={true}
          spaceBetween={26}
          slidesPerView={5}
          slidesPerGroup={5}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 22 },
            1280: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 26 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="influencer-card">
                <div className="influencer-image-wrap">
                  <img
                    src={item.image}
                    alt={item.username}
                    className="influencer-image"
                  />
                </div>

                <div className="influencer-info">
                  <p className="influencer-name">{item.username}</p>
                  <p className="influencer-comment">{item.comment}</p>

                  <div className="influencer-product">
                    <div className="influencer-product-thumb">
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                      />
                    </div>

                    <div className="influencer-product-info">
                      <p className="influencer-product-title">
                        {item.productTitle}
                      </p>
                      <p className="influencer-product-price">
                        {item.price}원
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="prev-btn" aria-label="이전 슬라이드">
          〈
        </button>
        <button className="next-btn" aria-label="다음 슬라이드">
          〉
        </button>
      </div>
    </section>
  );
}

export default InfluencerSection;
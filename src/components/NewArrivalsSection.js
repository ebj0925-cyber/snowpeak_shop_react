import React from "react";
import Products from "./Products";
import Title from "./Title";
import NewArrivalsData from "../db/NewArrivalsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function NewArrivalsSection() {
  const items = NewArrivalsData;

  return (
    <section className="product-slider-section">
      <Title subtitle="지금 가장 주목 받는" title="NEW ARRIVALS" />

      <div className="product-slider new-arrivals-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".new-arrivals-slider .next-btn",
            prevEl: ".new-arrivals-slider .prev-btn",
          }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1 },
            768: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Products fruit={item} variant="new" />
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

export default NewArrivalsSection;
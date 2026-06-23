import React from 'react';
import Products from './Products';
import Title from './Title';
import BagData from '../db/BagData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function BagSection() {
  const items = BagData;

  return (
    <section className="product-slider-section">
      <Title subtitle={'일상에 편안함을 더하는'} title="SNOWPEAK BAG" />

      <div className="product-slider bag-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.bag-slider .next-btn',
            prevEl: '.bag-slider .prev-btn',
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

        <button className="prev-btn" aria-label="previous slide">
          &lt;
        </button>
        <button className="next-btn" aria-label="next slide">
          &gt;
        </button>
      </div>
    </section>
  );
}

export default BagSection;
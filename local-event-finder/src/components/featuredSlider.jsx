// src/components/FeaturedSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function FeaturedSlider({ events }) {
  return (
    <Swiper spaceBetween={16} slidesPerView={3}>
      {events.slice(0, 6).map((ev) => (
        <SwiperSlide key={ev.id}>
          <div className="card">
            <h4>{ev.name}</h4>
            <p>{new Date(ev.dates.start.dateTime).toLocaleDateString()}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

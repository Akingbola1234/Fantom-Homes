import React, { useRef, useState } from "react";
// import Star from "./Assets/images/Star.svg"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

const HeroPage = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="heropage-container">
      <div className="heropage-details">
        <div className="heropage-text">
          <h2>
            Get Your <br />
            Own <span> Dream</span>
            <br />
            Home{" "}
            <img
              src={"./Assets/images/Star.svg"}
              alt="Star SVG"
              className="star"
            />
          </h2>
          <div className="heropage-sub-details">
            <div className="circle">
              <img
                src={"./../Assets/images/arrow-down.png"}
                alt="Arrow Down Vector"
              />
              <p>Discover Homes</p>
            </div>
            <div className="description">
              <p>Let's Find a home perfect for you...</p>
              <button className="mobile-button">Discover Homes</button>
            </div>
          </div>
          <div className="heropage-stats">
            <div className="stat">
              <h5>Artwork</h5>
              <h4>25.1k</h4>
            </div>
            <div className="stat">
              <h5>Artist</h5>
              <h4>15.6k</h4>
            </div>
            <div className="stat">
              <h5>Auction</h5>
              <h4>15.6k</h4>
            </div>
          </div>
        </div>
        <div className="heropage-image">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper heropage-slider"
          >
            <SwiperSlide>
              <img src={"./Assets/images/heropage-image-new.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./Assets/images/hero-slider-2.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./../Assets/images/hero-slider-3.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./../Assets/images/hero-slider-4.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./../Assets/images/heropage-slider-5.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./../Assets/images/heropage-slider-6.jpg"} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={"./../Assets/images/heropage-slider-7.jpg"} alt="" />
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;

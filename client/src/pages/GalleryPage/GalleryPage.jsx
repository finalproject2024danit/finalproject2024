import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/userSlice.js";
import styles from "./GalleryPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { photoData, status } = user;
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData(1));
    }
  }, [status, dispatch]);

  // Розділення photoData у масив URL
  const photos = photoData
    ? photoData
        .replace(/\n/g, "") // Видалення символів нового рядка
        .split(",")         // Розділення за комами
        .map((url) => url.trim()) // Видалення зайвих пробілів
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  
// console.log("Photos Array:", photos);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  // };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <MainContent title="">
      <div className={styles.galleryPage}>
        <h2>Gallery Page</h2>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error loading data</p>}
        {status === "succeeded" && photos.length > 0 && (
          <div className={styles.slider}>
            {/* <button className={styles.prev} onClick={prevSlide}>❮</button>
            <button className={styles.next} onClick={nextSlide}>❯</button> */}
            <div className={styles.sliderInner} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {photos.map((url, index) => (
                <figure key={index} className={styles.sliderItem}>
                  <img src={url} alt={`User photo ${index + 1}`} />
                </figure>
              ))}
            </div>
            <div className={styles.sliderNav}>
              {photos.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${currentIndex === index ? styles.active : ""}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default GalleryPage;




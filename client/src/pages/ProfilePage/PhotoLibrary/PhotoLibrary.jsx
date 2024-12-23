import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./PhotoLibrary.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import ProfileMenu from "../ProfileMenu.jsx";

const PhotoLibrary = () => {
  const user = useSelector((state) => state.user);

  const photos = user.photoData
    ? user.photoData
        .replace(/\n/g, "")
        .split(",")
        .map((url) => url.trim())
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <MainContent title="">
      <div className={styles.galleryPage}>
        <ProfileMenu />
        <h2>Gallery Page</h2>
        {photos.length > 0 && (
          <div className={styles.slider}>
            <button className={styles.prev} onClick={prevSlide}>
              ❮
            </button>
            <button className={styles.next} onClick={nextSlide}>
              ❯
            </button>
            <div
              className={styles.sliderInner}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
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
                  className={`${styles.dot} ${
                    currentIndex === index ? styles.active : ""
                  }`}
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

export default PhotoLibrary;

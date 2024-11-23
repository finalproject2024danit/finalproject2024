import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./photoLibrary.module.scss";
import { useDispatch } from 'react-redux';



const GalleryPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { photoData, status } = user;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData(1));
    }
  }, [status, dispatch]);

  const photos = photoData ? photoData.split(", ") : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };


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





// const PhotoLibrary = () => {
//   const user = useSelector((state) => state.user);

//   // Обробка photoData: розділення, очищення та фільтрація
//   const photos = user.photoData
//     ? user.photoData
//         .split(',') // Розділяємо рядок за комами
//         .map((url) => url.trim()) // Видаляємо зайві пробіли
//         .filter((url) => url.length > 0) // Виключаємо порожні значення
//     : [];

//   console.log("Photos array:", photos); // Перевіряємо результат

//   return (
//     <MainContent title="">
//       <div className={styles.container}>
//         <ProfileMenu />
//         <div className={styles.photoLibrary}>
//           <h2>Your Photos</h2>
//           <div className={styles.photosGrid}>
//             {photos.length > 0 ? (
//               photos.map((photoUrl, index) => (
//                 <img
//                   key={index}
//                   src={photoUrl}
//                   alt={`User Photo ${index + 1}`}
//                   className={styles.photo}
//                   onError={(e) => (e.target.style.display = "none")} // Приховати, якщо фото не завантажується
//                 />
//               ))
//             ) : (
//               <p>No photos available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainContent>
//   );
// };

// export default PhotoLibrary;




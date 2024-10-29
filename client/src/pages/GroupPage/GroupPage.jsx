import React, { useState } from "react";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";

const GroupPage = () => {
  // Використання useState для зберігання активного індексу
  const [activeIndex, setActiveIndex] = useState(0);

  // Функція для обробки кліку по зображенню
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <MainContent title="">
    <div className={styles.groupContainer}>
      {/* Список зображень */}
      <ul className={styles.groupHeader}>
        {[
          "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200/v1729506701/photo_2024-10-21_13-31-00_v386ym.jpg",
          "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200/v1729507245/photo_2024-10-21_13-40-23_cxmnix.jpg",
          "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200/v1729507453/photo_2024-10-21_13-43-46_jz3zuk.jpg",
          "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200/v1729507548/photo_2024-10-21_13-45-21_fpr0jn.jpg",
          "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200/v1729507680/photo_2024-10-21_13-47-27_xzqiiq.jpg"
        ].map((imageSrc, index) => (
          <li
            key={index}
            className={styles.groupList}
            onClick={() => handleImageClick(index)} // Обробник кліку
          >
            <img src={imageSrc} alt={`Group ${index + 1}`} />
          </li>
        ))}
      </ul>

      {/* Відображення контенту відповідно до активного індексу */}
      <ul className={styles.groupMain}>
        {[
          {
            imgSrc: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729506701/photo_2024-10-21_13-31-00_v386ym.jpg",
            title: "First Group",
            paragraph1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            paragraph2: "Phasellus auctor neque et arcu interdum, id venenatis metus aliquam.",
            paragraph3: "Fusce convallis elit ut augue interdum, quis fringilla elit viverra."
          },
          {
            imgSrc: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729507245/photo_2024-10-21_13-40-23_cxmnix.jpg",
            title: "Second Group",
            paragraph1: "Donec quis lorem et felis vestibulum laoreet.",
            paragraph2: "Vivamus facilisis magna ac ex molestie, nec luctus nunc tincidunt.",
            paragraph3: "Aliquam erat volutpat. Vestibulum ante ipsum primis."
          },
          {
            imgSrc: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729507453/photo_2024-10-21_13-43-46_jz3zuk.jpg",
            title: "Third Group",
            paragraph1: "Aenean hendrerit neque nec justo faucibus, non lobortis lorem ullamcorper.",
            paragraph2: "Cras consectetur, mi nec tempus interdum, dui libero hendrerit enim.",
            paragraph3: "Suspendisse potenti. Nullam auctor sapien id lorem feugiat."
          },
          {
            imgSrc: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729507548/photo_2024-10-21_13-45-21_fpr0jn.jpg",
            title: "Fourth Group",
            paragraph1: "Curabitur dignissim lectus vitae ex bibendum, nec scelerisque metus sagittis.",
            paragraph2: "Maecenas vehicula velit non urna fermentum volutpat.",
            paragraph3: "Sed tincidunt lorem et libero mollis, vitae dapibus libero congue."
          },
          {
            imgSrc: "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729507680/photo_2024-10-21_13-47-27_xzqiiq.jpg",
            title: "Five Group",
            paragraph1: "Curabitur dignissim lectus vitae ex bibendum, nec scelerisque metus sagittis.",
            paragraph2: "Maecenas vehicula velit non urna fermentum volutpat.",
            paragraph3: "Sed tincidunt lorem et libero mollis, vitae dapibus libero congue."
          }
        ].map((content, index) => (
          <li
            key={index}
            className={
              index === activeIndex ? styles.active : styles.hidden
            } // Відображаємо лише активний елемент
          >
            <div className={styles.contentItem}>
              <img src={content.imgSrc} alt={content.title} />
              <h2>{content.title}</h2>
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
              <p>{content.paragraph3}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </MainContent>
  );
 
};

export default GroupPage;





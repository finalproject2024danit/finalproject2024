import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "../../api/axiosInstance.js";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/news/filter");
        const newsData = response.data; // Виправлено

        console.log(newsData); // Логування для перевірки

        if (Array.isArray(newsData) && newsData.length > 0) {
          setNews(newsData);
        } else {
          setError("Новини не знайдені.");
        }
      } catch (err) {
        setError(`Помилка під час завантаження даних: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("News:", news);

  const defaultImage = "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1730024950/16_ov3cim.jpg";

  return (
    <MainContent title="">
    <div className={styles.newsBox}>
      {loading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p>{error}</p>
      ) : news.length > 0 ? (
        news.map((item) => (
          <div key={item.id} className={styles.newsCard}>
            <img
              className={styles.newsImage}
              src={item.photo || defaultImage} // Виправлено
              alt={item.name || "Без назви"} // Виправлено
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            <div className={styles.newsContent}>
              <h2>{item.name || "Без назви"}</h2> 
              <p>{item.text || "Без опису"}</p> 
              <p className={styles.date}>
                {item.createdDate ? new Date(item.createdDate).toLocaleDateString() : ""}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Новини не знайдені.</p>
      )}
    </div>
    </MainContent>
  );
};

export default HomePage;





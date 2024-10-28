import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "../UsersPage/axiosConfig";

const NewsContent = () => {
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
  );
};

const HomePage = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <MainContent title="">
          <NewsContent />
        </MainContent>
      </div>
    </div>
  );
};

export default HomePage;







// import React from "react";
// import { useState, useEffect } from "react";
// import MainContent from "../../components/MainContent/MainContent.jsx";
// import styles from "./HomePage.module.scss";

// const HomePage = () => {

//   return (
//     <div className={styles.mainContent}>
//       <MainContent title="">
        
//       </MainContent>
//     </div>
//   );
// };

// export default HomePage;

// ________________Код для сторінки Group________________________
// const HomePage = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Функція для видалення тегів <p>, <strong>, та <a>
//   const cleanText = (htmlText) => {
//     if (!htmlText || typeof htmlText !== 'string') return ''; // Перевірка на існування та тип
//     return htmlText
//       .replace(/<\/?(p|strong|a)[^>]*>/g, '');  // Видаляємо теги <p>, <strong>, <a> та їх атрибути
//   };

//   useEffect(() => {
//     const fetchRSS = async () => {
//       try {
//         const response = await fetch(
//           'https://api.rss2json.com/v1/api.json?rss_url=https://www.theguardian.com/science/space/rss'
//         );
//         const data = await response.json();
        
//         // Сортуємо новини за датою публікації (новіші спочатку)
//         const sortedNews = data.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
//         setNews(sortedNews);
//       } catch (error) {
//         setError('Error fetching news.', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRSS();
//   }, []);

//   if (loading) return <p>Loading news...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className={styles.mainContent}>
//       <MainContent title="Latest SpaceX News">
//         {news.length > 0 ? (
//           news.map((article, index) => (
//             <div key={index} className={styles.article}>
//               <h2 className={styles.articleTitle}>{article.title}</h2>
              
//               {/* Очищаємо текст від тегів <p>, <strong>, <a> */}
//               <p className={styles.articleSnippet}>
//                 {cleanText(article.contentSnippet)}
//               </p>

//               {/* Перевіряємо наявність повного контенту та очищаємо його від тегів */}
//               {article.content && (
//                 <div className={styles.articleContent}>
//                   <p>{cleanText(article.content)}</p> {/* Використовуємо очищений текст */}
//                 </div>
//               )}
              
//               <p className={styles.articleDate}><strong>Published on:</strong> {new Date(article.pubDate).toLocaleDateString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No news available.</p>
//         )}
//       </MainContent>
//     </div>
//   );
// };

// export default HomePage;



import React from "react";
import { useState, useEffect } from "react";
import MainContent from "../../components/MainContent/MainContent.jsx";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для видалення тегів <p>, <strong>, та <a>
  const cleanText = (htmlText) => {
    if (!htmlText || typeof htmlText !== 'string') return ''; // Перевірка на існування та тип
    return htmlText
      .replace(/<\/?(p|strong|a)[^>]*>/g, '');  // Видаляємо теги <p>, <strong>, <a> та їх атрибути
  };

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.theguardian.com/science/space/rss'
        );
        const data = await response.json();
        
        // Сортуємо новини за датою публікації (новіші спочатку)
        const sortedNews = data.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setNews(sortedNews);
      } catch (error) {
        setError('Error fetching news.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.mainContent}>
      <MainContent title="Latest SpaceX News">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className={styles.article}>
              <h2 className={styles.articleTitle}>{article.title}</h2>
              
              {/* Очищаємо текст від тегів <p>, <strong>, <a> */}
              <p className={styles.articleSnippet}>
                {cleanText(article.contentSnippet)}
              </p>

              {/* Перевіряємо наявність повного контенту та очищаємо його від тегів */}
              {article.content && (
                <div className={styles.articleContent}>
                  <p>{cleanText(article.content)}</p> {/* Використовуємо очищений текст */}
                </div>
              )}
              
              <p className={styles.articleDate}><strong>Published on:</strong> {new Date(article.pubDate).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </MainContent>
    </div>
  );
};

export default HomePage;







// // import React from "react";
// // import Card from "../../components/Card/index.jsx";
// // import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
// import MainContent from "../../components/MainContent/MainContent.jsx";
// // import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
// import styles from "./HomePage.module.scss";



// const HomePage = () => {

  

// // const user = {
// //   name: 'Peter Pepper',
// //   email: 'peterpepperitto@ukr.net'
// // }

// //   const posts = [
// //     { id: 1, title: 'Post 1', body: 'This is the first post content.' },
// //     { id: 2, title: 'Post 2', body: 'This is the second post content.' },
// //   ];

// //   const deletePost = (postId) => {
// //     console.log(`Post ${postId} deleted`);
// //   };

// //   const content = posts.map((post) => (
// //     <Card
// //       key={post.id}
// //       post={post}
// //       user={user}
// //       onDelete={() => deletePost(post.id)}
// //     />
// //   ));

//   return (
//     <>
//     {/* <div><MainContent title="News Feed"> */}
//     {/* <div><MainContent>      
//     </MainContent></div> */}
//     {/* <div className={styles.layout}> */}
//       {/* <LeftSidebar /> */}
//       <div className={styles.mainContent}>
//         <MainContent title="Home Information">
//         </MainContent>
//       </div>
//       {/* <RightSidebar /> */}
//     {/* </div> */}
//     </>
//   );
// };

// export default HomePage;

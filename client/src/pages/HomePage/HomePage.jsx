import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomePage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { fetchNews } from "../../redux/slices/newsSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const defaultImage = "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1730024950/16_ov3cim.jpg";

  return (
    <MainContent title="">
      <div className={styles.newsBox}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className={styles.newsCard}>
              <img
                className={styles.newsImage}
                src={item.photo || defaultImage}
                alt={item.name || "Untitled"}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className={styles.newsContent}>
                <h2>{item.name || "Untitled"}</h2> 
                <p>{item.text || "No description"}</p> 
                <p className={styles.date}>
                  {item.createdDate ? new Date(item.createdDate).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>News not found.</p>
        )}
      </div>
    </MainContent>
  );
};

export default HomePage;




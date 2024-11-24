import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsById } from "../../redux/slices/newsSlice";
import styles from "./NewsPage.module.scss";
import MainContent from "../../components/MainContent/MainContent.jsx";

const NewsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { newsItem, loading, error } = useSelector((state) => state.news);

    useEffect(() => {
        dispatch(fetchNewsById(id));
    }, [dispatch, id]);

    return (
        <MainContent title="">
            <div className={styles["news-page"]}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : newsItem ? (
                    <div className={styles["news-detail"]}>
                        <div className={styles["news-detail__content"]}>
                            <img
                                className={styles["news-detail__image"]}
                                src={newsItem.photo}
                                alt={newsItem.name}
                                title={newsItem.name}
                            />
                            <div className={styles["news-detail__text-container"]}>
                                <h1 className={styles["news-detail__title"]}>{newsItem.name}</h1>
                                <p className={styles["news-detail__text"]}>{newsItem.text}</p>
                                <p className={styles["news-detail__date"]}>
                                    {newsItem.createdDate ? new Date(newsItem.createdDate).toLocaleDateString() : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Not found.</p>
                )}
            </div>
        </MainContent>
    );
};

export default NewsPage;

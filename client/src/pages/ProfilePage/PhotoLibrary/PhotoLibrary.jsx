import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./photoLibrary.module.scss";


const GalleryPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const {photoData, status} = user;

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
                        <div className={styles.sliderInner} style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                            {photos.map((url, index) => (
                                <figure key={index} className={styles.sliderItem}>
                                    <img src={url} alt={`User photo ${index + 1}`}/>
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

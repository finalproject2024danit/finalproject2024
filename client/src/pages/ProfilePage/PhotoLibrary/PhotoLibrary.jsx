import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import styles from "./photoLibrary.module.scss";

const PhotoLibrary = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      if (!user || !user.id) {
        console.error("User not found or user ID is missing");
        return;
      }

      try {
        const response = await axios.get(`/api/v1/user_all_info/${user.id}`);
        console.log("Fetched photos:", response.data);
        setPhotos(response.data.photos || []);
      } catch (error) {
        console.error("Error fetching user photos:", error.response ? error.response.data : error.message);
      }
    };

    fetchUserPhotos();
  }, [user]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return; // Прекратите выполнение, если файл не выбран
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      await axios.post(`/api/v1/user_upload_photo/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // После загрузки, повторно запрашиваем фотографии
      const response = await axios.get(`/api/v1/user_all_info/${user.id}`);
      setPhotos(response.data.photos || []);
      setSelectedFile(null); // Очистите выбранный файл после успешной загрузки
    } catch (error) {
      console.error("Error uploading photo:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.photoLibrary}>
          <h2>Your Photos</h2>
          <div className={styles.photosGrid}>
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <img key={index} src={photo.url} alt={`User Photo ${index}`} className={styles.photo} />
              ))
            ) : (
              <p>No photos available.</p>
            )}
          </div>
          <form onSubmit={handleUpload} className={styles.uploadForm}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <button type="submit" className={styles.uploadButton} disabled={!selectedFile}>
              Upload Photo
            </button>
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default PhotoLibrary;

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../../api/axiosInstance.js";
import styles from "./UserPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";

const UserPage = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/users/user_all_info/${id}`);
                setUser(response.data);
            } catch (err) {
                setError(`Error loading user: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const formatPhones = (phones) => {
        return phones || "No phones";
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <MainContent title="">
            <div className={styles.userBox}>
                <h1 className={styles.userBox_title}>{`${user.firstName} ${user.lastName}`}</h1>
                <div className={styles.userContent}>
                    <img
                        className={styles.userPhoto}
                        src={user.avatar || "default_avatar_url"}
                        alt={`${user.firstName} ${user.lastName}`}
                        title={`${user.firstName} ${user.lastName}`}
                    />
                    <div className={styles.userDetails}>
                        <h3>General information:</h3>
                        <p>Date of birth: {formatDate(user.dateOfBirth)}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {formatPhones(user.phones)}</p>
                        <p>Gender: {user.gender}</p>
                        <p>Created Date: {formatDate(user.createdDate)}</p>

                        <div className={styles.residencesList}>
                            <h3>Place of residence:</h3>
                            {user.residence ? (
                                <div>
                                    <p>{`Planet: ${user.residence.planet}`}</p>
                                    <p>{`Country: ${user.residence.country}`}</p>
                                    <p>{`City: ${user.residence.city}`}</p>
                                </div>
                            ) : (
                                <p>Place of residence not found</p>
                            )}
                        </div>

                        <div className={styles.hobbiesList}>
                            <h3>Hobbies:</h3>
                            {user.hobby ? (
                                <div>
                                    <p>{`Language: ${user.hobby.language}`}</p>
                                    <p>{`Pet: ${user.hobby.pet}`}</p>
                                    <p>{`Interest: ${user.hobby.interest}`}</p>
                                </div>
                            ) : (
                                <p>Hobbies not found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainContent>
    );
};

export default UserPage;

import ProfileMenu from "../ProfileMenu.jsx";
import styles from "./PlaceOfResidence.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import EditButtons from "../../../components/ButtonEdit/index.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResidenceData, fetchResidenceById } from "../../../redux/slices/residencesSlice.js";

const PlaceOfResidence = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const residences = useSelector((state) => state.residences.byUserId); // отримання стану
  const [suggestions, setSuggestions] = useState({
    planet: [],
    country: [],
    city: [],
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  
  const fetchSuggestions = async (field) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/residences/filter`, {
        params: {
          page: 0,
          size: 50,
        },
      });

      const uniqueOptions = [
        ...new Set(response.data.map((item) => item[field])),
      ];

      setSuggestions((prev) => ({ ...prev, [field]: uniqueOptions }));
    } catch (error) {
      console.error(`Error fetching suggestions for ${field}:`, error);
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    planet: Yup.string().required("Required"),
  });
  

  useEffect(() => {
    if (!residences[user.id]) {
      dispatch(fetchResidenceById(user.id));
    }
  }, [dispatch, user.id, residences]);

  useEffect(() => {
    ["planet", "country", "city"].forEach((field) => fetchSuggestions(field));
  }, []);

  const formik = useFormik({
    initialValues: {
      planet: user.residence?.planet || "",
      country: user.residence?.country || "",
      city: user.residence?.city || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedData = {
        ...user,
        residence: {
          planet: values.planet,
          country: values.country,
          city: values.city,
        },
      };
      dispatch(
        updateResidenceData({ userId: user.id, updateData: updatedData })
      );
      console.log("Form submitted:", values);
      setIsEditing(false);
    },
  });

  if (!user || !user.residence) {
    return <p>Loading...</p>;
  }

  return (
    <MainContent title="">
      <div className={styles.residenceBox}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Place of Residence</h2>

          <div className={styles.currentResidence}>
            <h3 className={styles.subtitle}>Current Residence</h3>
            {["planet", "country", "city"].map((field) => (
              <p
                key={field}
                className={`${styles.residenceText} ${
                  !formik.values[field] ? styles.noResidence : ""
                }`}
              >
                {formik.values[field] || `No ${field} selected`}
              </p>
            ))}
          </div>

          {isEditing ? (
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              {["planet", "country", "city"].map((field) => (
                <div key={field} className={styles.inputGroup}>
                  <label className={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <select
                    className={styles.input}
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select {field}
                    </option>
                    {loading ? (
                      <option disabled>Loading options...</option>
                    ) : (
                      suggestions[field].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))
                    )}
                  </select>
                  {formik.touched[field] && formik.errors[field] && (
                    <div className={styles.error}>{formik.errors[field]}</div>
                  )}
                </div>
              ))}
            </form>
          ) : null}
          <EditButtons
            isEditing={isEditing}
            onEditClick={() => setIsEditing((prev) => !prev)}
            onSaveClick={formik.handleSubmit}
          />
        </div>
      </div>
    </MainContent>
  );
};

export default PlaceOfResidence;

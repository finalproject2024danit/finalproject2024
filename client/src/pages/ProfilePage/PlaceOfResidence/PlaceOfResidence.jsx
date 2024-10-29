import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./PlaceOfResidence.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  street: Yup.string().optional(),
  house: Yup.string().optional(),
  galaxy: Yup.string().required("Required"),
  planet: Yup.string().required("Required"),
});

const PlaceOfResidence = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.example.com/locations?query=${query}`
      );
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const selectSuggestion = (value, setFieldValue, field) => {
    setFieldValue(field, value);
    setSuggestions([]);
  };

  const formik = useFormik({
    initialValues: {
      country: "",
      city: "",
      street: "",
      house: "",
      galaxy: "",
      planet: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Place of Residence</h2>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            {["galaxy", "planet", "country", "city", "street", "house"].map(
              (field) => (
                <div key={field} className={styles.inputGroup}>
                  <label className={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formik.values[field]}
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (field === "country" || field === "city") {
                        fetchSuggestions(e.target.value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    name={field}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <div className={styles.error}>{formik.errors[field]}</div>
                  )}
                  {loading && <div>Loading...</div>}
                  {suggestions.length > 0 && (
                    <ul className={styles.suggestions}>
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          onClick={() =>
                            selectSuggestion(
                              suggestion.name,
                              formik.setFieldValue,
                              field
                            )
                          }
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            )}
            <button type="submit" className={styles.button}>
              Save
            </button>
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default PlaceOfResidence;

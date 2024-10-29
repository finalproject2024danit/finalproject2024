import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./PlaceOfResidence.module.scss";
import { useState } from "react";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  street: Yup.string().optional(),
  house: Yup.string().optional(),
  galaxy: Yup.string().required("Required"),
  planet: Yup.string().required("Required"),
});

const PlaceOfResidence = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [galaxy, setGalaxy] = useState("");
  const [planet, setPlanet] = useState("");
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

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    fetchSuggestions(event.target.value);
  };

  const selectSuggestion = (value, setter) => {
    setter(value);
    setSuggestions([]); // Очистить предложения после выбора
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
      // Обработка отправки формы
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
            <div className={styles.inputGroup}>
              <label className={styles.label}>Galaxy:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.galaxy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="galaxy"
                required
              />
              {formik.touched.galaxy && formik.errors.galaxy && (
                <div className={styles.error}>{formik.errors.galaxy}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Planet:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.planet}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="planet"
                required
              />
              {formik.touched.planet && formik.errors.planet && (
                <div className={styles.error}>{formik.errors.planet}</div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Country:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="country"
              />
              {formik.touched.country && formik.errors.country && (
                <div className={styles.error}>{formik.errors.country}</div>
              )}
              {loading && <div>Loading...</div>}
              {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() =>
                        selectSuggestion(suggestion.name, setCountry)
                      }
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>City:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="city"
              />
              {formik.touched.city && formik.errors.city && (
                <div className={styles.error}>{formik.errors.city}</div>
              )}
              {loading && <div>Loading...</div>}
              {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => selectSuggestion(suggestion.name, setCity)}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Street:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="street"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>House:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.house}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="house"
              />
            </div>

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

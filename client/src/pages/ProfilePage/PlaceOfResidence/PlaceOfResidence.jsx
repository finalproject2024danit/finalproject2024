import ProfileMenu from "../ProfileMenu.jsx";
import styles from "./PlaceOfResidence.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import EditButtons from "../../../components/ButtonEdit/index.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResidenceData } from "../../../redux/slices/residencesSlice.js";

const PlaceOfResidence = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [suggestions, setSuggestions] = useState({
    planet: [],
    country: [],
    city: [],
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Функція для отримання варіантів місць проживання
  const fetchSuggestions = async (field) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/residences/filter`, {
        params: {
          page: 0, // Завантажуємо першу сторінку
          size: 50, // Максимум 50 записів
        },
      });

      // Збираємо унікальні значення для кожного поля
      const uniqueOptions = [
        ...new Set(response.data.map((item) => item[field])),
      ];

      // Оновлюємо стан з варіантами
      setSuggestions((prev) => ({ ...prev, [field]: uniqueOptions }));
    } catch (error) {
      console.error(`Error fetching suggestions for ${field}:`, error);
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    } finally {
      setLoading(false);
    }
  };

  // Валідація форми за допомогою Yup
  const validationSchema = Yup.object().shape({
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    planet: Yup.string().required("Required"),
  });

  // Ефект для завантаження варіантів після завантаження сторінки
  useEffect(() => {
    ["planet", "country", "city"].forEach((field) => fetchSuggestions(field));
  }, []);

  // Налаштування Formik
  const formik = useFormik({
    initialValues: {
      planet: user.residence.planet || "",
      country: user.residence.country || "",
      city: user.residence.city || "",
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
      dispatch(updateResidenceData({ userId: user.id, updateData: updatedData }));
      console.log("Form submitted:", values);
      setIsEditing(false); // Вихід із режиму редагування після збереження
    },
  });

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Place of Residence</h2>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            {["planet", "country", "city"].map((field) => (
              <div key={field} className={styles.inputGroup}>
                <label className={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <select
                  className={styles.input}
                  name={field}
                  value={formik.values[field]} // Значення з Formik
                  onChange={formik.handleChange} // Оновлення значення в Formik
                  disabled={!isEditing} // Поле доступне тільки в режимі редагування
                >
                  <option value="" disabled>
                    Select {field}
                  </option>
                  {suggestions[field].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {formik.touched[field] && formik.errors[field] && (
                  <div className={styles.error}>{formik.errors[field]}</div>
                )}
              </div>
            ))}
            {loading && <div className={styles.loading}>Loading options...</div>}
            {/* Кнопки редагування та збереження */}
            <EditButtons
              isEditing={isEditing}
              onEditClick={() => setIsEditing(!isEditing)}
              onSaveClick={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default PlaceOfResidence;

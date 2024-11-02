import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx"; 
import styles from "./Workplace.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Импортируйте useDispatch
import { updateUserData } from "../../../redux/slices/userSlice.js";

const validationSchema = Yup.object().shape({
  workplaceId: Yup.string().required("Select a workplace"), // Валидация для выбора рабочего места
});

const Workplace = () => {
  const dispatch = useDispatch(); // Создание экземпляра dispatch
  const user = useSelector((state) => state.user); // Получение данных пользователя из Redux
  const [loading, setLoading] = useState(false);
  const [workplaces, setWorkplaces] = useState([]); // Состояние для рабочих мест
  const [isLoadingWorkplaces, setIsLoadingWorkplaces] = useState(true); // Состояние загрузки рабочих мест

  useEffect(() => {
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get("/api/v1/workplace");
        setWorkplaces(response.data); // Установка полученных рабочих мест
      } catch (error) {
        console.error("Error fetching workplaces", error);
      } finally {
        setIsLoadingWorkplaces(false); // Завершение загрузки
      }
    };

    fetchWorkplaces();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      // Создание объекта с обновленными данными
      const updatedData = {
        ...user,
        workplace: values.workplaceId, // Обновление места работы
      };
      
      // Диспатч обновленных данных пользователя
      await dispatch(updateUserData({ userId: user.id, userData: updatedData }));
      console.log("Selected Workplace ID:", values.workplaceId);
      resetForm(); // Очистить форму после успешного добавления
    } catch (error) {
      console.error("Error processing workplace", error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { workplaceId: "" }, // Установлено начальное значение
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Select Workplace</h2>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Select Workplace:</label>
              <select
                className={styles.select}
                name="workplaceId"
                value={formik.values.workplaceId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select a workplace" />
                {isLoadingWorkplaces ? (
                  <option disabled>Loading...</option> // Показать индикатор загрузки
                ) : (
                  workplaces.map((workplace) => (
                    <option key={workplace.id} value={workplace.id}>
                      {workplace.name}
                    </option>
                  ))
                )}
              </select>
              {formik.touched.workplaceId && formik.errors.workplaceId && (
                <div className={styles.error}>{formik.errors.workplaceId}</div>
              )}
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default Workplace;

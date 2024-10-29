import ProfileMenu from "../ProfileMenu/ProfileMenu.jsx";
import styles from "./Workplace.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().max(100, "Max 100 characters").required("Required"),
});

const Workplace = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/api/v1/workplace/create", {
        name: values.name,
      });
      console.log("Workplace added successfully");
      setName(""); // Очистить поле после успешного добавления
    } catch (error) {
      console.error("Error adding workplace", error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <MainContent title="">
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Add Workplace</h2>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Workplace Name:</label>
              <input
                type="text"
                className={styles.input}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error}>{formik.errors.name}</div>
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

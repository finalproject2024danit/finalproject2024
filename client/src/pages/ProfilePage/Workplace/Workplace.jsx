import ProfileMenu from "../ProfileMenu.jsx";
import styles from "./Workplace.module.scss";
import MainContent from "../../../components/MainContent/MainContent.jsx";
import EditButtons from "../../../components/ButtonEdit/index.jsx";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../redux/slices/userSlice.js";

const validationSchema = Yup.object().shape({
  workplaceId: Yup.string().required("Select a workplace"),
});

const Workplace = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [workplaces, setWorkplaces] = useState([]);
  const [isLoadingWorkplaces, setIsLoadingWorkplaces] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get("/api/v1/workplace");
        setWorkplaces(response.data);
      } catch (error) {
        console.error("Error fetching workplaces", error);
      } finally {
        setIsLoadingWorkplaces(false);
      }
    };

    fetchWorkplaces();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedData = {
        ...user,
        workplace: values.workplaceId,
      };
      await dispatch(
        updateUserData({ userId: user.id, userData: updatedData })
      );
      console.log("Selected Workplace ID:", values.workplaceId);
      setIsEditing(false);
    } catch (error) {
      console.error("Error processing workplace", error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { workplaceId: user.workplace || "" },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainContent title="">
      <div className={styles.workplaceBox}>
        <ProfileMenu />
        <div className={styles.content}>
          <h2 className={styles.title}>Select Workplace</h2>

          <div className={styles.currentWorkplace}>
            <h3 className={styles.subtitle}>Current Workplace</h3>
            <p
              className={`${styles.workplaceText} ${
                !user.workplace ? styles.noWorkplace : ""
              }`}
            >
              {user.workplace || "No workplace selected"}
            </p>
          </div>

          {isEditing ? (
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
                    <option disabled>Loading...</option>
                  ) : (
                    workplaces.map((workplace) => (
                      <option key={workplace.id} value={workplace.id}>
                        {workplace.name}
                      </option>
                    ))
                  )}
                </select>
                {formik.touched.workplaceId && formik.errors.workplaceId && (
                  <div className={styles.error}>
                    {formik.errors.workplaceId}
                  </div>
                )}
              </div>
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

export default Workplace;

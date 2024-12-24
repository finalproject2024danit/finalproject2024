import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./LeftSidebar.module.scss";
import ExitIcon from "../Exit";

import { fetchSearchResults } from "../../redux/slices/searchSlice";

const defaultAvatarProfile =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avatar } = useSelector((state) => state.user);
  const userAvatar = avatar || defaultAvatarProfile;

  const { results, isLoading } = useSelector((state) => state.globalsearch);

  const { t } = useTranslation();

  const handleSearch = async (inputValue) => {
    if (!inputValue) return;
    dispatch(fetchSearchResults(inputValue));
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const [type, id] = selectedOption.value.split("-");

      const route = type === "user" ? `/user/${id}` : `/group/${id}`;

      if (type === "group") {
        navigate(`/group/${id}`);
      }
      navigate(route);
    }
  };

  const customsStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      color: "#000",
      borderColor: "#ccc",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e6f7ff" : "#fff",
      color: "#000",
      cursor: "pointer",
    }),
  };

  return (
    <aside className={`${styles.leftMenu} `}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="/profile/general_information"
      >
        <div className={styles.iconWrapper}>
          <img alt="User Avatar" src={userAvatar} title="Edit profile" />
        </div>
      </NavLink>

      <div className={styles.formBlock}>
        <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
          {({ setFieldValue }) => (
            <Form className={styles.menuForm}>
              <Select
                options={results}
                placeholder={t("leftSidebar.globalSearch")}
                className={styles.select}
                styles={customsStyles}
                isLoading={isLoading}
                onInputChange={(inputValue) => {
                  handleSearch(inputValue);
                  setFieldValue("search", inputValue);
                }}
                onChange={handleSelectChange}
                isSearchable
                getOptionLabel={(e) => e.label}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className={styles.functionBlock}>
        <ExitIcon />
      </div>
    </aside>
  );
};

export default LeftSidebar;

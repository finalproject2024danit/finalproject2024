import {NavLink, useNavigate} from "react-router-dom";
import Select from "react-select";
import {Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import styles from "./LeftSidebar.module.scss";
import ExitIcon from "../Exit";

import {fetchSearchResults} from "../../redux/slices/searchSlice";

const defaultAvatarProfile =
    "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_30,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1728939216/photo_2024-10-14_23-52-52_zg5tc7.jpg";

const LeftSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {avatar} = useSelector((state) => state.user);
    const userAvatar = avatar || defaultAvatarProfile;

    const {results, isLoading} = useSelector((state) => state.globalsearch);

    const {t} = useTranslation();

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
        // width:"80%",
        backgroundColor: "#fff", // Белый фон для поля ввода
        color: "#000", // Черный текст
        borderColor: "#ccc", // Светло-серая рамка
        boxShadow: "none",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#fff", // Белый фон для выпадающего списка
        zIndex: 100,
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#e6f7ff" : "#fff", // Синий фон при наведении
        color: "#000", // Черный текст
        cursor: "pointer",
      }),
    };

    return (
        // <aside className={`${styles.leftMenu} ${styles.shinyCta}`}>
        <aside className={`${styles.leftMenu} `}>
            <NavLink
                className={({isActive}) => (isActive ? styles.active : "")}
                to="/profile/general_information"
            >
                <div className={styles.iconWrapper}>
                    <img alt="User Avatar" src={userAvatar} title="Edit profile"/>
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
                styles={customsStyles} // Передаем стили в Select
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

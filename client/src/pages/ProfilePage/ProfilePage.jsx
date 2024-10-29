import ProfileMenu from "./ProfileMenu/ProfileMenu.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";

const ProfilePage = () => {
  return <ProfileMenu />;
};

const ProfileInfo = () => {
  return (
    <MainContent title="">
      <ProfilePage />
    </MainContent>
  );
};

export default ProfileInfo;

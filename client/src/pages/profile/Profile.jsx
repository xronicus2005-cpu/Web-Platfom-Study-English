import { Outlet } from "react-router-dom";
import HeaderProfile from "../../components/header-profile/HeaderProfile";
import SideBar from "../../components/side-bar/SideBar";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-layout">
      
      {/* Header */}
      <HeaderProfile />

      <div className="profile-body">
        
        {/* Sidebar */}
        <SideBar />

        {/* Page Content */}
        <main className="profile-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Profile;
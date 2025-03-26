import HeaderBar from "../../components/headerBar/HeaderBar";
import MenuBar from "../../components/menuBar/MenuBar";
import "../../pages/notifications/Notifications.css";
import Logo from "../../assets/Logo";

const Notifications = () => {
  return (
    <>
      <HeaderBar />
      <h1 className="notification-alert">
        En este momento no tienes notificaciones.Vuelve más tarde!
      </h1>
      <Logo />
      <MenuBar />
    </>
  );
};

export default Notifications;

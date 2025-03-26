import HeaderBar from "../../components/headerBar/HeaderBar";
import MenuBar from "../../components/menuBar/MenuBar";
import "../../pages/messages/Messages.css";
import Logo from "../../assets/Logo";

const Messages = () => {
  return (
    <>
      <HeaderBar />
      <h1 className="message-alert">
        En este momento no tienes mensajes. Vuelve más tarde!
      </h1>
      <Logo />
      <MenuBar />
    </>
  );
};

export default Messages;

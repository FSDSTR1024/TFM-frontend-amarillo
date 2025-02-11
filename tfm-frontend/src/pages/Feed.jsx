import AddWhizzes from "../components/addWhizzes/AddWhizzes";
import HeaderBar from "../components/headerBar/HeaderBar";
import MenuBar from "../components/menuBar/MenuBar";
import WhizzesContainer from "../components/whizzesContainer/WhizzesContainer";

const Feed = () => {
  return (
    <>
      <HeaderBar />
      <WhizzesContainer />
      <AddWhizzes />
      <MenuBar />
    </>
  );
};

export default Feed;

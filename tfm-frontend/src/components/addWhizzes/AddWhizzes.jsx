import { Link } from "react-router-dom";
import "./AddWhizzes.css";
import add from "../../assets/icons/add.svg";

const AddWhizzes = () => {
  return (
    <div className="add-whizzes">
      <Link to="/whizzes">
        <img src={add} alt="add" />
      </Link>
    </div>
  );
};

export default AddWhizzes;

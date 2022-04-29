import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchItems } from "../redux/reducers/products";
import { IoBag } from "react-icons/io5";
import "../styles/Navbar.css";
import Search from "./Search";

const Navbar = () => {
  const { quantity, user } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="Navbar">
      <div className="container">
        <Link to="/" onClick={() => dispatch(searchItems(""))}>
          Myos Shop
        </Link>
        <Search />
        <Link to="/cart" className="cart">
          Hello {user} <IoBag />
          {quantity !== 0 && <span>{quantity}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchItems } from "../redux/reducers/products";
import "../styles/Search.css";

function Search() {
  const [search, setSearch] = useState("");
  const { selectedProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
          dispatch(searchItems(search));
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          onClick={() => {
            dispatch(searchItems(""));
            setSearch("");
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default Search;

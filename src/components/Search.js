import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchItems } from "../redux/reducers/products";
import "../styles/Search.css";

function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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

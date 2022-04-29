import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/products";
import { get } from "../api/api";
import "../styles/Products.css";
import Loading from "./Loading";

const Products = () => {
  const { search } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await get("products");
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="Products container">
      {products
        .filter((e) =>
          search
            ? e.title.toLowerCase().includes(search.toLowerCase()) ||
              e.description.toLowerCase().includes(search.toLowerCase())
            : e
        )
        .map((product) => {
          const { id, title, price, image } = product;
          return (
            <div className="product" key={id}>
              <div
                className="image-container"
                onClick={() => navigate(`/products/${id}`)}
              >
                <img src={image} alt={title} />
              </div>
              <div className="product-info">
                <h3
                  onClick={() => navigate(`/products/${id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {title}
                </h3>
                <h3>₤{price}</h3>
              </div>
              <div>
                <button onClick={() => dispatch(addToCart(product))}>
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;

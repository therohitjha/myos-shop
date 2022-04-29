import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/products";
import { get } from "../api/api";
import "../styles/SingleProduct.css";
import Loading from "./Loading";
const Products = lazy(() => import("./Products"));

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { search } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await get(`products/${id}`);
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const { title, price, description, category, image } = product;

  if (isLoading) {
    return <Loading />;
  }

  return search ? (
    <Suspense fallback={<Loading />}>
      <Products />
    </Suspense>
  ) : (
    <div className="SingleProduct container">
      <div className="left-div container">
        <img src={image} alt={title} />
      </div>
      <div className="right-div">
        <h2 className="title">{title}</h2>
        <h3 className="category">{category}</h3>
        <p className="description">{description}</p>
        <p className="price">₤{price}</p>
        <button onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;

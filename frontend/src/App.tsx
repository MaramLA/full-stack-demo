import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProductType = {
  id: number | null;
  title: string;
  price: number;
};

const App = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType>({
    id: null,
    title: "",
    price: 0,
  });

  const fetchProducts = async () => {
    try {
      const productsData = await axios.get("http://localhost:8080/products");
      setProducts(productsData.data.payload);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/products/${id}`
      );
      setProduct({
        id: null,
        title: "",
        price: 0,
      });
      setIsEdit(false);
      toast.success(response.data.message);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateProduct = async (product: ProductType) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/products`,
        product
      );
      toast.success(response.data.message);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditProduct = async (currentProduct: ProductType) => {
    try {
      setIsEdit(true);
      setProduct({
        id: currentProduct.id,
        title: currentProduct.title,
        price: currentProduct.price,
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (isEdit === true) {
        const response = await axios.put(
          `http://localhost:8080/products/${product.id}`,
          product
        );
        toast.success(response.data.message);
        fetchProducts();
        setIsEdit(false);
      } else handleCreateProduct(product);

      setProduct({
        id: null,
        title: "",
        price: 0,
      });
      setIsEdit(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form action="POST" className="form" onSubmit={handleSubmit}>
        <div className="top-section">
          <div className="entry">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              onChange={handleInputChange}
              value={product.title}
            />
          </div>
          <div className="entry">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Enter price"
              onChange={handleInputChange}
              value={product.price}
            />
          </div>
        </div>
        <div className="buttons">
          {isEdit ? (
            <button type="submit">Edit</button>
          ) : (
            <button type="submit">Create</button>
          )}
        </div>
      </form>
      <div className="products">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <article key={product.id}>
                <div className="detials">
                  <h3>{product.title}</h3>
                  <p>{product.price}$</p>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      handleDeleteProduct(Number(product.id));
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      handleEditProduct(product);
                    }}
                  >
                    edit
                  </button>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default App;

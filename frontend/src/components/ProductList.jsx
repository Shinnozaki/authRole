import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3100/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:3100/products/delete/${productId}`)
    getProducts()
  } 

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of products</h2>
      <Link className="button is-primary mb-2" to={"/products/add"}>Add Product</Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">Edit</Link>
                <button onClick={()=>{deleteProduct(product.uuid)}} className="button is-small is-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const saveProduct = async(e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3100/products', {
        name: name,
        price: price
      })
      navigate("/products")
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg)
      }
      else{
        console.log("ga masukk")
      }
      console.log(msg)
    }
  }

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <h1 className="title is-3 is-centered">Add Product</h1>

              <div className="field">
                <label htmlFor="">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Price</label>
                <div className="control">
                  <input type="text" className="input" placeholder="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-success" type="submit">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

import React from 'react'

const EditProduct = () => {
  return (
    <div>
    <h1 className="title">Products</h1>
    <h2 className="subtitle">Update Product</h2>
    <div className="card is-shadowless">
      <div className="card-content">
        <div className="content">
          <form>
            <h1 className="title is-3 is-centered">Update Product</h1>

            <div className="field">
              <label htmlFor="">Name</label>
              <div className="control">
                <input type="text" className="input" placeholder="name" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="">Price</label>
              <div className="control">
                <input type="text" className="input" placeholder="price" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-success">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditProduct
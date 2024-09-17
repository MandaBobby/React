import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const Admin = () => {
  const form = {
    product: "",
    quality: "",
    quantity: "",
  };

  const [Edit, setEdit] = useState(null);
  const [data, setData] = useState(form);
  const [submitData, setSubmitData] = useState([]);

  const { product, quality, quantity } = data;

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("records")) || [];
    setSubmitData(stored);
  }, []);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (quality > 5 || quality < 0) {
      alert("Enter Quality between range (1-5)");
      setData(form);
      return;
    }

    let newEntries;
    if (Edit !== null) {
      newEntries = submitData.map((item, index) =>
        index === Edit ? data : item
      );
      setEdit(null);
    } else {
      newEntries = [...submitData, data];
    }

    setSubmitData(newEntries);
    sessionStorage.setItem("records", JSON.stringify(newEntries));
    setData(form);
  };

  const Edithandler = (i) => {
    setData(submitData[i]);
    setEdit(i);
  };

  const Deletehandler = (i) => {
    const updatedData = submitData.filter((_, index) => index !== i);
    sessionStorage.setItem("records", JSON.stringify(updatedData));
    setSubmitData(updatedData);
  };

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={SubmitHandler}>
          <h1 align="center">Add Products</h1>
          <table align="center">
            <tbody>
              <tr>
                <td>
                  <label>Product:</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="product"
                    name="product"
                    value={product}
                    onChange={ChangeHandler}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Quality :</label>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="quality (between 1-5)"
                    name="quality"
                    value={quality}
                    onChange={ChangeHandler}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Quantity :</label>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={ChangeHandler}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <center>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </center>
        </form>
      </div>
      <br />
      <br />

      {submitData.length > 0 && (
        <div className="container">
          <h1 align="center">Available Products</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Product quality</th>
                <th>Product quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submitData.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.product}</td>
                  <td>{entry.quality}</td>
                  <td>{entry.quantity}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => Edithandler(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => Deletehandler(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Admin;

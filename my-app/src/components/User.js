import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const User = () => {
  const [submitData, setSubmitData] = useState([]);
  const [show, setShow] = useState(false);
  const [buy, setBuy] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const records = JSON.parse(sessionStorage.getItem("records") || "[]");
    setSubmitData(records);
  }, []);

  const Deletehandler = (i) => {
    const updatedData = submitData.filter((_, index) => index !== i);
    sessionStorage.setItem("records", JSON.stringify(updatedData));
    setSubmitData(updatedData);
  };

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setCurrentIndex(index);
    setShow(true);
  };

  return (
    <>
      {submitData.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>
          NO PRODUCTS AVAILABLE FOR PURCHASE
        </h1>
      ) : (
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
                    <Button variant="primary" onClick={() => handleShow(index)}>
                      Buy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {currentIndex !== null && (
            <Modal show={show}>
              <Modal.Header
                style={{ color: "white", backgroundColor: "black" }}
              >
                <Modal.Title style={{ textAlign: "center" }}>
                  Purchase
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ color: "white", backgroundColor: "#666" }}>
                <table align="center">
                  <tbody>
                    <tr>
                      <td>
                        <h3>Product</h3>
                      </td>
                      <td>:</td>
                      <td>
                        <h3>{submitData[currentIndex].product}</h3>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h3>Quality</h3>
                      </td>
                      <td>:</td>
                      <td>
                        <h3>{submitData[currentIndex].quality}</h3>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h3>Quantity</h3>
                      </td>
                      <td>:</td>
                      <td>
                        <h3>{submitData[currentIndex].quantity}</h3>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h3>Purchase</h3>
                      </td>
                      <td>:</td>
                      <td>
                        <input
                          type="number"
                          value={buy}
                          onChange={(e) => setBuy(e.target.value)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer style={{ backgroundColor: "black" }}>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (submitData[currentIndex].quantity < buy) {
                      alert(
                        `Only ${submitData[currentIndex].quantity} stock is available`
                      );
                      return;
                    }

                    submitData[currentIndex].quantity -= buy;
                    sessionStorage.setItem(
                      "records",
                      JSON.stringify(submitData)
                    );
                    setSubmitData([...submitData]);
                    setShow(false);
                    setBuy(0);
                  }}
                >
                  Buy
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      )}
      {submitData.map((_, index) => {
        let a = submitData.find((value) => value.quantity === 0);
        if (a) {
          alert(
            `${submitData[index].product} Quantity became ZERO(0) so removing product from data`
          );
          Deletehandler(index);
        }
      })}
    </>
  );
};

export default User;

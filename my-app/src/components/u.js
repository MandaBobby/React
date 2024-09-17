import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';

const UserProducts = () => {
    
    const [submitData, setSubmitData] = useState([])
    const [show, setShow] = useState(false);
    const [selectproduct,setSelectproduct] = useState({})
    const [purchase,setPurchase] = useState('')

    const handleClose = () => {
        selectproduct.productquantity=selectproduct.productquantity-purchase
        const updatedData = submitData.map((record,index)=>record.Productname===selectproduct.Productname ?selectproduct:record)
        localStorage.setItem("productsData", JSON.stringify(updatedData));
        setSubmitData(updatedData)
        setShow(false)
        setPurchase('')
    };

    const handleShow = (product) => {
        setSelectproduct(product)
        setShow(true)
    };
    
    useEffect(() => {
        setSubmitData(JSON.parse(localStorage.getItem("productsData")) || [])
    }, [])

    return (
        <>
            <center>
                    <div>
                        <h1> -: User Dashbord :- </h1>
                        <table border={2}>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product Name</th>
                                    <th>product Quality</th>
                                    <th>product Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submitData.map((formdata, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{formdata.Productname}</td>
                                        <td>{formdata.productquality}</td>
                                        <td>{formdata.productquantity}</td>
                                        <td><Button variant="secondary" onClick={()=>handleShow(formdata)}>Buy</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </center>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Product name : {selectproduct.Productname}</Modal.Body>
                <Modal.Body>Product Quality : {selectproduct.productquality}</Modal.Body>
                <Modal.Body>Product Quantity : {selectproduct.productquantity}</Modal.Body>
                <Modal.Body>Purchase :
                    <input type="number" value={purchase} name='purchase' onChange={(e) => setPurchase(e.target.value)} required/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default UserProducts
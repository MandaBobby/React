import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Product = () => {

    const form = {
       product:"",
       quality:"",
       quantity:""
    } 

  const [data,setData]=useState(form);
  
    console.log(data)

    const {product,quality,quantity} = data

    const[submitData,setSubmitData] = useState([]);

    const ChangeHandler = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }
   
    useEffect(()=>{
      const stored=((JSON.parse(sessionStorage.getItem("records")))||[])
      setSubmitData(stored)
    },[])



    const SubmitHandler = (e) =>{
        e.preventDefault();
        if(quality>5||quality<0){
          alert(" Enter Quality between range(1-5)")
          setData(form);
          return
        }
        const newEntries=[...submitData,{product,quality,quantity}];
        setSubmitData(newEntries);
        sessionStorage.setItem("records",JSON.stringify(newEntries));

          setData(form);
      }

      const [show, setShow] = useState(false);
      const [buy,setbuy]=useState('');
      const handleClose = () => setShow(false);

  return (
    <>
    <div className='container mt-5'>
    <form onSubmit={SubmitHandler} >

    <h1 align="center">Add Products</h1>
      <table align='center'>
     
      <tr>
      <td> <label>Product:</label></td>
      <td> <input type="text"  placeholder='product' name='product' value={product} onChange={ChangeHandler}></input></td>
     </tr>

        <tr>
        <td> <label>Quality :</label></td>
        <td> <input type="number" placeholder='quality(between(1-5))' name='quality' value={quality} onChange={ChangeHandler} required/></td>
        </tr>

        <tr>
        <td> <label>Quantity :</label></td>
        <td> <input type="number" placeholder='quantity' name='quantity' value={quantity} onChange={ChangeHandler} required/></td>
        </tr>
        <br/>
        </table> 
        <center> <button type='submit' style={{borderRadius:"10px"}}>Submit</button></center>
    </form>
    </div>
    <br/>
    <br/>
    <br/>
    {submitData.length>0 &&
   <div className='container'>
    <h1 align='center'> Available Products</h1>
   <table  className='table table-bordered'>
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
        {submitData.map((entry,index) => (
          <tr key={index}>
            <td>{(index+1)}</td>
            <td>{entry.product}</td>
            <td>{entry.quality}</td>
            <td>{entry.quantity}</td>
            <td><Button variant="primary" onClick={()=>setShow(true)}>  Buy </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{color:"white",backgroundColor:"black"}}>
          <Modal.Title style={{textAlign:"center"}}>Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"white",backgroundColor:"#666"}}>
          <table align='center'>
            <tr>
              <td><h3>Product</h3></td>
              <td>:</td>
              <td><h3>{entry.product}</h3></td>
            </tr>
            <tr>
              <td><h3>Quality</h3></td>
              <td>:</td>
              <td><h3>{entry.quality}</h3></td>
            </tr>
            <tr>
              <td><h3>Quantity</h3></td>
              <td>:</td>
              <td><h3>{entry.quantity}</h3></td>
            </tr>
            <tr>
              <td><h3>Purchase</h3></td>
              <td>:</td>
              <td><input type="number" value={buy} onChange={(e)=>setbuy(e.target.value)} /></td>
            </tr>
          </table>
        
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"black"}}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            if(entry.quantity<buy){
              alert(`Only ${entry.quantity} stock is Available`)
              return;
            }
            entry.quantity=(entry.quantity-buy);
            submitData[index].quantity=entry.quantity;
            sessionStorage.setItem("records",JSON.stringify(submitData));
             setShow(false)
             setbuy(0);
          }}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal></td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
}
    </>
  )

}

export default Product;
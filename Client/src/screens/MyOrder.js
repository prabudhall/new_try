import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Loading from '../components/Loading';

export default function MyOrder() {
    const [orderData, setOrderData] = useState("");
    
    const fetchMyOrder = async ()=>{
        console.log(process.env);
        var fetchfrom = process.env.REACT_APP_BACK_URL + "/api/myOrderData";
        //til the time it is fetching the page is loading and waiting for this and if it fails then loading become the final state and cannot be reloaded until reloaded manually
        await fetch(fetchfrom,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email: localStorage.getItem("userEmail")})
        }).then(async (res)=>{
            let response = await res.json();
            // console.log("response");
            // console.log(response);
            setOrderData(response);
        })
    }

    useEffect(()=>{
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div><NavBar /></div>

            <div >
                {orderData ==="" ? <div> <Loading /> </div>: 
                
                <div>
                    {orderData !== {} ? Array(orderData).map(data => {
                    // console.log("inside OD");
                    console.log(data);
                    return (
                        <div className='container'>
                            <div className='row'>
                                {
                                    data.myOrder ?
                                    data.myOrder.order_id.slice(0).reverse().map((item) => {
                                        // console.log("inside data");
                                        // console.log(item);
                                        return (
                                            item.map((arrayData) => {
                                                // console.log("inside item data to show");
                                                // console.log(arrayData);
                                                // inside return either only js like below or if html is also there then js inside {} as above 
                                                return (
                                                    arrayData.Order_date ? <div className='m-auto mt-5'>
                                                        
                                                        {arrayData.Order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                )
                                            })
                                        )
                                    }) : ""
                                }
                            </div>
                        </div>
                    )
                }) : ""}
                </div>

                }
                
            </div>

            <div><Footer /></div>
        </div>
    )
}

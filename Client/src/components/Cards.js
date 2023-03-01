import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Cards(props) {

    let dispatch = useDispatchCart();
    let data = useCart()

    const priceRef = useRef();
    // console.log(props.options);
    var optionKey = Object.keys(props.options);
    let foodItem = props.foodItem;

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleATC = async ()=>{
        if(localStorage.getItem('userEmail') == null){
            alert("You must Login first!");
            return;
        }
        let food = []
        for(const item of data){
            if(item.id === foodItem._id){
                food = item;
                break;
            }
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type:"UPDATE", id:food.id, price:finalPrice, qty:qty});
                return;
            }
        }

        await dispatch({type:"ADD", id:foodItem._id, name:foodItem.name, img:foodItem.img, price:finalPrice, qty:qty, size:size});
        console.log(data);
    }
    
    let finalPrice = qty * parseInt(props.options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "400px" }}>
                {/* <img src="https://media.istockphoto.com/id/629050018/photo/chilli-paneer-tikka-or-paneer-kabab.jpg?s=612x612&w=is&k=20&c=cAU2DUs0HfXMcQo0Yu1seaozBsvQZVMuvIF8XkiYd7U=" className="card-img-top" alt="..." /> */}
                <img src={foodItem.img} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}} />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    {/* <p className="card-text">{props.description} </p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded text-white' onChange={(e)=>{setQty(e.target.value)}}>
                            {
                                // creating array of options
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                            {
                                optionKey.map((data)=>{
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline fs-5'>
                            Rs. {finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center ms-2' onClick={handleATC}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

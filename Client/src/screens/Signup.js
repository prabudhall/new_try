import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Signup() {

    const [bdOpen, setBdOpen] = useState(false);
    const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""});
    let navigate = useNavigate();
    if(localStorage.getItem("authToken")){
        navigate("/");
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})        );
        setBdOpen(true);

        var fetchfrom = process.env.REACT_APP_BACK_URL + "/api/createuser";

        const response = await fetch(fetchfrom, {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = await response.json();
        console.log(json);
        setBdOpen(false);

        if(!json.success) {
            alert("Inavlid Credentials");
        }
        else{
            navigate("/login");
        }
    }

    const onChange = (event)=>{
        setcredentials({ ...credentials, [event.target.name]:event.target.value});
    };

    return (
        <div>
            <Backdrop open = {bdOpen}>
                <CircularProgress />
            </Backdrop>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}

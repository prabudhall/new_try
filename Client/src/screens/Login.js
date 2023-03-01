import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material'

export default function Login() {

  const [bdOpen, setBdOpen] = useState(false);
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  var navigate = useNavigate();
  if(localStorage.getItem("authToken")){
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    setBdOpen(true);

    var fetchfrom = process.env.REACT_APP_BACK_URL + "/api/loginuser";

    const response = await fetch(fetchfrom, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    setBdOpen(false);
    if (!json.success) {
      alert("Inavlid Credentials");
      // console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    }
    else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Backdrop open = {bdOpen}>
        <CircularProgress />
      </Backdrop>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>

    </div>
  )
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login(){

const navigate = useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin = async(e)=>{

e.preventDefault()

const res = await axios.post("https://reactbackend-production-006c.up.railway.app/api/login",{
email,
password
})

if(res.data === "Login Success"){
navigate("/dashboard")
}else{
alert("Invalid Login")
}

}

return(

<div className="container">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Login</button>

</form>

<br/>



<Link to="/register">Create Account</Link>

</div>

)

}

export default Login
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin = async(e)=>{

e.preventDefault()

const res = await axios.post("http://localhost:8080/api/login",{
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

<a href="/register">Create Account</a>

</div>

)

}

export default Login
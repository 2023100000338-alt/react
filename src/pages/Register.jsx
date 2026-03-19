import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){

const navigate = useNavigate()

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleRegister = async(e)=>{

e.preventDefault()

await axios.post("http://localhost:8080/api/register",{
name,
email,
password
})

alert("Registration Success")

navigate("/")

}

return(

<div className="container">

<h2>Register</h2>

<form onSubmit={handleRegister}>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Register</button>

</form>

</div>

)

}

export default Register
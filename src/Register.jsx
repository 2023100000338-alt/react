import { useState } from "react";

function Register(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert("Registration Successful");
        console.log(name,email,password);
    }

    return(

        <form onSubmit={handleSubmit} className="form">

            <h2>Register</h2>

            <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />

            <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
             <input
            type="password"
            placeholder="confirm Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />

            <button type="submit">Register</button>

        </form>

    )
}

export default Register;
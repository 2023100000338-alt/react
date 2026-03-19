import { useState } from "react";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        alert("Login Successful");
        console.log(email,password);
    }

    return(

        <form onSubmit={handleSubmit} className="form">

            <h2>Login</h2>

            <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />

            <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />

            <button type="submit">Login</button>

        </form>

    )
}

export default Login;
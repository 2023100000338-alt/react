import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard(){

const [products,setProducts]=useState([])
const [name,setName]=useState("")
const [price,setPrice]=useState("")

const loadProducts = async()=>{

const res = await axios.get("https://reactbackend-production-006c.up.railway.app/")
setProducts(res.data)

}

useEffect(()=>{
loadProducts()
},[])

const addProduct = async()=>{

await axios.post("https://reactbackend-production-006c.up.railway.app/",{
name,
price
})

setName("")
setPrice("")

loadProducts()

}

return(

<div className="layout">

{/* Sidebar */}

<div className="sidebar">

<h2>Admin Panel</h2>

<ul>

<li>Dashboard</li>
<li>Products</li>
<li>Orders</li>
<li>Users</li>
<li>Settings</li>

</ul>

</div>


{/* Main Content */}

<div className="main">

<div className="topbar">

<h3>Product Dashboard</h3>

</div>


<div className="product-form">

<input
placeholder="Product Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<button onClick={addProduct}>
Add Product
</button>

</div>


<h3>Product List</h3>

<table>

<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Price</th>
</tr>

</thead>

<tbody>

{products.map((p)=>(
<tr key={p.id}>
<td>{p.id}</td>
<td>{p.name}</td>
<td>{p.price}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default Dashboard
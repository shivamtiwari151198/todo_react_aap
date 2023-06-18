import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adduser = () => {
  const navigate = useNavigate();

  const[userName,setUserName]=useState("");
  const[mobile,setMobile]=useState("");

  const addUserHandler=()=>{
    let payload={
        userName,
        mobile,
    };
    axios.post("http://localhost:3003",payload).then((res)=>{
        console.log(res);
        setUserName("");
        setMobile("");

    }).catch((error)=>console.log("error"));
    };

  return (
    <>
      <button onClick={() => navigate("/")}>Home Page</button>
      <button onClick={() => navigate("edit")}>Edit User</button>
      <div>Adduser</div>
      <br />
      <br />
      <label>UserName</label>
      <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} />
      <label>mobile</label>
      <input type="text" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
      <button onClick={addUserHandler}>Add User</button>
    </>
  );
};

export default Adduser;

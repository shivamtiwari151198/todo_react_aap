import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const[flag,setflag]=useState(false);

  useEffect(() => {
    axios
      .get("http://3.6.55.154:3003/")
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

  const deleteHandler = (_id) => {
    console.log("id", _id);
    let payload = {
      _id,
    };
    axios
      .delete("http://3.6.55.154:3003/", { data: payload })
      .then((res) => setflag(!flag)).catch((error) => {console.log(error);});
  };

  console.log("user", user);
  return (
    <div>
      <button onClick={() => navigate("/add")}>Adduser</button>
      <button onClick={() => navigate("edit")}>Edituser</button>
      <div>Homepage</div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Mobile</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.map((post) => {
              return (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.userName}</td>
                  <td>{post.mobile}</td>
                  <td className="horebal" onClick={()=>deleteHandler(post._id)}>Delete</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;

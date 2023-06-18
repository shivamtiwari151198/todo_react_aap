import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edituser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [flag, setflag] = useState(false);

  const editHandler = (e, _id, key) => {
    const editedData = user.find((item) => item._id === _id);
    let payload = { ...editedData, [key]: e.target.innerHTML };
    console.log("key", key);
    console.log("_id", _id);
    console.log("e", e.target.innerHTML);
    axios.put("http://3.6.55.154:3003/", payload).then((res) => {
      getusers();
    });
  };
  function getusers() {
    try {
      axios
        .get("http://3.6.55.154:3003/")
        .then((res) => {
          console.log(res);
          setUser(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getusers();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Home Page</button>
      <button onClick={() => navigate("/edit")}>Edit User</button>
      <div>Edituser</div>
      <div>
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0
              ? user &&
                user.map((post) => {
                  return (
                    <tr key={post._id}>
                      <td>{post._id}</td>
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => editHandler(e, post._id, "userName")}
                      >
                        {post.userName}
                      </td>
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => editHandler(e, post._id, "mobile")}
                      >
                        {post.mobile}
                      </td>
                    </tr>
                  );
                })
              : "no data"}
            ;
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Edituser;

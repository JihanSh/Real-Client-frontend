import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import edit from "./images/icons8-create-64.png";
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";

const UserOrders = () => {
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);

  let items = [];
  console.log(product);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders/");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/orders/");
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <>
      <h1>Users Who Ordered</h1>
      <div>
        <div>
          <h1>Username</h1>

          <h1>Phone Number</h1>
          <h1>Total Price</h1>
          <h1>Ordered at</h1>
          <h1>Status</h1>
          <h1>Products</h1>
          <h1>Address</h1>

          {users.map((user) => (
            <div key={user._id}>
              <p>{user.user.username}</p>
              {/* {items.map((item,index) => (<div>{item}</div>))} */}
              <p>{user.user.address}</p>
              <p>{user.user.phonenumber}</p>
              <p>{user.total_price}</p>
              <p>{user.status}</p>
              {/* {console.log("user", user)} */}
              <div>
                {user.products.map((item) => (
                  <div key={item._id}>
                    {/* {console.log(item)} */}
                    {item.product && (
                      <div>
                        {/* <img
                          src={`http://localhost:5000/${item.product.images[0]}`}
                        /> */}
                         {console.log("ITEM ",item.product)}
                        <p>{item.product.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserOrders;
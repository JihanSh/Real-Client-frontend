import React, { useState, useEffect } from "react";
import axios from "axios";
import "./orderDashboard.css";
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";
import { Footer } from "../../component/Header/footer/footer";

const UserOrders = () => {
  const [menubar, setMenuBar] = useState(false);

  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
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

  return (
    <>
      <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <h1 className="orderdashboard-title">Users Who Ordered</h1>
      <br />
      <div className="table-wrapper-order">
        <table className="Orderdash-table">
          <thead>
            <td>Username</td>
            <td>Phone Number</td>
            <td>Address</td>
            <td>Products</td>
            <td>Total Price</td>
            <td>Status</td>
          </thead>
          <tbody className="order-body">
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.user.username}</td>
                <td>{user.user.phonenumber}</td>
                <td>{user.user.address}</td>
                <td>
                  {user.products.map((item) => (
                    <tr key={item._id}>
                      {/* {console.log(item)} */}
                      {item.product && (
                        <td>
                          <img
                            className="dashboard-product-image"
                            src={`http://localhost:5000/${item.product.images[0]}`}
                          />
                          <td>{item.product.name}</td>
                        </td>
                      )}
                    </tr>
                  ))}
                </td>
                <td>{user.total_price}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default UserOrders;

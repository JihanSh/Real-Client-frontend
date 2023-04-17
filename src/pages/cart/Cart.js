import React, { useState, useEffect } from "react";
import "./Cart.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Cart = () => {
  const userId = "6430c1f5d7942484d04adb9c";
  const [tableData, setTableData] = useState([]);
  const [totalData, settotalData] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cart/${userId}`);
        const data = await response.json();
        setTableData(data.items);
        settotalData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { id: "remove", label: " ", minWidth: 100 },
    { id: "image", label: "Image", minWidth: 100 },
    { id: "product", label: "Product", minWidth: 100 },
    { id: "size", label: "Size", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
  ];
  // const handleRemove = async (userId, productId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/cart/${userId}/${productId}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (response.ok) {
  //       console.log(`Item with ID ${productId} has been removed from cart for user ${userId}.`);
  //       const cartResponse = await fetch(`http://localhost:5000/cart/${userId}`);
  //       const cartData = await cartResponse.json();
  //       setTableData(cartData.items);
  //     } else {
  //       console.error("Failed to remove item");
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const handleRemove = async (userId, productId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this item from your cart?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetch(
              `http://localhost:5000/cart/${userId}/${productId}`,
              {
                method: "DELETE",
              }
            );
            if (response.ok) {
              const data = response.json();
              setTableData(data);
              window.location.reload(); // Reload the page
            } else {
              console.error("Failed to remove item");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleOrder = () => {
    // send POST request to place order function
    fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // set order status to success
          setOrderStatus("success");
          Swal.fire({
            icon: 'success',
            title: 'Order placed successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload(); // Reload the page
          });
        } else {
          // set order status to failure
          setOrderStatus("failure");
          Swal.fire({
            icon: 'error',
            title: 'Failed to place order.',
            showConfirmButton: false,
            timer: 1500
          });
        }
        console.log(orderStatus);
      })
      .catch((error) => {
       // set order status to failure
       setOrderStatus("failure");
       Swal.fire({
         icon: 'error',
         title: 'Failed to place order.',
         showConfirmButton: false,
         timer: 1500
       });
     });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1 className="cart-title">Cart</h1>
      </div>
      <div className="cart-table">
        <Paper
          sx={{
            width: "70%",
            overflow: "hidden",
            marginLeft: "auto",
            marginRight: "auto",
            border: "#0B486A solid 1px",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <button
                        onClick={() => handleRemove(userId, item.productId._id)}
                        className="cart-button-icon"
                      >
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="cart-Xicon"
                        />
                      </button>
                    </TableCell>
                    <TableCell className="cart-item-image">
                      <img
                        src={`http://localhost:5000/${item.productId.images[0]}`}
                        alt={item.product}
                      />
                    </TableCell>
                    <TableCell>{item.productId.name}</TableCell>
                    <TableCell>{item.productId.size}</TableCell>
                    <TableCell>{item.productId.discountedPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div className="cart-totals">
        <h1 className="cart-totals-title">Cart Total</h1>
        <div className="cart-totals-first">
          <p>Total</p>
          <p>{totalData.bill}</p>
        </div>
        <div className="cart-totals-second">
          <button className="cart-totals-second-button" onClick={handleOrder}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;

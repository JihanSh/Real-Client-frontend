import React, { useState, useEffect } from "react";
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";
import { Footer } from "../../component/Header/footer/footer";
import Swal from "sweetalert2";

const User = () => {
  const [menubar, setMenuBar] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const id = sessionStorage.getItem("Id");
  console.log(id);

  useEffect(() => { 
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [id]);
  const handleLogout = async () => {
    try {
      const response = await fetch("/http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log("Logout Successfully");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const updateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          address: address,
          phoneNumber: phoneNumber,
        }),
      });
      const data = await response.json();
      console.log("Updated Successfully");

      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
        });
        return data.user;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
      <MenuBar menubar={menubar} />
      <form onSubmit={updateUser}>
        <div className="User-inputs">
          <h1>{user.username}</h1>

          <label className="update-Address">
            Address:
            <br />
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </label>
        </div>
        <label className="update-phonenumber">
          Phonenumber:
          <br />
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <button className="submit-button" type="submit">
          Update
        </button>
        <button onClick={handleLogout}>Logout</button>
      </form>
      <Footer />
    </>
  );
};

export default User;


import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";
import { Footer } from "../../component/Header/footer/footer";

const User = async (userId, updateData) => {
  try {
    const response = await fetch('/api/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        updateData
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.user;
  } catch (error) {
    console.error(error);
  }

  return(
    <>
    </>
  )
};



export default User











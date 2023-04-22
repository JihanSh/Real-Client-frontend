import React, { useState } from 'react'
import './About.css'
import { HeaderNavbar, MenuBar } from "../../component/Header/HeaderNavbar";


const About = () => {
  const [menubar, setMenuBar] = useState(false);

  return (
    <>
    <HeaderNavbar setMenuBar={setMenuBar} menubar={menubar} />
        <MenuBar menubar={menubar} />
    <div>About</div>
    </>
  )
}

export default About
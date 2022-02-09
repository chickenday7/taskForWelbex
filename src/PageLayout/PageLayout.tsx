import {Outlet} from "react-router-dom";
import {Navbar} from "../Components/Header/Navbar/Navbar";
import React from "react";
import {FooterContainer} from "../Components/Footer/FooterContainer";



export const PageLayout = () => {
    return (
        <div className='appWrapper'>
            <header className='headerWrapper'>
            </header>
            <nav className='navbarWrapper'>
                <Navbar/>
            </nav>
            <div className='contentWrapper'>
                <Outlet/>
            </div>
            <footer className='footerWrapper'>
                <FooterContainer/>
            </footer>
        </div>
    )
}

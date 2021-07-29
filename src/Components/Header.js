import React, { Component } from 'react';

//Components Imports
import TopBar from './TopBar';
import SideBarMenu from './SideBarMenu';
import Footer from './Footer';


class Header extends Component{


    render(){
        return(
            <div>
                    <TopBar />
                    <div id="layoutSidenav">
                    <SideBarMenu />
                    <div id="layoutSidenav_content">


                    
                    {this.props.children}



                    <Footer/>  
                    </div>
                </div>
                

        </div>
        )
    }
}

export default Header;
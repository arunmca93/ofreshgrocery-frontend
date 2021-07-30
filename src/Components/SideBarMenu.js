import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../Store/Persistor'
import { connect } from "react-redux";




class SideBarMenu extends Component {

    constructor(props){
        super(props)

        this.state={
            userName:''
        }
    }

    async componentDidMount(){

        const userInfo = store.getState().userInfo
        this.setState({userName:userInfo.name});


    }

    render(){

        const { userName } = this.state
        return(
            
            <div id="layoutSidenav_nav">
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <Link className="nav-link" to="/dashboard">
                                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                        Dashboard
                                    </Link>

                                    <Link className="nav-link" to="/list">
                                        <div className="sb-nav-link-icon"><i className="fas fa-clipboard-list"></i></div>
                                        Grocery List
                                    </Link>

                                    <Link className="nav-link" to="/createList">
                                        <div className="sb-nav-link-icon"><i className="fas fa-cart-plus"></i></div>
                                        Create List
                                    </Link>
                                    
                                    <Link className="nav-link" to="/users">
                                        <div className="sb-nav-link-icon"><i className="fas fa-sign-out-alt"></i></div>
                                            Logout
                                    </Link>
                                    
                                                                
                                
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                    {userName}   </div>
                        </nav>
                    </div>

                        
                    
        )
    }
}

export default connect()(SideBarMenu);
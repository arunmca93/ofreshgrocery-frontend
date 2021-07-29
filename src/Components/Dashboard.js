import { Component } from "react";
import Header from "./Header";
import axios from '../Utils'

export default class Dashboard extends Component{

    constructor(){
        super()

        this.state = {
            total_orders:0
        }
    }

    async componentDidMount(){

        const result = await axios.get('/dashboard')

        this.setState({total_orders:result.data.data.total_orders})
        

    }

    render(){
        const { total_orders } = this.state
        return(
            <Header>
                
                        <main>
                            <div className="container-fluid px-4">
                            <h1 className="mt-4 text-start">Dashboard</h1>
                                <div className="content">
                                <div className="container-fluid">
                                <div className="row mt-3">
                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                            <div className="card bg-primary text-white card-stats">
                                                <div className="card-header card-header-warning card-header-icon">
                                                <div className="card-icon">
                                                <h2><i className="fas fa-clipboard-list"></i></h2>
                                                </div>
                                                <p className="card-category">Total Orders</p>
                                                <h2>{total_orders}</h2>
                                                </div>                
                                            </div>
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                            <div className="card bg-warning text-white card-stats">
                                                <div className="card-header card-header-warning card-header-icon">
                                                <div className="card-icon">
                                                <h2><i className="fas fa-clipboard-list"></i></h2>
                                                </div>
                                                <p className="card-category">Total Orders</p>
                                                <h2>{total_orders}</h2>
                                                </div>                
                                            </div>
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                            <div className="card bg-success text-white card-stats">
                                                <div className="card-header card-header-warning card-header-icon">
                                                <div className="card-icon">
                                                <h2><i className="fas fa-clipboard-list"></i></h2>
                                                </div>
                                                <p className="card-category">Total Orders</p>
                                                <h2>{total_orders}</h2>
                                                </div>                
                                            </div>
                                            </div>

                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                            <div className="card bg-danger text-white card-stats">
                                                <div className="card-header card-header-warning card-header-icon">
                                                <div className="card-icon">
                                                <h2><i className="fas fa-clipboard-list"></i></h2>
                                                </div>
                                                <p className="card-category">Total Orders</p>
                                                <h2>{total_orders}</h2>
                                                </div>                
                                            </div>
                                            </div>
                    
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                

                        </main>
            </Header>
        )
    }
} 
import { Component } from "react";
import Header from "./Header";
import axios from '../Utils'

export default class List extends Component{

    constructor(){
        super()

        this.state = {
            orders:[]
        }
    }

    async componentDidMount(){

        const result = await axios.get('/orders')
        console.log(result)
        this.setState({orders:result.data.data})
        

    }

    render(){
        const { orders } = this.state
        return(
            <Header>
                
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4 text-start">Grocery List</h1>
                                <div className="content">
                                <div className="container-fluid">
                                    {
                                        orders.length ? orders.map((order, index)=>{

                                            return(
                                                <div key={index} className="row mt-3">
                                                    <div className="card text-start">
                                                        <div className="card-header bg-success text-white mt-2">
                                                        <h4><i className="fas fa-clipboard-list"></i> {order.name} - List {index+1}</h4>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='row'>
                                                                <div className='col-md-4'><strong>Name:</strong>  {order.name}</div>
                                                                <div className='col-md-4'><strong>Description:</strong>  {order.description}</div>
                                                                <div className='col-md-4'>
                                                                <a href="#" className="btn btn-primary"> <i className="fas fa-eye"></i> View</a> &nbsp;
                                                                <a href="#" className="btn btn-info"> <i className="fas fa-pen"></i> Edit</a> &nbsp;
                                                                <a href="#" className="btn btn-danger"> <i className="fas fa-trash"></i> Delete</a> &nbsp;
                                                                <a href="#" className="btn btn-secondary"> <i className="fas fa-print"></i> Print</a> &nbsp;

                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-4'><strong>No.Of Items:</strong>  {order.item_count}</div>
                                                                <div className='col-md-4'><strong>Created at:</strong>  {order.created_at}</div>
                                                                <div className='col-md-4'>
                                                                
                                                                </div>
                                                                
                                                            </div>
                                                            {/* <h5 className="card-title">{order.name}</h5>
                                                            <p className="card-text">{order.description}</p>
                                                            <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                                        </div>
                                                    </div>
                                
                                                </div>
                                            )
                                        }) :<div className="row mt-3">
                                                <div className="card text-center">
                                                    <div className="card-header bg-danger text-black mt-2">
                                                        No List found!
                                                    </div>                                                    
                                                </div>                                
                                            </div>
                                    }
                                    

                                    
                                </div>
                                </div>
                                </div>
                                

                        </main>
            </Header>
        )
    }
} 
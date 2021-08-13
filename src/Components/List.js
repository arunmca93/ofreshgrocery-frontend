import { Component } from "react";
import Header from "./Header";
import axios from '../Utils'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { store } from '../Store/Persistor'


class List extends Component{

    constructor(){
        super()

        this.state = {
            orders:[],
            msg:''
        }
    }

    async componentDidMount(){

        const result = await axios.get('/orders')
        this.setState({orders:result.data.data, msg:store.getState().msg})
        this.props.dispatch({type:'SETMSG', payload:''})
        

    }

    closeAlert = ()=>{
        this.setState({ msg:'' })
    }

    deleteList = async (listId)=>{

        alert(listId)
        await axios.delete(`/orders/${listId}`)
        const result = await axios.get('/orders')
        this.setState({orders:result.data.data})
    }
    render(){
        const { orders, msg } = this.state
        return(
            <Header>
                
                        <main>
                            <div className="container-fluid px-4">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h1 className="mt-4 text-start">Grocery List</h1>
                                    </div>
                                    <div className="col-md-4 pt-5 text-end ">
                                        <Link to='/createList' ><button className='btn btn-primary'> <i className="fas fa-plus"></i> Create</button></Link>
                                    </div>
                                </div>
                                { (msg!=='' && msg!==undefined) ?
                                <div className="row">
                                    <div className="col-12 mt-2">
                                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                            <strong>{msg}</strong> &nbsp;
                                            <button type="button" onClick={()=>{ this.closeAlert() }} className="btn btn-sm btn-danger" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>:''
                                }
                                <div className="content">
                                <div className="container-fluid">
                                    {
                                        orders.length ? orders.map((order, index)=>{

                                            return(
                                                <div key={index} className="row mt-3">
                                                    <div className="card text-start">
                                                        <div className="card-header bg-success text-white mt-2">
                                                        <h4 className="mt-2"><i className="fas fa-clipboard-list"></i> {order.name} </h4>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className='row'>
                                                                <div className='col-md-4'><strong>Name:</strong>  {order.name}</div>
                                                                <div className='col-md-4'><strong>Description:</strong>  {order.description}</div>
                                                                <div className='col-md-4'>
                                                                <button className="btn btn-primary"> <i className="fas fa-eye"></i> View</button> &nbsp;
                                                                <button className="btn btn-info"> <i className="fas fa-pen"></i> Edit</button> &nbsp;
                                                                <button className="btn btn-danger" onClick={()=>{ this.deleteList(order.id)}}> <i className="fas fa-trash"></i> Delete</button> &nbsp;
                                                                <button className="btn btn-secondary"> <i className="fas fa-print"></i> Print</button> &nbsp;

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

const mapStateToProps = (state) => ({
    msg:''
})

export default connect(mapStateToProps)(List)
import { Component } from "react";
import Header from "./Header";
import axios from '../Utils'

export default class CreateList extends Component{

    constructor(){
        super()

        this.state = {
            list:[],
            searchList:[],
            searchKey:'',
            itemAlreadyExist:false,
            itemNotFound:false
        }
    }


    changeHandler = (event, index) => {
        
        const tmp_list = this.state.list
        let item=tmp_list[index] 
        item = {
            ...item,
            [event.target.name]:event.target.value
        }

        tmp_list[index] = item
        this.setState({list:tmp_list});

        console.log(this.state.list)
    }

    searchHandler = (event) => {

        this.setState({[event.target.name]:event.target.value.toLowerCase()},async()=>{
            
            const result = await axios.post('/orders/search',{key:this.state.searchKey})
            if(result.data.data.length===0)
                this.setState({itemNotFound:true})
            else
                this.setState({itemNotFound:false})
            

            this.setState({searchList:result.data.data})

        })

    }

    addItem = (index)=>{

        let tmp_list = this.state.list

        let itemAlreadyExist = false
        tmp_list.forEach((val, index) => {
            if(val.item_id===this.state.searchList[index].item_id && this.state.itemAlreadyExist===false){
                this.setState({itemAlreadyExist:true, searchList:[]}) 
                itemAlreadyExist = true
            }
            
        })

        console.log('itemAlreadyExist',itemAlreadyExist)
        if(!itemAlreadyExist){
            tmp_list.push(this.state.searchList[index])
            this.setState({list:tmp_list, itemAlreadyExist:false, searchList:[],searchKey:''})        
            document.getElementById('searchKey').value=''
        }
        
    }

    clearSearchKey = (event) => {
        this.setState({itemAlreadyExist:false, searchList:[]}) 
        document.getElementById('searchKey').value=''  

    }

    render(){
        const { list, searchList, searchKey, itemAlreadyExist, itemNotFound } = this.state
        return(
            <Header>
                
                        <main>
                            <div className="container-fluid px-4">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h1 className="mt-4 text-start">Create List</h1>
                                    </div>
                                    <div className="col-md-4 pt-5 text-end ">
                                    </div>
                                </div>
                                <div className="content">
                                <div className="container-fluid">
                                    
                                                <div className="row mt-3">
                                                    <div className="card text-start">
                                                        
                                                        <div className="card-body">
                                                            <div className='row align-self-center'>
                                                                <div className='col-md-4'><strong>Name:</strong>  <input type="text" name="name" size="25" /> </div>
                                                                <div className='col-md-5'><strong>Description:</strong>  <input type="text" name="description" size="35" /></div>
                                                                <div className='col-md-3'><button className='btn btn-success'> <i className="fas fa-save"></i> Save</button></div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>                                
                                                </div>

                                                <div className="row mt-4 justify-content-md-center">
                                                    <div className="col-md-5 col-md-offset-2">
                                                        <input type="text" name="searchKey" id="searchKey" size="40" defaultValue={searchKey} onChange={this.searchHandler} /> 
                                                        &nbsp;&nbsp;<button className='btn btn-sm btn-success'> <i className="fas fa-search"></i> Search {itemNotFound}</button>
                                                    <div className="row text-start">
                                                        {
                                                            itemNotFound===true && searchKey!=='' ? <li className="list-group-item bg-danger text-white mt-2" >No item found</li>:''
                                                        }
                                                        {
                                                            itemAlreadyExist===true && searchKey!=='' ? <li className="list-group-item bg-warning text-white mt-2" >&nbsp;Item already exists... &nbsp;<button className="btn btn-sm btn-info" onClick={this.clearSearchKey} >Clear</button></li>:''
                                                        }
                                                        <div className="col-md-12">
                                                            {
                                                                searchList.length? 
                                                                <div className="card card-hover mt-2" >
                                                                    <ul className="list-group list-group-flush" style={{width:'100%',position:"absolute", zIndex:'100'}}>
                                                                    
                                                                    {
                                                                        searchList.map((item, index) => {
                                                                            return(
                                                                                <li className="list-group-item bg-secondary text-white" key={index} onClick={()=>{this.addItem(index)}} >{item.name}</li>
                                                                            )
                                                                        })

                                                                    }

                                                                    
                                                                    
                                                                </ul>
                                                                </div>: ''
                                                            }
                                                            </div>
                                                    </div>
                                                    </div>
                                                </div>
                                           
                                                <div className="row mt-4 justify-content-md-center">
                                                    <div className="col-md-12">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                <th scope="col" width="10%">#</th>
                                                                <th scope="col" width="35%">Item</th>
                                                                <th scope="col" width="25%">Description</th>
                                                                <th scope="col" width="15%">Quantity</th>
                                                                <th scope="col" width="10%">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                   list.length ? list.map((item,index)=>{

                                                                    return(
                                                                        <tr key={index}>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>{item.name}</td>
                                                                            <td> <input type="text" name="description" defaultValue={item.description} onChange={(e)=>this.changeHandler(e,index)} size="25" /> </td>
                                                                            <td> <input type="text" name="quantity" defaultValue={item.quantity} onChange={(e)=>this.changeHandler(e,index)} size="8" /> <strong>{item.code}</strong> </td>
                                                                            <td><button className='btn btn-sm btn-danger'> <i className="fas fa-trash"></i> Remove</button></td>
                                                                        </tr>
                                                                    )

                                                                   }):<tr><th scope="row" colSpan="5">No Item found!</th></tr>     
                                                                }
                                                                
                                                            </tbody>
                                                        </table>
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
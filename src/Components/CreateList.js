import { Component } from "react";
import Header from "./Header";
import axios from '../Utils'
import { connect } from 'react-redux'

class CreateList extends Component{

    constructor(){
        super()

        this.state = {
            list:[],
            searchList:[],
            searchKey:'',
            itemAlreadyExist:false,
            itemNotFound:false,
            name:'',
            description:'',
            isNameSet:true,
            qtyError:false,
            msg:''
        }
    }

    changeHandler = (event, index) => {
        
        const tmp_list = this.state.list
        let item=tmp_list[index] 
        item = {
            ...item,
            [event.target.name]:event.target.value
        }

        if(event.target.name==='quantity'){

            if(item.quantity===''){
                this.setState({qtyError:true})
                item.qty_err_msg = 'Should not be empty'
            }
            else if(isNaN(item.quantity)){
                this.setState({qtyError:true})
                item.qty_err_msg = 'Invalid number format'
            }
            else if(item.quantity===0){
                this.setState({qtyError:true})
                item.qty_err_msg = 'Should be greater than 0'
            }
            else{

                let qtyVal = item.quantity.toString().split('.')
                if(qtyVal.length>1){
                    
                    item.quantity =parseFloat(qtyVal[0]+'.'+qtyVal[1].substring(0,2))
                }

                item.qty_err_msg = ''
                this.setState({qtyError:false})


            }
        }

        tmp_list[index] = item
        this.setState({list:tmp_list});

    }

    searchHandler = (event) => {

        this.setState({[event.target.name]:event.target.value.toLowerCase()},async()=>{
            
            const result = await axios.post('/orders/search',{key:this.state.searchKey})
            if(result.data.data.length===0)
                this.setState({itemNotFound:true, itemAlreadyExist:false })
            else
                this.setState({itemNotFound:false})
            

            this.setState({searchList:result.data.data})

        })

    }

    addItem = (selectedItem)=>{

        let tmp_list = this.state.list

        let itemAlreadyExist = false
        tmp_list.forEach((val, index) => {

            if(val.item_id===selectedItem.item_id && this.state.itemAlreadyExist===false){
                this.setState({itemAlreadyExist:true, searchList:[]}) 
                itemAlreadyExist = true
            }
            
        })

        if(!itemAlreadyExist){
            tmp_list.push(selectedItem)
            this.setState({list:tmp_list, itemAlreadyExist:false, searchList:[],searchKey:''})        
            document.getElementById('searchKey').value=''
        }

        
    }

    clearSearchKey = (event) => {
        this.setState({itemAlreadyExist:false, searchList:[]}) 
        document.getElementById('searchKey').value='' 

    }

    saveList = (event)=>{

        event.preventDefault();
        this.setState({itemNotFound:false, searchKey:''})
        let hasError = false

        if(this.state.name===''){
            this.setState({isNameSet:false})
            hasError=true;
        }

        let tmp_list = this.state.list

        //console.log(tmp_list);
        tmp_list.forEach((val, index, arr) => {
            
            if(val.quantity===''){
                this.setState({qtyError:true})
                val.qty_err_msg = 'Should not be empty'
                hasError=true;
            }
            else if(isNaN(val.quantity)){
                this.setState({qtyError:true})
                hasError=true;
                arr[index].qty_err_msg = 'Invalid number format'
                hasError=true;
            }
            else if(val.quantity===0){
                this.setState({qtyError:true})
                hasError=true;
                arr[index].qty_err_msg = 'Should be greater than 0'
                hasError=true;
            }
            else{

                let qtyVal = arr[index].quantity.toString().split('.')
                if(qtyVal.length>1){
                     
                    arr[index].quantity =parseFloat(qtyVal[0]+'.'+qtyVal[1].substring(0,2))
                }

                arr[index].qty_err_msg = ''
                this.setState({qtyError:false})
                hasError=false;



            }
            
        })

        this.setState({list:tmp_list},async ()=>{

            if(hasError)
                console.log('Has error')
            else{
                let payload = {
                    name:this.state.name,
                    description:this.state.description,
                    user_id:1,
                    shop_id:1,
                    address_id:1,
                    items:this.state.list                  
                  }
                console.log(payload)

                let result = await axios.post('/orders/create', payload)

                if(result.data.code===200){
                    this.props.dispatch({type:'SETMSG',payload:'Listed created successfully!'})
                    this.props.history.push('/list')
                }
                console.log(result)

            }
                
        
        })  


    }

    removeItem = (item)=>{

        let temp_list = this.state.list
        temp_list.splice(temp_list.indexOf(item),1)
        this.setState({list: temp_list})
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:event.target.value},()=>{

            if(this.state.name==='')
                this.setState({isNameSet:false})
            else
                this.setState({isNameSet:true})    
            
        })

    }

    render(){
        const { list, searchList, searchKey, itemAlreadyExist, itemNotFound, name, description, isNameSet, qtyError } = this.state
        return(
            <Header>
                
                        <main>
                            <form onSubmit={this.saveList}>
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
                                                                <div className='col-md-4'>
                                                                    <strong>Name:</strong>  <input type="text" defaultValue={name} onChange={this.inputHandler} name="name" size="25" />
                                                                    { isNameSet===false ? <label className="text text-danger">Please enter name</label>:'' }
                                                                 </div>
                                                                <div className='col-md-5'><strong>Description:</strong>  <input type="text" defaultValue={description} name="description" size="35" /></div>
                                                                <div className='col-md-3'><button className='btn btn-success'> <i className="fas fa-save"></i> Save</button></div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>                                
                                                </div>

                                                <div className="row mt-4 justify-content-md-center">
                                                    <div className="col-md-5 col-md-offset-2">
                                                        <input type="text" name="searchKey"  id="searchKey" size="40" defaultValue={searchKey} onChange={this.searchHandler} /> 
                                                        &nbsp;&nbsp;<button className='btn btn-sm btn-success'> <i className="fas fa-search"></i> Search {itemNotFound}</button>
                                                    <div className="row text-start">
                                                        {
                                                            itemNotFound===true && searchKey!=='' ? <li className="list-group-item bg-danger text-white text-center mt-2" >No item found</li>:''
                                                        }
                                                        {
                                                            itemAlreadyExist===true && searchKey!=='' ? <li className="list-group-item bg-warning text-white text-center mt-2" >&nbsp;Item already exists... &nbsp;<button className="btn btn-sm btn-info" onClick={this.clearSearchKey} >Clear</button></li>:''
                                                        }
                                                        {
                                                            qtyError===true ? <li className="list-group-item bg-danger text-white text-center mt-2" >&nbsp;Some Item has quantity value error &nbsp;</li>:''
                                                        }
                                                        <div className="col-md-12">
                                                            {
                                                                searchList.length? 
                                                                <div className="card card-hover mt-2" >
                                                                    <ul className="list-group list-group-flush" style={{width:'100%',position:"absolute", zIndex:'100'}}>
                                                                    
                                                                    {
                                                                        searchList.map((item, index) => {
                                                                            return(
                                                                                <li className="list-group-item bg-secondary text-white" key={index} onClick={()=>{this.addItem(item)}} >{item.name}</li>
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
                                                                            <td> <input type="text" name="quantity" defaultValue={item.quantity} onChange={(e)=>this.changeHandler(e,index)} size="8" /> <strong>{item.code}</strong>
                                                                            { item.qty_err_msg!=='' ? <span><br /><small className="text text-sm text-danger">{item.qty_err_msg}</small></span>:'' }
                                                                             </td>
                                                                            <td><button type='button' className='btn btn-sm btn-danger' onClick={()=>{ this.removeItem(item) }} > <i className="fas fa-trash"></i> Remove</button></td>
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
                                
                        </form>
                        </main>
            </Header>
        )
    }
} 

const mapStateToProps = (state) =>({
    
    msg:''
})


export default connect(mapStateToProps)(CreateList)
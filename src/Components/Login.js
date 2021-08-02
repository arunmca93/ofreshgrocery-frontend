import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import axios from '../Utils'
import {store} from '../Store/Persistor' 


class Login extends Component{

    constructor(){
        super()

        this.state = {
            username:'',
            password:'',
            err_msg:''        
        }
    }

    async componentDidMount(){
        this.setState({err_msg:store.getState().msg})
        this.props.dispatch({type:'SETMSG', payload:''})
        const result = await axios.get('/'); 
        
        console.log(undefined)
        if(result===undefined)
            this.setState({err_msg:'API Services are not available'})


    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:event.target.value})
        //console.log(this.state)
    }

    submitHandler = async (event) => {
        event.preventDefault()
        
        if(!this.state.username || this.state.username==='' || !this.state.password || this.state.password==='')
        {
            this.setState({err_msg:'email and password should not be empty'})
            return false

        }

        const result = await axios.post('/users/login',{ email:this.state.username, password:this.state.password });

        //console.log(result)
        if(result.data.code===200){
            this.props.dispatch({type:'LOGIN', payload:result.data.data})
            this.props.history.push('/dashboard')

        }else{
            this.setState({err_msg:result.data.msg})
        }

        //console.log(result)

    }

    render(){
        const { username, password, err_msg } = this.state
        return(
            <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4"><img src={logo} alt='logo' /> </h3></div>
                                <div className="card-body">
                                    <form onSubmit={this.submitHandler} >
                                        <div className="text-center text-warning">
                                            { err_msg? <h5 className="text text-danger">{err_msg}</h5>:''} 
                                        </div> 
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Username" name='username' value={username} onChange={this.inputHandler} />
                                                    <label htmlFor="inputFirstName">Username</label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputFirstName" type="password" placeholder="password" name='password' value={password} onChange={this.inputHandler} />
                                                    <label htmlFor="inputFirstName">Password</label>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="mt-4 mb-0">
                                            <div className="d-grid"><button className="btn btn-success btn-block">Login</button></div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    <div className="small">
                                        <Link to='/register'>New user?</Link> | <Link to='/register'>Forgot password?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo:'',
    token:'',
    isLoggedIn:false
})

export default connect(mapStateToProps)(Login);
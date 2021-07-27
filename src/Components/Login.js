import { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png' 


class Login extends Component{

    constructor(){
        super()

        this.state = {
            username:'',
            password:''
        }
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:event.target.value})
        console.log(this.state)
    }

    render(){
        const { username, password } = this.state
        return(
            <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4"><img src={logo} alt='logo' /> </h3></div>
                                <div className="card-body">
                                    <form>
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

export default Login;
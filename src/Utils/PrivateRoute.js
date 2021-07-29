import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { store } from '../Store/Persistor'

function PrivateRoute ({component:Component, ...rest}){

    
    const isAuth = store.getState().isLoggedIn
    let hasError = false
    //store.dispatch({type:'SETMSG', payload:''}); 

    if(!isAuth){
         store.dispatch({type:'SETMSG', payload:'Please login properly!'}); 
         hasError=true
    }

    if(isAuth){

        const permissions = store.getState().userInfo.permission

        console.log(permissions.indexOf(rest.permission))
        if(permissions.indexOf(rest.permission)<0){
            store.dispatch({type:'SETMSG', payload:'Permission denied!'}); 

            hasError=true
        }

    }

    return(
        <Route {...rest} render={(props)=>{
            return !hasError ? <Component {...props} /> : <Redirect to='/login' />
            
            }
        } />
    )

}

export default PrivateRoute;
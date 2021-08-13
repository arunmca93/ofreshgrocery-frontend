import storage from "redux-persist/lib/storage"

const initialState = {
    token:'',
    userInfo:'',
    isLoggedIn:false,
    msg:''
}


const reducer = (state=initialState, action) => {

    switch (action.type){

        case "LOGIN":{

            return { ...state, userInfo: action.payload, token: action.payload.token, isLoggedIn:true }
        }

        case "SETMSG":{

            return { ...state, msg: action.payload }
        }

        case "LOGOUT":{
            storage.removeItem('ofreshgrocery');
            return { ...state }
        }

        
        default: return {...initialState}

    }

}

export default reducer;
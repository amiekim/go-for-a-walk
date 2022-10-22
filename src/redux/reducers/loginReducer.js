let initialState = {
    isLogin: false,
    userInfo: {},
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...state, userInfo : {...action.payload} ,isLogin: true };
        case "LOGOUT":
            return {...state, userInfo : {} , isLogin: false };
        default :
            return state;
    }
}


export default loginReducer;
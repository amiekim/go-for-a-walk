let initialState = {
    isLogin: false,
    userInfo: {},
};

function loginReducer (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case "LOGIN":
            return {...state, isLogin:true, ...payload};
        default :
            return {...state};
    }
}


export default loginReducer;
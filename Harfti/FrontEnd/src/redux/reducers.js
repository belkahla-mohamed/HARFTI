const initial = {
    user : {},
    active : false
}
export default function reducers(state = initial , action){
    switch(action.type){
        case 'login':
            return { ...state,
                active :true,
                user : action.payload,
                
            }

        default:
             return state
    }
}

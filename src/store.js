import {createStore} from 'redux';

const reducer = (state, action) =>{
    if(action.type === "ADD_TO_DATAS"){
        return{
            ...state,
            datas: state.datas.concat(action.data)
        }
    }
    else if(action.type === "REMOVE_FROM_DATAS"){
        state.datas.splice(action.index,1)
        return{
            ...state
        }
    }else if(action.type === "EDIT_DATAS"){
        let index = action.index;
        state.datas[index].name = action.data[0].name;
        state.datas[index].number = action.data[0].number;
        state.datas[index].description = action.data[0].description;
        return{
            ...state
        }
    }

    return state;
};

export default createStore(reducer,{act:0 ,index:'',datas:[]});
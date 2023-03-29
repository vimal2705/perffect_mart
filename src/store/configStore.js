import {createStore,combineReducers} from "redux";
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import salesManReducer from '../reducers/salesManReducer'; 

export default ()=>{
    const store=createStore(
        combineReducers({
         user:userReducer,
         product:productReducer,
         salesman:salesManReducer
        })
      );
    return store  
}


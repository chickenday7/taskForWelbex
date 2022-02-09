import {applyMiddleware, combineReducers, createStore} from "redux";
import todoReducer from "./todoReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todoPage: todoReducer
})

export type StateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk))

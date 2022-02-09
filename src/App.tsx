import React, {useEffect} from 'react';
import './Styles/App.css';
import {RouteObject, useRoutes} from "react-router-dom";
import {MainPageContainer} from "./Components/Content/MainPage/MainPageContainer";
import TodoContainer from "./Components/Content/Todo/TodoContainer";
import {PageLayout} from "./PageLayout/PageLayout";
import {ThunkDispatch} from "redux-thunk";
import {StateType} from "./Store/store";
import {ActionType, setTasksThunkCreator, TaskType} from "./Store/todoReducer";
import {compose} from "redux";
import {connect} from "react-redux";


type AppProps = MapDispatchToPropsType
function App(props:AppProps) {


    let routes: RouteObject[] = [
        {
            path:'/', element: <PageLayout/>,
            children:[
                {index: true, element: <MainPageContainer/>},
                {path:'/todo', element: <TodoContainer />}
            ]
        }

    ];


    let app = useRoutes(routes)
    useEffect(()=>{
        props.setTask()
    },[])


    return (
    <div className="App">
        {app}
    </div>
  );
}


type MapStateToProps = {
    allTask: TaskType[]
}
let mapStateToProps = (state:StateType):MapStateToProps => {
    return{
        allTask: state.todoPage.allTask
    }
}

type MapDispatchToPropsType = {
    setTask: () => void
}
let mapDispatchToProps = (dispatch: ThunkDispatch<StateType, unknown, ActionType>):MapDispatchToPropsType =>{
    return {
        setTask: () => {
            dispatch(setTasksThunkCreator())
        }
    }
}
export default compose(
    connect<MapStateToProps,MapDispatchToPropsType,{},StateType>(mapStateToProps,mapDispatchToProps)
)(App)



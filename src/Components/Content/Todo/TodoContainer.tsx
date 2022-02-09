import {Todo} from "./Todo";
import {compose} from "redux";
import React, {useEffect, useState} from "react";
import {StateType} from "../../../Store/store";
import {ThunkDispatch} from "redux-thunk";
import {
    ActionType,
    addTaskThunkCreator, changeCompletedTC,
    changePageThunkCreator, changeTaskThunkCreator, deleteTaskTC,
    setTasksThunkCreator,
    TaskType
} from "../../../Store/todoReducer";
import {connect} from "react-redux";






type TodoContainerProps = MapStateToProps & MapDispatchToProps
export const TodoContainer = (props:TodoContainerProps) => {
    let pagesCount = Math.ceil(props.totalTasks / 10)
    let arrayCount = []
    for(let i = 1 ; i<= pagesCount; i++){
        arrayCount.push(i)
    }

    const [currentPage, setCurrentPage] = useState(1)
    useEffect(()=>{
        props.setPage(currentPage)
    },[props.allTasks])

    const [errorAdd, setErrorAdd] = useState(false)

    const onAddTask = (text:string) => {
        if(text.trim() === ''){
            setErrorAdd(true)
        }else{
            props.addTask(text)
        }

    }

    const changePage = (page:number) => {
        setCurrentPage(page)
        props.setPage(page)
    }
    return <Todo pageTasks={props.pageTasks}
                 pagesCount={pagesCount}
                 arrayCount={arrayCount}
                 currentPage={currentPage}
                 changePage={changePage}
                 errorAdd={errorAdd}
                 addTask={onAddTask}
                 changeNameTask={props.changeNameTask}
                 deleteTask={props.deleteTask}
                 changeCompleted={props.changeCompleted}
                 setErrorAdd={setErrorAdd}
    />
}








type MapStateToProps = {
    pageTasks: TaskType[],
    totalTasks: number,
    allTasks: TaskType[]
}
let mapStateToProps = (state: StateType): MapStateToProps => {
    return {
        totalTasks: state.todoPage.sumOfTasks,
        pageTasks: state.todoPage.pageTasks,
        allTasks: state.todoPage.allTask
    }
}
type MapDispatchToProps = {
    setPage: (page:number) => void
    addTask: (text:string) => void
    changeNameTask: (text:string, id:number) => void
    deleteTask: (id:number) => void
    changeCompleted:(id:number, value:boolean) => void
}
let mapDispatchToProps = (dispatch: ThunkDispatch<StateType, unknown, ActionType>):MapDispatchToProps => {
    return {
        setPage: (page) => {
            dispatch(changePageThunkCreator(page))
        },
        addTask: (text) => {
            dispatch(addTaskThunkCreator(text))
        },
        changeNameTask: (text, id)=>{
            dispatch(changeTaskThunkCreator(text,id))
        },
        deleteTask: (id)=>{
            dispatch(deleteTaskTC(id))
        },
        changeCompleted: (id, value) => {
            dispatch(changeCompletedTC(id,value))
        }

    }
}

export default compose<React.ComponentType>(
    connect<MapStateToProps,MapDispatchToProps,{},StateType>(mapStateToProps,mapDispatchToProps)
)(TodoContainer)

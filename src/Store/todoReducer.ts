import {ThunkDispatch} from "redux-thunk";
import {taskApi} from "../API/api";
import {v4 as uuid_v4} from "uuid";

const SET_TASK = 'SET_TASK'
const CHANGE_PAGE = "CHANGE_PAGE"
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const CHANGE_COMPLETED = 'CHANGE_COMPLETED'

export type TaskType = {
    userId: number,
    id:number,
    title:string,
    completed: boolean
}
type StateType = {
    allTask:TaskType[],
    pageTasks: TaskType[],
    sumOfTasks:number
}
const initialState:StateType = {
    allTask: [],
    pageTasks:[],
    sumOfTasks: 0
}

export type ActionType = SetTasksACType |
    ChangePageACType |
    addTaskAC |
    ChangeTaskACType |
    DeleteTaskACType |
    ChangeCompletedACType

const todoReducer = (state = initialState, action:ActionType):StateType => {
    debugger
  switch (action.type){
      case SET_TASK:
          return {
              ...state,
              allTask: action.tasks.reverse(),
              pageTasks: action.tasks.filter((task,index) => index <= 10),
              sumOfTasks: action.tasks.length
          }
      case CHANGE_PAGE:
          return {
              ...state,
              pageTasks: [...state.allTask].filter((task,index) => {
                  if(action.page === 1){
                      return index >= 0 && index <= action.page + 9
                  }else{
                      return index >= action.page * 10 - 10 && index <= action.page * 10
                  }
              })
          }
      case ADD_TASK:
          return {
              ...state,
              allTask: [{userId:1,id: state.allTask[0].id + 1, title:action.text, completed:false} ,...state.allTask],
              sumOfTasks: state.allTask.length
          }
      case CHANGE_TASK:
        return {
            ...state,
            allTask: [...state.allTask].map(task => task.id === action.id ? {...task, title:action.nameTask} : task)
        }
      case DELETE_TASK:
        return {
            ...state,
            allTask: [...state.allTask].filter(task =>  task.id !== action.id ),
            sumOfTasks: state.allTask.length
        }
      case CHANGE_COMPLETED:
          return {
              ...state,
              allTask: [...state.allTask].map(task => task.id === action.id ? {...task,completed:!action.value} : task)
          }
      default:
          return state
  }
}

export default todoReducer

export const setTasksThunkCreator = () => {
    debugger
    return (dispatch: ThunkDispatch<StateType, unknown, ActionType>) => {
        taskApi.getTasks()
            .then(response =>{
                if(response.status === 200){
                    dispatch(setTasksAC(response.data))
                }
            })

    }
}
export const changePageThunkCreator  = (page:number) => {
    return (dispatch: ThunkDispatch<StateType, unknown, ActionType>) => {
        dispatch(changePageAC(page))
    }
}

export const addTaskThunkCreator = (textTask:string) => {
    return (dispatch:ThunkDispatch<StateType, unknown, ActionType>) => {
        dispatch(addTaskAC(textTask))
    }
}

export const changeTaskThunkCreator = (text:string, id:number)=>{
    return (dispatch:ThunkDispatch<StateType, unknown, ActionType>)=>{
        dispatch(changeTaskAC(text,id))
    }
}
export const deleteTaskTC = (id:number) => {
    return (dispatch: ThunkDispatch<StateType, unknown, ActionType>) => {
        dispatch(deleteTaskAC(id))
    }
}

export const changeCompletedTC = (id:number, value:boolean) => {
    return (dispatch:ThunkDispatch<StateType, unknown, ActionType>) => {
            dispatch(changeCompletedAC(id,value))
    }
}


type ChangeCompletedACType = {type: typeof CHANGE_COMPLETED, id:number, value:boolean}
const changeCompletedAC = (id:number,value:boolean):ChangeCompletedACType => {
    return{
        type:CHANGE_COMPLETED,
        id,
        value
    }
}

type DeleteTaskACType = {type: typeof DELETE_TASK, id:number}
const deleteTaskAC = (id:number):DeleteTaskACType=>{
    return{
        type: DELETE_TASK,
        id
    }
}


type ChangeTaskACType = {type: typeof CHANGE_TASK, nameTask:string, id:number}
const changeTaskAC = (nameTask:string, id:number): ChangeTaskACType=>{
    return{
        type: CHANGE_TASK,
        nameTask,
        id
    }
}


type addTaskAC = {type: typeof ADD_TASK, text:string}
const addTaskAC = (text:string):addTaskAC => {
    return{
        type:ADD_TASK,
        text
    }
}

type SetTasksACType = {type: typeof SET_TASK, tasks:TaskType[]}
const setTasksAC = (tasks:TaskType[]):SetTasksACType => {
    return{
        type: SET_TASK,
        tasks
    }
}

type ChangePageACType = {type: typeof CHANGE_PAGE, page:number}
const changePageAC = (page:number):ChangePageACType => {
    return{
        type: CHANGE_PAGE,
        page
    }
}

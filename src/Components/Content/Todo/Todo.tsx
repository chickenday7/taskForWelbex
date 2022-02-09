import {TaskType} from "../../../Store/todoReducer";
import {PageSwitcher} from "./PageSwitcher/PageSwitcher";
import {AddItemForm} from "../../SuperComponents/AddItem";
import {TaskItem} from "./PageSwitcher/TaskItem/TaskItem";
import {Dispatch, SetStateAction} from "react";


type TodoPropsType = {
    pageTasks: TaskType[]
    pagesCount: number
    arrayCount: number[]
    currentPage: number
    errorAdd: boolean
    changePage: (page: number) => void
    addTask: (text: string) => void
    changeNameTask: (text: string, id: number) => void
    deleteTask: (id:number) => void
    changeCompleted:(id:number, value:boolean) => void
    setErrorAdd: Dispatch<SetStateAction<boolean>>

}
export const Todo = (props: TodoPropsType) => {
    return (
        <div className='todoWrapper'>
            <AddItemForm callback={props.addTask} label={'Task'}
                         errorAdd={props.errorAdd} setErrorAdd={props.setErrorAdd}/>


            {props.pageTasks.map((task, index) => {
                return <TaskItem changeCompleted={props.changeCompleted} deleteTask={props.deleteTask} changeNameTask={props.changeNameTask} task={task} />

            })}


            <div className='paginationWrapper'>
                <PageSwitcher arrayCount={props.arrayCount} currentPage={props.currentPage}
                              pagesCount={props.pagesCount}
                              onCurrentPage={props.changePage}
                />
            </div>
        </div>
    )
}

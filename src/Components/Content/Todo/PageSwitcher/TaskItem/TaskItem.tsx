import {ChangeNameForm} from "../../../../SuperComponents/ChangeName";
import {TaskType} from "../../../../../Store/todoReducer";
import React, {MouseEventHandler, useState} from "react";
import del from '../../../../../delete-svgrepo-com.svg'


type TaskItemType = {
    task: TaskType,
    changeNameTask: (text: string, id: number) => void
    deleteTask: (id: number) => void
    changeCompleted:(id:number, value:boolean) => void
}
export const TaskItem = (props: TaskItemType) => {
    let [error, setError] = useState(false)
    const [changeMode, setChangeMode] = useState(false)
    const onDeleteTask = () => {
        props.deleteTask(props.task.id)
    }
    const onChangeMode = () => {
        setChangeMode(true)
    }
    const onChangeCompleted = () => {
      props.changeCompleted (props.task.id, props.task.completed )
    }
    const onChangeNameTask = (titleTask: string, id: number) => {
        titleTask === '' ? setError(true) : props.changeNameTask(titleTask, id)
        setTimeout(()=>{setError(false)},3000)
    }

    return (
        <div key={props.task.id} className='taskWrapper'>
            <div className='taskWrapper__title'>
                <h5>Num task: {props.task.id}</h5>
                <img onClick={onDeleteTask} className='deleteIcon' alt={'delete'} src={del}/>
            </div>

            <div className='taskWrapper__content' >
                <div className='taskValue'>
                    {changeMode
                        ? <ChangeNameForm setError={setError} error={error} callback={onChangeNameTask}
                                          setChangeMode={setChangeMode} name={props.task.title}
                                          taskId={props.task.id}/>
                        : <>
                            <input  type={"checkbox"} checked={props.task.completed} onClick={onChangeCompleted}/>
                            <span className={`taskValue__title ${props.task.completed ? 'activeTask' : 'inactiveTask'}`}
                                  onClick={onChangeMode}>{props.task.title}</span>
                        </>
                    }
                </div>
                <div className='taskNotification'>
                {error && <span>Изменения не были внесены, нельзя ввести пустое значение</span>}
                </div>

            </div>

        </div>
    )
}

import React, {Dispatch, SetStateAction, useState} from "react";


type ChangeNameFormType = {
    callback: (titleName: string, id:number) => void
    setChangeMode: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<boolean>>
    name: string
    taskId:number
    error: boolean
}
export const ChangeNameForm = (props: ChangeNameFormType) => {
    let [name, setName] = useState<string>(props.name)

    const onSpanModeKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && props.callback(name, props.taskId)
        e.key === 'Enter' && props.setChangeMode(false)
    }
    const onSpanModeBlur = () => {
        props.callback(name, props.taskId)
        props.setChangeMode(false)
    }
    const onChangeSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setError(false)
        setName(e.currentTarget.value)
    }
    return (
        <>
            <input  value={name}
                    onChange={onChangeSymbol}
                    onBlur={onSpanModeBlur}
                    onKeyPress={onSpanModeKey}
                    autoFocus={true}
            />
        </>
    )
}

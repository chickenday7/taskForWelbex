import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";


type AddItemFormType = {
    callback: (text: string) => void
    label: string
    errorAdd: boolean
    setErrorAdd: Dispatch<SetStateAction<boolean>>
}

export const AddItemForm = (props: AddItemFormType) => {
    let [notification, setNotification] = useState(false)
    let [name, setName] = useState<string>('')


    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        addSymbol(e.currentTarget.value)
    }
    const addSymbol = (symbol: string) => {
        props.setErrorAdd(false)
        setName(symbol)
    }
    const focusInput = () => {
        setNotification(true)
        props.setErrorAdd(false)
    }
    const onAddItemKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setName('')
            setNotification(false)
        }
        e.key === 'Enter' && props.callback(name)

    }
    return (
        <div className='wrapperAddForm'>
            <input onFocus={focusInput}
                   onBlur={() => {
                       setNotification(false)
                   }}
                   onKeyPress={onAddItemKey}
                   onChange={onChangeInput} value={name} placeholder={`Add ${props.label}`}/>
            {notification && <span>Для добавления задачи нажмите Enter</span>}
            {props.errorAdd && <span>Нельзя добавить пустую задачу</span>}
        </div>
    )
}

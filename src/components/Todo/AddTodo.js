import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Todo.module.css'


function useInputValue(defaultValue = '') {
    const [value, setValue] = useState('')
    return {
        html: {
            value,
            onChange: event => setValue(event.target.value),
        },
        value,
        clear: () => setValue('')
    }
}

function AddTodo({ handleCreate }) {
    const input = useInputValue('')
    
    function handleSubmit(event) {
        event.preventDefault()
        if (input.value.trim()) {
            handleCreate(input.value)
            input.clear()
        }
    }

    return(
        <form className={styles['add-form']} onSubmit={handleSubmit}>
            <input type="text" {...input.html} />
            <button type="submit">Add Todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    handleCreate: PropTypes.func.isRequired
}

export default AddTodo

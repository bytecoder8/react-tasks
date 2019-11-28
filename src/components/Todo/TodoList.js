import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import styles from './Todo.module.css'

function TodoList({ todos, handleToggle }) {
    return (
        <ul className={styles.list}>
            { todos.map((item, index) => (
                <TodoItem item={item} index={index} key={item.id} handleToggle={handleToggle} />
            )) }
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleToggle: PropTypes.func.isRequired
}

export default TodoList

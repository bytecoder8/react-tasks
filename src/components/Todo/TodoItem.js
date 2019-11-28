import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../../context'
import styles from './Todo.module.css'


function TodoItem({ item, index, handleToggle }) {
    const { removeTodo } = useContext(Context)

    const classes = []
    if (item.completed) {
        classes.push(styles['done'])
    }

    return (
        <li className={styles.item}>
            <span className={classes.join(' ')}>
                <input type="checkbox" 
                    className={styles['checkbox']}
                    checked={item.completed ? 'checked' : ''}
                    onChange={ () => handleToggle(item.id) } />
                <strong> {index + 1}</strong>&nbsp;
                { item.title }
            </span>
            <button className={styles['button-close']} onClick={() => removeTodo(item.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        completed: PropTypes.bool,
        title: PropTypes.string
    }).isRequired,
    handleToggle: PropTypes.func.isRequired,
    index: PropTypes.number
}

export default TodoItem

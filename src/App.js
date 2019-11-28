import React, { useState, useEffect } from 'react';
import Context from './context'
import TodoList from './components/Todo/TodoList'
import AddTodo from './components/Todo/AddTodo';
import Loader from './components/Loader';
import Modal from './components/Modal/Modal';


function App() {
  const [todos, setTodos] = useState([
    // {id: 1, completed: false, title: 'Купить хлеб'},
    // {id: 2, completed: true, title: 'Купить масло'},
    // {id: 3, completed: false, title: 'Купить молоко'}
  ])
  const [lastId, setLastId] = useState(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    // .then(response => response.json())
    // .then(json => {
    //   setTodos(json)
    //   setLoading(false)
    // })
    // setLoading(true)
  }, [])

  const toggleItem = (id) => {
    setTodos(todos.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    }))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }
  const addTodo = (title) => {
    const id = lastId + 1
    setLastId(id)
    setTodos([...todos, {
      id,
      title,
      completed: false
    }])
    console.log('add', id)
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="App wrapper">
        <h1>Todo List</h1>
        <Modal>
          Hello, world!
        </Modal>
        <AddTodo handleCreate={addTodo} />
        {todos.length ? (
        <TodoList todos={todos} handleToggle={toggleItem} />
        ) : (
          loading ? <Loader /> : 'No todos'
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TodoProvider} from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
function App() {
const [todos,setTodos]=useState([])

const addTodo=(todo)=>{
 setTodos((prev)=>[{id:Date.now(),...todo},...prev])//we place all the new values in the todos without replacing the entire todos
}

const updateTodo=(id,todo)=>{
  setTodos((prev)=>prev.map(prevTodo=>prevTodo.id===id?todo:prevTodo))
}
 const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!=id))
 }

 //We need to implement a checkmark
 const toggleComplete=(id)=>{
  console.log('hi')
  setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
//Here we match all the todo to find out todo and if it matches then we change the completed to it's complement 
}

//Quering all the todos in the local storage and put then in our website
useEffect(()=>{
 const todos=JSON.parse(localStorage.getItem("todos"))//Since localStorage.getItem("todos") returns a string
   if(todos && todos.length>0){
    setTodos(todos)
   }
},[])

useEffect(()=>{
 localStorage.setItem("todos",JSON.stringify(todos))
},[todos])


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          // use the key attribute to make each div unique
                          // in the long game it heavily damages the performance
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App

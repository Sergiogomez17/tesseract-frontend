 import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios, { Axios } from "axios";
 
function TodoList() {
  const [todos, setTodos] = useState([]);
  const getTodDos= async ()=>{
    const result = await fetch("http://localhost:4000/api/")
    const resultjson = await result.json()
    console.log(resultjson.data)
    setTodos (resultjson.data)
  }
  useEffect(() => {
    //fetch get http.//localhost:400/ap/ gaurdamosla informacion que veine de data
     getTodDos()  
  }, []);

  const addTodo = async (todo) => {
    console.log("here", todo)//text - description (title)
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    const data = {title: todo.title, description: todo.description, dateTime: todo.dateTime}
    const result= await axios.post("http://localhost:4000/api", data ) 
    console.log(result.data.toDo);
    const newtoDo  = result.data.toDo;
    const newTodos = [...todos, newtoDo];

    setTodos(newTodos);
    console.log(...todos);
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

 
  const updateTodo = async (id, newValue) => { 
    console.log("esestoelID", id, "es la DESC",newValue);
    ///actualizacion de datos
    const data =  [...todos].filter((todo) =>  todo.id == updateTodo.id);
    const datosActualizados = {
      title: 'todo.title',
      description: 'todo.description',
    };
    const idDelItem= "...todo.id";
    const url= `http://localhost:4000/api/${id}`;
    const requestOptions = {
      
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados)
    };
    fetch(url, requestOptions)
    .then(response => response.json()
    .then(data => {
      console.log('respuesta del servidor', data);

    })
    .catch(error => { 
      console.error('error al actualizar item', error)
    })
    )
         
      
 
    if (!newValue.title || /^\s*$/.test(newValue.description)) {
      return;
    }
       
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? newValue : item))
    );
  };

  const removeTodo = async(id) => {
     //const url = http://localhost:400/api/${id}
     //fetch delete = = http://localhost:400/api/${id}
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    const result = await fetch(`http://localhost:4000/api/${id}`, {
      method:"DELETE",
      headers:{'Content-Type': 'application/json'},
    });
    const resultjson = await result.json();

    setTodos(removedArr);
  };
 
  const completeTodo = async(id) => {//check de terminado o pendiente
    try {
      const data =  [...todos].filter((todo) =>  todo.id == completeTodo.id);
      const result= await  fetch(`http://localhost:4000/api${id}`, {
        method: "put",
        body: JSON.stringify({...data}),
        headers: {'content-type':'application/json'}
      } )
    
     
      const resultjson = await result.json()
      console.log(resultjson.data);
    setTodos (resultjson.data) ;
      
      let updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      setTodos(updatedTodos);
 
      
    } catch (error) {
      console.log(error)
      
    }
     
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
  }

export default TodoList;

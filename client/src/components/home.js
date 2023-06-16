import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const Home = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [userName, setUserName] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/todos/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { todos, userName } = response.data;
        setTodos(todos);
        setUserName(userName);
      }
    } catch (error) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    console.log('handleLogout');
    // Clear user's session data
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  };

  const onSelectChangeHandler = (event) => {
    console.log(event.target.value);
    if (event.target.value === 'logout') {
      handleLogout();
    } else if (event.target.value === 'profile') {
      {
        return userName;
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('/api/todos', newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const updateTodoStatus = async (todoId, newStatus) => {
    try {
      await axios.put(`/api/todos/${todoId}`, { status: newStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo status:', error);
    }
  };

  const updateTodoTitle = async (todoId, newTitle) => {
    try {
      await axios.put(`/api/todos/${todoId}`, { title: newTitle });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo title:', error);
    }
  };

  const filterTodos = (selectedFilter) => {
    let filteredTodos = [];

    switch (selectedFilter) {
      case 'all':
        filteredTodos = todos;
        break;
      case 'in-progress':
        filteredTodos = todos.filter((todo) => todo.status === 'in-progress');
        break;
      case 'on-hold':
        filteredTodos = todos.filter((todo) => todo.status === 'on-hold');
        break;
      case 'complete':
        filteredTodos = todos.filter((todo) => todo.status === 'complete');
        break;
      default:
        filteredTodos = todos;
    }

    setTodos(filteredTodos);
  };

  return (
    <div className='home-container'>
      <div className='navbar'>
        <div className='navbar-left'>
          <h2>{userName}</h2>
        </div>
        <div className='navbar-right'>
          <select onChange={onSelectChangeHandler}>
            <option value='profile'>Profile{userName}🤵🏻</option>
            <option value='logout' className='logout-button'>
              Logout
            </option>
          </select>
        </div>
      </div>
      <div className='content'>
        <AddTodoForm onAddTodo={addTodo} categories={categories} />
        {todos !== undefined ? (
          <TodoList
            todos={todos}
            onDeleteTodo={deleteTodo}
            onUpdateTodoStatus={updateTodoStatus}
            onUpdateTodoTitle={updateTodoTitle}
            onFilterTodos={filterTodos}
          />
        ) : (
          <p>Loading todos...</p>
        )}
      </div>
    </div>
  );
};

export default Home;

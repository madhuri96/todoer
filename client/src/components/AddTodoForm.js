import React, { useState, useEffect } from 'react';
import './addTodoForm.css';
import axios from 'axios';

const AddTodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    const newTodo = {
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory,
      id: generateRandomId(),
    };
    onAddTodo(newTodo);
    setTitle('');
    setDescription('');
    setSelectedCategory('');
  };

  function generateRandomId() {
    return Math.floor(Math.random() * 1000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>What do you want to do today?</h3>
      <br />
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;

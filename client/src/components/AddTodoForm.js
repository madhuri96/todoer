import React, { useState } from 'react';
import './addTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
    const newTodo = {
      title: title.trim(),
      description: description.trim(),
      id: generateRandomId(),
    };
    onAddTodo(newTodo);
    setTitle('');
    setDescription('');
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
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './categoryForm.css';

const Category = ({ onChange }) => {
  // State variables
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  // Fetch categories from the server
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

  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post('/api/todos/categories', {
        name: newCategory,
      });
      setNewCategory('');
      fetchCategories();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = async (categoryId, newName) => {
    try {
      const response = await axios.put(`/api/todos/categories/${categoryId}`, {
        name: newName,
      });
      const updatedCategories = categories.map((category) => {
        if (category._id === categoryId) {
          return { ...category, name: newName };
        }
        return category;
      });
      setCategories(updatedCategories);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `/api/todos/categories/${categoryId}`
      );
      fetchCategories();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectAll = () => {
    const nextSelectAll = !selectAll;
    const categoryIds = nextSelectAll
      ? categories.map((category) => category._id)
      : [];
    setSelectAll(nextSelectAll);
    setSelectedCategories(categoryIds);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSelectAll(false);
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedCategory) {
        await axios.delete(`/api/todos/categories/${selectedCategory._id}`);
        setSelectedCategory(null);
      }
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='category-container'>
      <h2>Add Category</h2>
      <div className='category-form'>
        <div className='category-row'>
          <label className='category-label'>Category Name</label>
          <input
            type='text'
            value={newCategory}
            onChange={handleInputChange}
            className='category-input'
          />
        </div>
        <div className='form-buttons'>
          <button onClick={handleCreateCategory}>Submit</button>
          <button onClick={() => setNewCategory('')}>Reset</button>
        </div>
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>
        {selectedCategory && (
          <button onClick={handleDeleteSelected} className='delete-selected'>
            Delete
          </button>
        )}
        {categories.map((category) => (
          <div key={category._id} className='category-item'>
            <label>
              <input
                type='Checkbox'
                value={category._id}
                checked={
                  selectedCategory && selectedCategory._id === category._id
                }
                onChange={() => handleCategorySelection(category)}
                className='category-checkbox'
              />
            </label>
            {editingCategoryId === category._id ? (
              <input
                type='text'
                value={editedCategoryName}
                onChange={(event) => setEditedCategoryName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleEditCategory(category._id, editedCategoryName);
                    setEditingCategoryId(null);
                  }
                }}
                className='category-edit-input'
              />
            ) : (
              <label>{category.name}</label>
            )}
            <div className='category-buttons'>
              <button
                onClick={() => {
                  if (editingCategoryId === category._id) {
                    handleEditCategory(category._id, editedCategoryName);
                    setEditingCategoryId(null);
                  } else {
                    setEditingCategoryId(category._id);
                    setEditedCategoryName(category.name);
                  }
                }}
              >
                {editingCategoryId === category._id ? 'Save' : '📝'}
              </button>
              <button onClick={() => handleDeleteCategory(category._id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

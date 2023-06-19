import React, { useState } from 'react';
import axios from 'axios';

const SubtaskCreationDialog = ({
  todoId,
  onSaveSubtask,
  subtask,
  onUpdateSubtask,
  onDeleteSubtask,
}) => {
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    // Check if subtask is defined before updating
    if (!subtask) {
      console.error('Subtask is undefined');
      return;
    }

    axios
      .put(`/api/todos/${subtask.todoId}/subtasks/${subtask.id}`, { title })
      .then((response) => {
        onUpdateSubtask(subtask.id, title);
        setEditMode(false);
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating subtask:', error);
      });
  };

  const handleDelete = () => {
    // Check if subtask is defined before deleting
    if (!subtask) {
      console.error('Subtask is undefined');
      return;
    }

    axios
      .delete(`/api/todos/${subtask.todoId}/subtasks/${subtask.id}`)
      .then((response) => {
        onDeleteSubtask(subtask.id);
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting subtask:', error);
      });
  };

  const handleSave = () => {
    const newSubtask = {
      title: title,
    };

    axios
      .post(`/api/todos/${todoId}/subtasks/`, newSubtask)
      .then((response) => {
        onSaveSubtask(response.data);
        setTitle('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating subtask:', error);
      });
  };

  const handleCancel = () => {
    setTitle('');
    onSaveSubtask(null);
  };

  return (
    <div className='subtask-creation-dialog'>
      <input
        type='text'
        placeholder='Enter subtask title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      <div className='subtask'>
        {editMode ? (
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          subtask && <p>{subtask.title}</p>
        )}
        <div className='subtask-actions'>
          {editMode ? (
            <button onClick={handleUpdate}>Save</button>
          ) : (
            <>
              <button onClick={handleEdit}>📝</button>
              <button onClick={handleDelete}>🗑️</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubtaskCreationDialog;

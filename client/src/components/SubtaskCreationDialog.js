import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubtaskCreationDialog = ({
  todoId,
  onSaveSubtask,
  subtask,
  onDeleteSubtask,
}) => {
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    fetchSubtasks();
  }, []);

  const fetchSubtasks = () => {
    axios
      .get(`/api/todos/${todoId}/subtasks`)
      .then((response) => {
        setSubtasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subtasks:', error);
      });
  };

  const handleDelete = (currsubtask) => {
    // Check if subtask is defined before deleting
    if (!currsubtask) {
      console.error('currsubtask not found');
      return;
    }

    axios
      .delete(`/api/todos/${todoId}/subtasks/${currsubtask._id}`)
      .then(() => {
        // Update the subtasks state by removing the deleted subtask
        const updatedSubtasks = subtasks.filter(
          (st) => st._id !== currsubtask._id
        );
        setSubtasks(updatedSubtasks);

        // Notify the parent component about the delete
        onDeleteSubtask(currsubtask._id);

        console.log('Subtask deleted:', currsubtask._id);
      })
      .catch((error) => {
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
        fetchSubtasks(); // Fetch the updated list of subtasks after saving a new one
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
        {subtasks.map((currsubtask) => (
          <p key={currsubtask.id}>
            {currsubtask.title}
            <button onClick={() => handleDelete(currsubtask)}>🗑️</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SubtaskCreationDialog;

import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Pagination from './Pagination';
import SearchTodo from './SearchTodo';
import FavIcon from './FavIcon';
import SubtaskCreationDialog from './SubtaskCreationDialog';

const TodoList = ({
  todos,
  onDeleteTodo,
  onUpdateTodoStatus,
  onUpdateTodoTitle,
  onFilterTodos,
}) => {
  const [editTodoId, setEditTodoId] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(3);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [bookmarkedTodos, setBookmarkedTodos] = useState([]);
  const [openSubtaskDialogId, setOpenSubtaskDialogId] = useState(null);

  useEffect(() => {
    setFilteredTodos(filterTodos(todos, filter));
  }, [todos, filter]);

  const filterTodos = (todos, filter) => {
    if (filter === 'all') {
      return todos;
    } else {
      return todos.filter((todo) => todo.status.toLowerCase() === filter);
    }
  };

  const handleDelete = (todoId, todoTitle) => {
    const confirmed = window.confirm(
      `You are about to delete the todo "${todoTitle}". If you proceed with this action, the Todoer will permanently delete the todo and recovery is not possible.`
    );
    if (confirmed) {
      onDeleteTodo(todoId);
    }
  };

  const handleEdit = (todoId) => {
    setEditTodoId(todoId);
  };

  const handleUpdateTitle = (event, todoId) => {
    if (event.key === 'Enter') {
      const newTitle = event.target.value;
      onUpdateTodoTitle(todoId, newTitle);
      setEditTodoId('');
    }
  };

  const handleUpdateStatus = (event, todoId) => {
    const newStatus = event.target.value;
    onUpdateTodoStatus(todoId, newStatus);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterTodos(selectedFilter);
  };

  const handleSelectAllChange = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([]);
    } else {
      const allTodoIds = todos.map((todo) => todo.id);
      setSelectedTodos(allTodoIds);
    }
    setSelectAll(!selectAll);
  };

  const handleTodoSelect = (todoId) => {
    if (selectedTodos.includes(todoId)) {
      setSelectedTodos(selectedTodos.filter((id) => id !== todoId));
    } else {
      setSelectedTodos([...selectedTodos, todoId]);
    }
  };

  const handleAction = (action) => {
    if (action === 'delete') {
      const confirmed = window.confirm(
        `You are about to delete ${selectedTodos.length} todos. If you proceed with this action, the Todoer will permanently delete the todos and recovery is not possible.`
      );
      if (confirmed) {
        selectedTodos.forEach((todoId) => onDeleteTodo(todoId));
        setSelectedTodos([]);
        setSelectAll(false);
      }
    } else if (action === 'mark-in-progress') {
      selectedTodos.forEach((todoId) =>
        onUpdateTodoStatus(todoId, 'in-progress')
      );
      setSelectedTodos([]);
      setSelectAll(false);
    } else if (action === 'mark-on-hold') {
      selectedTodos.forEach((todoId) => onUpdateTodoStatus(todoId, 'on-hold'));
      setSelectedTodos([]);
      setSelectAll(false);
    } else if (action === 'mark-complete') {
      selectedTodos.forEach((todoId) => onUpdateTodoStatus(todoId, 'complete'));
      setSelectedTodos([]);
      setSelectAll(false);
    } else if (action === 'favorite') {
      selectedTodos.forEach((todoId) => handleToggleBookmark(todoId));
      setSelectedTodos([]);
      setSelectAll(false);
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (event) => {
    const perPage = parseInt(event.target.value);
    setTodosPerPage(perPage);
    setCurrentPage(1);
  };

  // Pagination calculations
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handleSearch = (searchTerm) => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const handleToggleBookmark = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          bookmarked: !todo.bookmarked,
        };
      }
      return todo;
    });

    const updatedFilteredTodos = filterTodos(updatedTodos, filter);
    setFilteredTodos(updatedFilteredTodos);

    const bookmarks = updatedTodos.filter((todo) => todo.bookmarked);
    setBookmarkedTodos(bookmarks);
  };

  const handleOpenSubtaskDialog = (todoId) => {
    setOpenSubtaskDialogId(todoId);
  };

  const handleCloseSubtaskDialog = () => {
    setOpenSubtaskDialogId(null);
  };

  return (
    <div className='todo-container'>
      <SearchTodo onSearch={handleSearch} />
      <div className='filter-container'>
        <input
          type='checkbox'
          checked={selectedTodos.length === todos.length}
          onChange={handleSelectAllChange}
        />
        <label htmlFor='filter'>Select All</label>
        <select id='filter' value={filter} onChange={handleFilterChange}>
          <option value='all'>All</option>
          <option value='in-progress'>In Progress</option>
          <option value='on-hold'>On Hold</option>
          <option value='complete'>Complete</option>
        </select>

        {selectedTodos.length > 0 && (
          <div>
            <select
              value=''
              onChange={(e) => handleAction(e.target.value)}
              disabled={editTodoId !== ''}
            >
              <option value='' disabled>
                Choose an action
              </option>
              <option value='mark-in-progress'>In Progress</option>
              <option value='mark-on-hold'>On Hold</option>
              <option value='mark-complete'>Complete</option>
              <option value='delete'>Delete</option>
              <option value='favorite'>Favorite</option>
            </select>

            <span>{selectedTodos.length} todos selected</span>
          </div>
        )}
      </div>
      <div className='bookmark-section'>
        {bookmarkedTodos.map((bookmark) => (
          <button key={bookmark.id} onClick={() => console.log(bookmark.title)}>
            Bookmark : {bookmark.title}
          </button>
        ))}
      </div>

      <ul className='todo-list'>
        {currentTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.status.toLowerCase()}`}
          >
            <div className='todo-content'>
              <div className='todo-check'>
                <div>
                  {/* Add button */}
                  <button onClick={() => handleOpenSubtaskDialog(todo._id)}>
                    ➕
                  </button>

                  {/* Subtask dialog */}
                  {openSubtaskDialogId === todo._id && (
                    <div className='subtask-dialog'>
                      <div className='subtask-dialog-content'>
                        <SubtaskCreationDialog
                          todoId={todo._id}
                          subtask={todo.subtasks}
                          subtakId={todo.subtasks._id}
                          onSaveSubtask={(subtask) => {
                            // Handle saving the subtask
                            console.log('Save subtask:', subtask);
                            handleCloseSubtaskDialog();
                          }}
                          onDeleteSubtask={(subtaskId) => {
                            // Handle deleting the subtask
                            console.log('Delete subtask:', subtaskId);
                          }}
                        />
                        <p>{todo.subtasks.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type='checkbox'
                    checked={selectedTodos.includes(todo.id)}
                    onChange={() => handleTodoSelect(todo.id)}
                  />
                </div>
                <div>
                  {editTodoId === todo.id ? (
                    <input
                      type='text'
                      className='todo-title-edit'
                      defaultValue={todo.title}
                      onKeyPress={(event) => handleUpdateTitle(event, todo.id)}
                    />
                  ) : (
                    <h3
                      className={`todo-title ${
                        selectedTodos.includes(todo.id) ? 'highlight' : ''
                      }`}
                    >
                      {todo.title}
                    </h3>
                  )}
                </div>
              </div>
              {/* <p className='todo-description'>{todo.description}</p> */}
              <div className='todo-actions'>
                <div className='actions'>
                  {todo.status !== 'Complete' && (
                    <select
                      className='status-select'
                      value={todo.status}
                      onChange={(event) => handleUpdateStatus(event, todo.id)}
                    >
                      <option value='in-progress'>In Progress</option>
                      <option value='on-hold'>On Hold</option>
                      <option value='complete'>Complete</option>
                    </select>
                  )}
                </div>
                <div className='actions'>
                  <button
                    className='edit-button'
                    onClick={() => handleEdit(todo.id)}
                  >
                    📝
                  </button>
                </div>
                <div className='actions'>
                  <button
                    className='delete-button'
                    onClick={() => handleDelete(todo.id, todo.title)}
                  >
                    🗑️
                  </button>
                </div>
                <div className='actions'>
                  <FavIcon
                    todoId={todo.id}
                    bookmarked={todo.bookmarked}
                    onToggleBookmark={handleToggleBookmark}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default TodoList;

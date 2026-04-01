import React, { useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Handles adding a new task to the array
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(), // Unique ID for the key prop
        text: inputValue
      };
      setTasks([...tasks, newTask]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Filters out the task with the matching ID
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', fontFamily: 'Arial' }}>
      <h2>My Tasks</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
          style={{ padding: '8px', marginRight: '5px' }}
        />
        <button onClick={addTask} style={{ padding: '8px' }}>Add Task</button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '10px', 
            borderBottom: '1px solid #ddd' 
          }}>
            {task.text}
            <button 
              onClick={() => deleteTask(task.id)} 
              style={{ color: 'red', border: 'none', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
    </div>
  );
};

export default TaskList;
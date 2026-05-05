import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  // Fetch data when the page loads
  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    
    const newItem = await response.json();
    setItems([...items, newItem]); // Update UI with the new item
    setText("");
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>Frontend-Backend Bridge</h2>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something..."
      />
      <button onClick={handleSubmit}>Send to Server</button>

      <h3>Items from Server:</h3>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
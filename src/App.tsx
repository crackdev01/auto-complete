import React from 'react';
import './App.css';
import AutoComplete from './AutoComplete';
import options from './data.json';

function App() {
  return (
    <div className="App">
      <div className='App-header'>React Auto Complete Demo</div>
      <div className='App-container'>
        <AutoComplete 
          options={options}
        />
      </div>
    </div>
  );
}

export default App;

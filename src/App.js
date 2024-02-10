import logo from './logo.svg';
import './App.css';
import Board from "./board";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Tic-Tac-Toe</h1>
          <Board/>
      </header>
    </div>
  );
}

export default App;

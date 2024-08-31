import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import SIgnup from "./components/SIgnup";
import Home from "./components/Home";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className='App'>
          <AuthProvider>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SIgnup/>}/>
                <Route path='/' element={<Home/>}/>
            </Routes>
          </AuthProvider>
      </div>
  )
}

export default App;

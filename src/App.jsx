import  NavBar  from '../src/Components/NavBar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
     <>
     <NavBar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup setUser={setUser} setToken={setToken}/>}/>
     </Routes>
     </>
  )
}

export default App;
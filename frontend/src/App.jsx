// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Processos from './pages/Processos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Processos />} />
        <Route path="/home" element={<Home />} />
        {/* Adicione outras rotas conforme precisar */}
      </Routes>
    </Router>
  )
}

export default App

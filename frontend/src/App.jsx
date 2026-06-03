import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routers/AppRoutes'
import BottomNav from './components/BottomNav'
import './App.css'

function App() {

  return (
    <Router>
      <AppRoutes/>
      <BottomNav/>
    </Router>
  )
}

export default App

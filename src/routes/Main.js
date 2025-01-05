import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../pages/App.jsx';
import Register from '../pages/Register.jsx';
import UserDashboard from '../pages/UserDashboard.jsx'; // Componente del menú
import CreatePokemon from '../pages/CreatePokemon.jsx';
import PokemonDetails from '../pages/PokemonDetails.jsx';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/pokenest/create" element={<CreatePokemon />} />
        <Route path="/pokenest/pokedetails" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default Main;
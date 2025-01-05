import React from 'react';
import MenuOption from '../pages/MenuOption.jsx';
import '../styles/UserDashboard.css';
import pokeIcon from '../assets/poke.png';
import huevoIcon from '../assets/egg2.png';
import cloud1 from '../assets/Cloud-1.png';
import cloud2 from '../assets/Cloud-2.png';
import cloud3 from '../assets/Cloud-3.png';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
    return (
      <div className="dashboard-container">
         <div className="background-clouds">
        <img src={cloud1} alt="Cloud 1" className="cloud cloud1" />
        <img src={cloud2} alt="Cloud 2" className="cloud cloud2" />
        <img src={cloud3} alt="Cloud 3" className="cloud cloud3" />
      </div>
        <div className="menu-container">
          <h2 className="menu-title">Menú</h2>
          <div className="menu-options">
            <MenuOption
              icon={pokeIcon}
              label="Mis Pokémon"
              onClick={() => navigate('/pokenest/create')}
            />
            <MenuOption
            icon={huevoIcon}
            label="Adoptar nuevo Pokémon"
            onClick={() => navigate('/pokenest/create')}
          />
                <button
          className="logout-button"
          onClick={() => navigate('/')}
        >
          Salir
        </button>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
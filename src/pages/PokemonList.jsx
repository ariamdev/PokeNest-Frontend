import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PokemonList.css';
import { useNavigate } from 'react-router-dom';

const speciesCardImage = {
    Bulbasaur: require('../assets/card/bulbasaur.png'),
    Ivysaur: require('../assets/card/ivysaur.png'),
    Venusaur: require('../assets/card/venusaur.png'),
    Charmander: require('../assets/card/charmander.png'),
    Charmeleon: require('../assets/card/charmeleon.png'),
    Charizard: require('../assets/card/charizard.png'),
    Squirtle: require('../assets/card/squirtle.png'),
    Wartortle: require('../assets/card/wartortle.png'),
    Blastoise: require('../assets/card/blastoise.png'),
    Eevee: require('../assets/card/eevee.png'),
    Vaporeon: require('../assets/card/vaporeon.png'),
    Jolteon: require('../assets/card/jolteon.png'),
    Flareon: require('../assets/card/flareon.png'),
    Espeon: require('../assets/card/espeon.png'),
    Umbreon: require('../assets/card/umbreon.png'),
    Leafeon: require('../assets/card/leafeon.png'),
    Glaceon: require('../assets/card/glaceon.png'),
    Sylveon: require('../assets/card/sylveon.png'),
};

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('/pokenest/getUserPoke', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Utiliza el token almacenado
          },
        });
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list-box">
        <div className="pokemon-title-box">
        <div className="navigation-header">
            <a href="/user-dashboard" className="navigation-link">
            Menú
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
            >
                <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h10.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L12.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
            </svg>
            </a>
        </div>
            <h1 className="pokemon-list-title">Mis Pokémon</h1>
            <div className="separator-line"></div>
         </div>
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
                onClick={() => navigate(`/pokenest/getOne/${pokemon.id}`)}
            >
            <div className="pokemon-card-content">
                <div className="pokemon-image-wrapper">
                    <img
                    src={speciesCardImage[pokemon.species]}
                    alt={pokemon.species}
                    className="pokemon-image"
                    />
                    <div className="pokemon-image-background"></div>
                </div>
              <div className="pokemon-info">
              <div className="pokemon-header">
                    <h3 className="pokemon-alias">{pokemon.alias || pokemon.species}</h3>
                    <span className="pokemon-level"> Nv. {pokemon.lvl}</span>
                </div>
                <div className="pokemon-stats">
                  <div className="progress-bar-container">
                    <div className="progress-bar-text">HP</div>
                    <div
                      className="progress-bar"
                      style={{ width: `${pokemon.ph}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-text">EX</div>
                    <div
                      className="progress-bar"
                      style={{ width: `${pokemon.experience}%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                    </svg>
                    </div>
                    <div
                      className="progress-bar"
                      style={{ width: `${pokemon.happiness}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;

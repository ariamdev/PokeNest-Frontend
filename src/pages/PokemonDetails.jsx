import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PokemonDetails.css';
import { useLocation } from 'react-router-dom';
import pokeIcon from '../assets/poke.png';
import logo from '../assets/logo.png';

const speciesImages = {
    Bulbasaur: require('../assets/pokemon/bulbasaur.gif'),
    Charmander: require('../assets/pokemon/charmander.gif'),
    Squirtle: require('../assets/pokemon/squirtle.gif'),
    Eevee: require('../assets/pokemon/eevee.gif'),
    Vaporeon: require('../assets/pokemon/vaporeon.gif'),
    Jolteon: require('../assets/pokemon/jolteon.gif'),
    Flareon: require('../assets/pokemon/flareon.gif'),
    Espeon: require('../assets/pokemon/espeon.gif'),
    Umbreon: require('../assets/pokemon/umbreon.gif'),
    Leafeon: require('../assets/pokemon/leafeon.gif'),
    Glaceon: require('../assets/pokemon/glaceon.gif'),
    Sylveon: require('../assets/pokemon/sylveon.gif'),
};

const locationBackgrounds = {
    CAVE: require('../assets/locations/cave.png'),
    FOREST: require('../assets/locations/forest.png'),
    LAKE: require('../assets/locations/lake.png'),
    BEACH: require('../assets/locations/beach.png'),
    SNOW: require('../assets/locations/snow.png'),
    POKECENTER: require('../assets/locations/pokecenter.png'),
    NOLIGHT: require('../assets/locations/nolight.png'),
    EXPLORE: require('../assets/locations/explore.png'),
};

const PokemonDetails = () => {
    const location = useLocation();
    const pokemon = location.state?.pokemon;

    if (!pokemon) return <p>No se proporcionaron detalles del Pokémon.</p>;

    const speciesImage = speciesImages[pokemon.species]; 
    const locationBackground = locationBackgrounds[pokemon.location];

    return (
        <div className="pokemon-details-container">
            <div className="poke-details-box">
            <div className="navigation-header">
            <a href="/getUserPoke" className="navigation-link">
        Mis Pokémon
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
            <div className="rectangle">
    <ul className="interactions-list">
        {["Alimentar", "Dormir", "Jugar", "Entrenar", "Explorar", "Curar","Eliminar Pokémon"].map((option, index) => (
            <li key={index} className="interaction-item">
                <span className="interaction-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-play-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                </span>
                {option}
            </li>
        ))}
    </ul>
            </div>
            <img src={logo} alt="Logo" className="logo-image" />
                <div className="pokemon-details-content">
                
                <div className="pokemon-alias-container">
                    <img src={pokeIcon} alt="Poke Icon" className="poke-icon" />
                    <span className="pokemon-alias">{pokemon.alias}</span>
                    <span className="separator">-</span>
                    <p className="pokemon-level"><span>Nv. </span> {pokemon.lvl}</p>
                </div>
                    {/* Imagen central basada en la especie */}
                    {speciesImage && (
                        <div
                            className="pokemon-image-container"
                            style={{
                                backgroundImage: `url(${locationBackground})`, // Fondo dinámico
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <img
                                src={speciesImage}
                                alt={pokemon.species}
                                className="pokemon-species-image"
                            />
                        </div>
                    )}
                    
                    <div className="ph-bar-container">
                        <div className="ph-bar-text">PH</div>
                        <div
                            className="ph-bar"
                            style={{ width: `${pokemon.ph}%` }} // Ajusta el ancho según el porcentaje de PH
                        ></div>
                    </div>
                    <div className="ph-bar-container">
                        <div className="exp-bar-text">EX</div>
                        <div
                            className="exp-bar"
                            style={{ width: `${pokemon.experience}%` }} // Ajusta el ancho según el porcentaje de PH
                        ></div>
                    </div>
                    <div className="happ-bar-container">
                        <div className="happ-bar-text">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
                    </svg>
                    </div>
                        <div
                            className="happ-bar"
                            style={{ width: `${pokemon.happiness}%` }} // Ajusta el ancho según el porcentaje de PH
                        ></div>
                    </div>
                </div>
             
            </div>
        </div>
    );
};

PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        alias: PropTypes.string.isRequired,
        species: PropTypes.string.isRequired,
        lvl: PropTypes.number.isRequired,
        experience: PropTypes.number.isRequired,
        happiness: PropTypes.number.isRequired,
        ph: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
    }),
};

export default PokemonDetails;
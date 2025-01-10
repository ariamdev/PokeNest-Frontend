import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/PokemonDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import pokeIcon from '../assets/poke.png';
import logo from '../assets/logo.png';
import axios from 'axios';

const typeImages = {
    Normal: require('../assets/types/normal.gif'),
    Agua: require('../assets/types/agua.gif'),
    Eléctrico: require('../assets/types/electrico.gif'),
    Fuego: require('../assets/types/fuego.gif'),
    Psíquico: require('../assets/types/psiquico.gif'),
    Siniestro: require('../assets/types/siniestro.gif'),
    Planta: require('../assets/types/planta.gif'),
    Hielo: require('../assets/types/hielo.gif'),
    Hada: require('../assets/types/hada.gif'),
    Volador: require('../assets/types/volador.gif'),
    Veneno: require('../assets/types/veneno.gif'),
};

const speciesImages = {
    Bulbasaur: require('../assets/pokemon/bulbasaur.gif'),
    Ivysaur: require('../assets/pokemon/ivysaur.gif'),
    Venusaur: require('../assets/pokemon/venusaur.gif'),
    Charmander: require('../assets/pokemon/charmander.gif'),
    Charmeleon: require('../assets/pokemon/charmeleon.gif'),
    Charizard: require('../assets/pokemon/charizard.gif'),
    Squirtle: require('../assets/pokemon/squirtle.gif'),
    Wartortle: require('../assets/pokemon/wartortle.gif'),
    Blastoise: require('../assets/pokemon/blastoise.gif'),
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
    BEACH: require('../assets/locations/beach1.jpg'),
    SNOW: require('../assets/locations/snow.png'),
    POKECENTER: require('../assets/locations/PokeCenter2.png'),
    NOLIGHT: require('../assets/locations/nolight.png'),
    EXPLORE: require('../assets/locations/explore.png'),
    BATTLEGROUND: require('../assets/locations/battleground.png'),
    EVOLUTION: require('../assets/locations/evolution.png')
};

const trainingImages = {
    Bulbasaur: require('../assets/training/bulbasaur-attack.gif'),
    Ivysaur: require('../assets/training/ivysaur-attack.gif'),
    Venusaur: require('../assets/pokemon/venusaur.gif'),
    Charmander: require('../assets/training/charmander-attack.gif'),
    Charmeleon: require('../assets/training/charmeleon-attack.gif'),
    Charizard: require('../assets/training/charizard-attack2.gif'),
    Squirtle: require('../assets/training/squirtle-attack.gif'),
    Wartortle: require('../assets/training/wartortle-attack.gif'),
    Blastoise: require('../assets/training/blastoise-attack.gif'),
    Eevee: require('../assets/training/eevee-attack.gif'),
    Vaporeon: require('../assets/training/vaporeon-attack.gif'),
    Jolteon: require('../assets/pokemon/jolteon.gif'),
    Flareon: require('../assets/training/flareon-attack.gif'),
    Espeon: require('../assets/pokemon/espeon.gif'),
    Umbreon: require('../assets/pokemon/umbreon.gif'),
    Leafeon: require('../assets/training/leafeon-attack.gif'),
    Glaceon: require('../assets/training/glaceon-attack.gif'),
    Sylveon: require('../assets/pokemon/sylveon.gif'),
};

const explorationImages = {
    Bulbasaur: require('../assets/explore/bulbasaur.gif'),
    Ivysaur: require('../assets/explore/ivysaur.gif'),
    Venusaur: require('../assets/explore/venusaur.gif'),
    Charmander: require('../assets/explore/charmander.gif'),
    Charmeleon: require('../assets/explore/charmaleon.gif'),
    Charizard: require('../assets/explore/chaizard.gif'),
    Squirtle: require('../assets/explore/squirtle.gif'),
    Wartortle: require('../assets/explore/wartortle.gif'),
    Blastoise: require('../assets/explore/blastoise.gif'),
    Eevee: require('../assets/explore/eevee.gif'),
    Vaporeon: require('../assets/explore/vaporeon.gif'),
    Jolteon: require('../assets/explore/jolteon.gif'),
    Flareon: require('../assets/explore/flareon.gif'),
    Espeon: require('../assets/explore/espeon.gif'),
    Umbreon: require('../assets/explore/umbreon.gif'),
    Leafeon: require('../assets/explore/leafon.gif'),
    Glaceon: require('../assets/explore/glaceon.gif'),
    Sylveon: require('../assets/explore/espeon.gif'),
};

const sleepingImages = {
    Bulbasaur: require('../assets/sleep/bulbasaur-sleep.png'),
    Ivysaur: require('../assets/sleep/ivysaur-sleep.png'),
    Venusaur: require('../assets/sleep/venusaur-sleep.png'),
    Charmander: require('../assets/sleep/charmander-sleep.png'),
    Charmeleon: require('../assets/sleep/charmaleon-sleep.png'),
    Charizard: require('../assets/sleep/chaizard-sleep.png'),
    Squirtle: require('../assets/sleep/squirtel-sleep.png'),
    Wartortle: require('../assets/sleep/wartortle-sleep.png'),
    Blastoise: require('../assets/sleep/blastoise-sleep.png'),
    Eevee: require('../assets/sleep/Eevee-sleep.png'),
    Vaporeon: require('../assets/sleep/vaporeon-sleep.png'),
    Jolteon: require('../assets/sleep/jolteon-sleep.png'),
    Flareon: require('../assets/sleep/flareon-sleep.png'),
    Espeon: require('../assets/sleep/espeon-sleep.png'),
    Umbreon: require('../assets/sleep/umbreon-sleep.png'),
    Leafeon: require('../assets/sleep/leafeon-sleep.png'),
    Glaceon: require('../assets/sleep/glaceon-sleep.png'),
    Sylveon: require('../assets/sleep/sylveon-sleep.png'),
};

const interactionMap = {
    Alimentar: { action: "FEED", endpoint: "/pokenest/update" },
    Dormir: { action: "SLEEP", endpoint: "/pokenest/update" },
    Jugar: { action: "PLAY", endpoint: "/pokenest/update" },
    Entrenar: { action: "TRAIN", endpoint: "/pokenest/update" },
    Explorar: { action: "EXPLORE", endpoint: "/pokenest/update" },
    Curar: { action: "HEAL", endpoint: "/pokenest/update" },
    "Eliminar Pokémon": { action: null, endpoint: "/pokenest/delete" },
};


const PokemonDetails = () => {
    const location = useLocation();
    const pokemon = location.state?.pokemon;
    const navigate = useNavigate();
    const [currentPokemon, setCurrentPokemon] = useState(pokemon);
    const [temporaryBackground, setTemporaryBackground] = useState(locationBackgrounds[pokemon.location]);
    const [temporaryImage, setTemporaryImage] = useState(speciesImages[pokemon.species]);
    const [isSleeping, setIsSleeping] = useState(currentPokemon.sleeping || false);
    const [isEating, setIsEating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHealing, setIsHealing] = useState(false);
    const [isEvolving, setIsEvolving] = useState(false);
    const [evolutionTarget, setEvolutionTarget] = useState("");
    const [errorMessage, setErrorMessage] = useState("");     
    
    const renderEvolutionModal = () => (
        <div className="evolution-modal">
            <h3>Selecciona la Evolución</h3>
            <select
                value={evolutionTarget}
                onChange={(e) => setEvolutionTarget(e.target.value)}
            >
                <option value="">Selecciona una evolución...</option>
                <option value="Vaporeon">Vaporeon</option>
                <option value="Jolteon">Jolteon</option>
                <option value="Flareon">Flareon</option>
                <option value="Espeon">Espeon</option>
                <option value="Umbreon">Umbreon</option>
                <option value="Leafeon">Leafeon</option>
                <option value="Glaceon">Glaceon</option>
                <option value="Sylveon">Sylveon</option>
            </select>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p> 
            )}
            <button onClick={handleEvolution}>Confirmar</button>
            <button onClick={() => setIsEvolving(false)}>Cancelar</button>
        </div>
    );
   
    
    const handleEvolution = async () => {
        if (!evolutionTarget) {
            setErrorMessage("Por favor, selecciona una evolución.");
            return;
        }
        setErrorMessage("");
    
        const confirmEvolution = window.confirm(
            `¿Estás seguro de que deseas evolucionar a Eevee a ${evolutionTarget}? Esta acción es irreversible.`
        );
        if (!confirmEvolution) return;
    
        try {
          
            const url = `/pokenest/update/eev?targetSpecies=${evolutionTarget}`;
            const data = { id: currentPokemon.id };
            const response = await axios.post(url, data);
            const updatedPokemon = response.data;

            setTemporaryBackground(locationBackgrounds.EVOLUTION);
            setTemporaryImage(speciesImages[updatedPokemon.species]);

            const pokemonImage = document.querySelector(".pokemon-species-image");
            if (pokemonImage) {
                pokemonImage.classList.add("pokemon-fade-in");
            }
    
            setTimeout(() => {
                setTemporaryBackground(locationBackgrounds[updatedPokemon.location]);
                setTemporaryImage(speciesImages[updatedPokemon.species]);
                setCurrentPokemon(updatedPokemon); 
    
                if (pokemonImage) {
                    pokemonImage.classList.remove("pokemon-fade-in");
                }
    
                setIsEvolving(false); 
            }, 2000); 
        } catch (error) {
            console.error("Error al evolucionar el Pokémon:", error);
            alert("No se pudo evolucionar al Pokémon. Inténtalo nuevamente.");
        }
    };

    const handleInteraction = async (interaction) => {

        if (isSleeping) {
            alert("Tu Pokémon está durmiendo y no puede realizar otras acciones hasta que se despierte.");
            return;
        }

        try {
            const { action, endpoint } = interactionMap[interaction];

            
            const url = action ? `${endpoint}?petInteraction=${action}` : endpoint;
            const data = { id: currentPokemon.id }; 

            if (interaction === "Eliminar Pokémon") {
                const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este Pokémon?");
                if (!confirmDelete) {
                    return;
                }
    
                try {
                    await axios.delete('/pokenest/delete', { data: { id: currentPokemon.id } });
                    navigate('/user-dashboard');
                } catch (error) {
                    console.error("Error al eliminar el Pokémon:", error);
                    alert("No se pudo eliminar el Pokémon. Inténtalo nuevamente.");
                }
            }

            const response = await axios.post(url, data);
            const updatedPokemon = response.data; 

            if (updatedPokemon.species !== currentPokemon.species) {
                setTemporaryBackground(locationBackgrounds.EVOLUTION);
                setTemporaryImage(speciesImages[updatedPokemon.species]);

                const pokemonImage = document.querySelector(".pokemon-species-image");

            if (pokemonImage) {
                pokemonImage.classList.add("pokemon-fade-in");
            }
    
            setTimeout(() => {
                setTemporaryBackground(locationBackgrounds[updatedPokemon.location]);
                setTemporaryImage(speciesImages[updatedPokemon.species]);
                setCurrentPokemon(updatedPokemon); 
    
               
                if (pokemonImage) {
                    pokemonImage.classList.remove("pokemon-fade-in");
                }
    
                setIsEvolving(false); 
            }, 2000);
            }

            if (interaction === "Alimentar") {
                setIsEating(true); 

                setTimeout(() => {
                    setIsEating(false);
                }, 10000); 
            }

            if (interaction === "Dormir") {
                setIsSleeping(true); 
                setTemporaryImage(sleepingImages[currentPokemon.species]);
            
                setTimeout(() => {
                    setIsSleeping(false);
                    setTemporaryImage(speciesImages[currentPokemon.species]);
                }, 10000);
            }

            if (interaction === "Jugar") {
                setIsPlaying(true); 

                setTimeout(() => {
                    setIsPlaying(false);
                }, 10000); 
            }

            if (interaction === "Entrenar") {
                setTemporaryBackground(locationBackgrounds.BATTLEGROUND);
                setTemporaryImage(trainingImages[currentPokemon.species]); 
            
              
                setTimeout(() => {
                    setTemporaryBackground(locationBackgrounds[currentPokemon.location]); 
                    setTemporaryImage(speciesImages[currentPokemon.species]);
                }, 6000); 
            }

            if (interaction === "Explorar") {
                setTemporaryBackground(locationBackgrounds.EXPLORE);          
                setTemporaryImage(explorationImages[currentPokemon.species]);
            
             
                setTimeout(() => {
                    setTemporaryBackground(locationBackgrounds[currentPokemon.location]);
                    setTemporaryImage(speciesImages[currentPokemon.species]);
                }, 6000); 
            }

            if (interaction === "Curar") {
               
                setTemporaryBackground(locationBackgrounds.POKECENTER);
                setTemporaryImage(require('../assets/poke.png'));
                setIsHealing(true); 
            
                setTimeout(() => {
                    setTemporaryBackground(locationBackgrounds[currentPokemon.location]); 
                    setTemporaryImage(speciesImages[currentPokemon.species]); 
                    setIsHealing(false); 
                }, 6000); 
            }

          

        setCurrentPokemon(updatedPokemon);
        console.log("Respuesta del backend:", response.data);
        
        } catch (error) {
            if (error.response && error.response.data.includes("The pet is sleeping")) {
                alert("El Pokémon está durmiendo. No puede realizar otras acciones hasta que se despierte.");
                setIsSleeping(true);
            } else {
                alert(`No se pudo realizar ${interaction}.`);
            }
        }
    };


    return (
        <div className="pokemon-details-container">
            <div className="poke-details-box">
            <div className="navigation-header">
            <a href="/pokenest/getUserPoke" className="navigation-link">
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
            {currentPokemon.species === "Eevee" && (
            <li
                className="interaction-item"
                onClick={() => setIsEvolving(true)}
            >
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
                Evolucionar
            </li>
        )}
        {isEvolving && renderEvolutionModal()}  
        {Object.keys(interactionMap).map((option, index) => (
            <li
                key={index}
                className="interaction-item"
                onClick={() => handleInteraction(option)}
            >
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
                    <span className="pokemon-alias">{currentPokemon.alias}</span>
                    <span className="separator">-</span>
                    <p className="pokemon-level"><span>Nv. </span> {currentPokemon.lvl}</p>
                </div>
                <div className="pokemon-types-container">
                        {currentPokemon.types &&
                            currentPokemon.types.map((type, index) => (
                                <img
                                    key={index}
                                    src={typeImages[type.trim()]} // Asegura que el tipo coincida con las claves
                                    alt={type}
                                    className="type-image"
                                />
                            ))}
                    </div>
                {temporaryImage && (
                        <div
                            className="pokemon-image-container"
                            style={{
                                backgroundImage: `url(${temporaryBackground})`, // Fondo dinámico
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <img 
                             src={temporaryImage}
                             alt={currentPokemon.species}
                             className={`pokemon-species-image ${
                                temporaryImage === sleepingImages[currentPokemon.species]
                                ? "sleeping-image"
                                : temporaryImage === trainingImages[currentPokemon.species]
                                ? "training-image"
                                : temporaryImage === explorationImages[currentPokemon.species]
                                ? "exploration-image"
                                : temporaryImage === require('../assets/poke.png')
                                ? "heal-image"
                                : "default-image"
                            }`}
                        />
                         {isEating && (
                        <div className="eating-gif-container">
                            <img src={require('../assets/emojis/yummy.png')} alt="Comiendo" className="eating-gif" />
                        </div>
                        )}
                          {isPlaying && (
                        <div className="playing-gif-container">
                            <img src={require('../assets/emojis/heart.png')} alt="Jugando" className="playing-gif" />
                        </div>
                        )}
                          {temporaryImage === sleepingImages[currentPokemon.species] && (
                    <div className="sleeping-gif-container">
                        <img src={require('../assets/emojis/sleep.gif')} alt="Durmiendo" className="sleeping-gif" />
                    </div>
                        )}
                        {isHealing && (
                    <div className="healing-gif-container">
                        <img src={require('../assets/emojis/heart.png')} alt="Curando" className="healing-gif" />
                    </div>
                        )}
                        </div>
                    )}   
                                  
                                       
                    <div className="ph-bar-container">
                        <div className="ph-bar-text">PH</div>
                        <div
                            className="ph-bar"
                            style={{ width: `${currentPokemon.ph}%` }} // Ajusta el ancho según el porcentaje de PH
                        ></div>
                    </div>
                    <div className="ph-bar-container">
                        <div className="exp-bar-text">EX</div>
                        <div
                            className="exp-bar"
                            style={{ width: `${currentPokemon.experience}%` }} // Ajusta el ancho según el porcentaje de PH
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
                            style={{ width: `${currentPokemon.happiness}%` }} // Ajusta el ancho según el porcentaje de PH
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
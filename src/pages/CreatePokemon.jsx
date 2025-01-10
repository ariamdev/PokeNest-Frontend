import React, { useState} from 'react';
import axios from 'axios';
import '../styles/CreatePokemon.css';
import nestImage from '../assets/nest.png'
import { useNavigate } from 'react-router-dom';

// Configurar el interceptor de Axios para incluir el token en las solicitudes
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Recupera el token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el encabezado Authorization
    }
    return config;
});

const CreatePokemon = () => {
    const [alias, setAlias] = useState("");
    const [species, setSpecies] = useState("");
    const [createdPokemon, setCreatedPokemon] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleCreatePokemon = async () => {
        if (!alias || !species) {
            alert("Por favor, completa todos los campos.");
            return;
        }
    
        try {
            const response = await axios.post("/pokenest/create", {
                alias,
                speciesName: species,
            });
    
    
            if (response.data && response.data.id) {
                setCreatedPokemon(response.data);
                navigate(`/pokenest/pokedetails`, { state: { pokemon: response.data } });
            } else {
                alert("Error: el backend no devolvió un ID válido.");
            }
        } catch (error) {
            console.error("Error al crear el Pokémon:", error);
            if (error.response) {
                console.log("Respuesta del backend:", error.response.data);
                if (error.response.status === 409) {
                    setErrorMessage(error.response.data); 
                } else {
                    alert("Error del servidor: " + error.response.data);
                }
            } else {
                alert("Hubo un problema al conectar con el servidor.");
            }
        }
    };

    return (
        <div className="create-pokemon-container">
            <div className="background-image">
                <div className="main-box">
                    <h1 className="main-title">¡Has adoptado un nuevo Pokemon!</h1>
                    <div className="content">
                        <div className="image-container">
                            <img src={nestImage} alt="Nest" className="nest-image" />
                        </div>
                        <div className="side-rectangle">
                            <form className="alias-form">
                                <label htmlFor="alias" className="alias-label">Su nombre es </label>
                                <input
                                    type="text"
                                    id="alias"
                                    name="alias"
                                    className="alias-input"
                                    placeholder="Escribe el nombre de tu pokemon..."
                                    value={alias}
                                    onChange={(e) => {
                                        setAlias(e.target.value);
                                        setErrorMessage(""); 
                                    }}
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <p className="attention-text">
                                    *Atención, una vez le asignes un nombre a tu mascota no se podrá cambiar.
                                </p>
                            </form>
                            <form className="species-form">
                                <label htmlFor="species" className="species-label">Y su especie será...</label>
                                <select
                                    id="species"
                                    name="species"
                                    className="species-select"
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}
                                >
                                    <option value="">Selecciona una especie...</option>
                                    <option value="Bulbasaur">Bulbasaur</option>
                                    <option value="Charmander">Charmander</option>
                                    <option value="Squirtle">Squirtle</option>
                                    <option value="Eevee">Eevee</option>
                                    <option value="Vaporeon">Vaporeon</option>
                                    <option value="Jolteon">Jolteon</option>
                                    <option value="Flareon">Flareon</option>
                                    <option value="Espeon">Espeon</option>
                                    <option value="Umbreon">Umbreon</option>
                                    <option value="Leafeon">Leafeon</option>
                                    <option value="Glaceon">Glaceon</option>
                                    <option value="Sylveon">Sylveon</option>
                                </select>
                            </form>
                            <button 
                                className="create-button" 
                                onClick={handleCreatePokemon}>
                                Crear Pokémon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePokemon;

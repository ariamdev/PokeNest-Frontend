import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PokemonDetails.css';


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


const GetOne = () => {
    const { id } = useParams(); // Obtén el ID desde la URL
    const navigate = useNavigate();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        if (!id) {
            setError('No se proporcionó un ID de Pokémon válido.');
            return;
        }

        const fetchPokemonDetails = async () => {
            try {
                console.log(`Fetching details for ID: ${id}`);
                const response = await axios.get(`/pokenest/getOne/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('Response data:', response.data);
                setPokemonDetails(response.data);
            } catch (err) {
                console.error('Error fetching Pokémon details:', err);
                setError('Error al cargar los detalles del Pokémon.');
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!pokemonDetails) {
        return <div>Cargando detalles del Pokémon...</div>;
    }

    const pokemonImage = speciesImages[pokemonDetails.species];

    return (
        <div className="pokemon-details-container">
            <h1>{pokemonDetails.alias || pokemonDetails.species}</h1>
            <img
                src={pokemonImage}
                alt={pokemonDetails.species || 'Pokémon desconocido'}
            />
            <p>Especie: {pokemonDetails.species}</p>
            <p>Nivel: {pokemonDetails.lvl}</p>
            <p>HP: {pokemonDetails.ph}</p>
            <p>Experiencia: {pokemonDetails.experience}</p>
            <p>Felicidad: {pokemonDetails.happiness}</p>
            <p>Ubicación: {pokemonDetails.location}</p>
            <button onClick={() => navigate('/pokenest/getUserPoke')}>Volver</button>
        </div>
    );
};

export default GetOne;
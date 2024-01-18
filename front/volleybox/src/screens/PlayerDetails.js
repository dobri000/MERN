import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../screens/PlayerDetails.css';
import Navigator from '../components/Navigator';

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const navigation = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
            };
            try {
                const response = await fetch(`http://localhost:8080/player/${playerId}`, options); // Prilagodite putanju za dohvat podataka
                if (response.ok) {
                    const data = await response.json();
                    setPlayer(data); // Postavite podatke o igraču u stanje komponente
                } else {
                    console.error('Neuspešan zahtev za podacima o igraču.');
                }
            } catch (error) {
                console.error('Greška prilikom dohvatanja podataka o igraču:', error);
            }
        };

        fetchData();
    }, [playerId]);

    const deletePlayer = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            },
        };
        try {
            const response = await fetch(`http://localhost:8080/player/${playerId}`, options); // Prilagodite putanju za dohvat podataka
            if (response.ok) {
                navigation('/player-page');
            } else {
                console.error('Neuspešan zahtev za brisanje igraca.');
            }
        } catch (error) {
            console.error('Greška prilikom brisanja igraca:', error);
        }
    }

    const updatePlayer = () => {
        console.log(player);
        sessionStorage.setItem('player', JSON.stringify(player));
        navigation("/update-player")
    }

    if (!player) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navigator />
            <div className="player-details">
                <h1>Player details</h1>

                {/* Dugmad za ažuriranje i brisanje */}
                <div className="action-buttons">
                    <button className="update-button" onClick={updatePlayer}>Update Player</button>
                    <button className="delete-button" onClick={deletePlayer}>Delete Player</button>
                </div>

                <div className="player-info">
                    <div className="player-image">
                        <img src={`/images/${player.photo}`} alt={`${player.firstname} ${player.lastname}`} />
                    </div>
                    <div className="details">
                        <p>Firstname: {player.firstname}</p>
                        <p>Lastname: {player.lastname}</p>
                        <p>Date of birth: {new Date(player.birthdate).toLocaleDateString()}</p>
                        <p>Height: {player.height} cm</p>
                        <p>Weight: {player.weight} kg</p>
                        <p>Spike: {player.spike} cm</p>
                        <p>Block: {player.block} cm</p>
                        <p>Dominant hand: {player.dominantHand}</p>
                        <p>Nationality: {player.nationality}</p>
                        <p>Team: <Link to={`/team/${player.team._id}`}>{player.team.teamName}</Link></p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PlayerDetails;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TeamDetails.css';
import Navigator from '../components/Navigator';

const TeamDetails = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
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
                const response = await fetch(`http://localhost:8080/team/${teamId}`, options); // Prilagodite putanju za dohvat podataka
                if (response.ok) {
                    const data = await response.json();
                    setTeam(data); // Postavite podatke o igraču u stanje komponente
                } else {
                    console.error('Neuspešan zahtev za podacima o timu.');
                }
            } catch (error) {
                console.error('Greška prilikom dohvatanja podataka o timu:', error);
            }
        };

        fetchData();
    }, [teamId]);

    const deleteteam = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            },
        };
        try {
            const response = await fetch(`http://localhost:8080/team/${teamId}`, options); // Prilagodite putanju za dohvat podataka
            if (response.ok) {
                navigation('/team-page');
            } else {
                console.error('Neuspešan zahtev za brisanje tima.');
            }
        } catch (error) {
            console.error('Greška prilikom brisanja tima:', error);
        }
    }

    const updateTeam = () => {
        sessionStorage.setItem('team', JSON.stringify(team));
        navigation('/update-team');
    }

    if (!team) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navigator />
            <div className="team-details">
                <h1>Team details</h1>

                {/* Dugmad za ažuriranje i brisanje */}
                <div className="action-buttons">
                    <button className="update-button" onClick={updateTeam}>Update team</button>
                    <button className="delete-button" onClick={deleteteam}>Delete team</button>
                </div>

                <div className="team-info">
                    <div className="team-image">
                        <img src={`/images/${team.logo}`} alt={`${team.teamName}`} />
                    </div>
                    <div className="details">
                        <p>Team name: {team.teamName}</p>
                        <p>Founded: {team.founded}</p>
                        <p>Country: {team.country}</p>
                        <p>Hall: {team.hall}</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TeamDetails;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddPlayer.css';
import Navigator from '../components/Navigator';
import {format} from 'date-fns';

const UpdatePlayer = () => {
    const location = useLocation();
    const player = JSON.parse(sessionStorage.getItem('player'));
    const [formData, setFormData] = useState({
        _id: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        height: '',
        weight: '',
        spike: '',
        block: '',
        dominantHand: '',
        nationality: '',
        photo: '',
        team: ''
    });
    const [teams, setTeams] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const navigation = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('player')) {
            navigation('/player-page');
        }
        console.log(JSON.stringify(player));
        setFormData(player);

        

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        };
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/team/all`, options);
                if (response.ok) {
                    const data = await response.json();
                    setTeams(data); // Postavljamo dobijene nacionalnosti u stanje
                }
            } catch (error) {
                console.error('Greška prilikom preuzimanja timova:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBirthdateChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            birthdate: new Date(value)
        })
        setCurrentDate()
        
    }

    const handleTeamChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            team: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                photo: file.name,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = formData;
        console.log(JSON.stringify(data));

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch('http://localhost:8080/player', options);

            if (response.ok) {
                const result = await response;
                navigation(`/player/${formData._id}`);
                sessionStorage.removeItem('player');
                console.log('Uspesno azuriranje igraca:', result);
            } else {
                console.error('Neuspesno azuriranje igraca');
            }
        } catch (error) {
            console.error('Doslo je do greske:', error);
        }
    };

    return (
        <>
            <Navigator />
            <div className="add-player">
                <h1>Add new player</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname">Firstname:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname">Lastname:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="birthdate">Date of birth:</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate.toString().slice(0,10)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="height">Height (cm):</label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="weight">Weight (kg):</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="spike">Spike (cm):</label>
                        <input
                            type="number"
                            id="spike"
                            name="spike"
                            value={formData.spike}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="block">Block (cm):</label>
                        <input
                            type="number"
                            id="block"
                            name="block"
                            value={formData.block}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="dominantHand">Dominant hand:</label>
                        <select
                            id="dominantHand"
                            name="dominantHand"
                            value={formData.dominantHand}
                            onChange={handleChange}
                        >
                            <option value="">Choose dominant hand</option>
                            <option value="LEFT">Left</option>
                            <option value="RIGHT">Rigth</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nationality">Nationality:</label>
                        <select
                            id="nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled hidden>Choose nationality</option>
                            <option value="Serbia">Srbija</option>
                            <option value="Bosnia and Hercegovina">Bosnia and Hercegovina</option>
                            <option value="Montenegro">Montenegro</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="team">Team:</label>
                        <select
                            id="team"
                            name="team"
                            value={formData.team._id}
                            onChange={handleTeamChange}
                            required
                        >
                            <option value="" disabled hidden>Choose team</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.teamName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="playerImage">Photo:</label>
                        <input
                            type="text" // Promenjen tip na text
                            id="playerImage"
                            name="playerImage"
                            value={formData.photo}
                            readOnly // Ovo onemogućava korisnicima da direktno menjaju vrednost
                        />
                        <input
                            type="file"
                            id="playerImage"
                            name="playerImage"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit">Update player</button>
                </form>
            </div>
        </>
    );
};

export default UpdatePlayer;

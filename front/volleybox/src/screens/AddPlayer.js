import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigator from '../components/Navigator';
import './AddPlayer.css';

const AddPlayer = () => {
  const [formData, setFormData] = useState({
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
  const [nationalities, setNationalities] = useState([]);
  const navigation = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {

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
          setTeams(data);
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

  const handleNationalityChange = (e) => {
    const { name, value } = e.target;
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch('http://localhost:8080/player', options);

      if (response.ok) {
        const result = await response.json();
        navigation('/player-page');
        console.log('Uspesno dodavanje igraca:', result);
      } else {
        console.error('Neuspesno dodavanje igraca');
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
              value={formData.birthdate}
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
              <option value="">Choose nationality</option>
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
              onChange={handleNationalityChange}
              required
            >
              <option value="">Choose team</option>
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
              type="file"
              id="playerImage"
              name="playerImage"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Add player</button>
        </form>
      </div>
    </>
  );
};

export default AddPlayer;

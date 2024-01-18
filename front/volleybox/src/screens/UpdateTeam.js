import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTeam.css';
import Navigator from '../components/Navigator';

const UpdateTeam = () => {
  const [formData, setFormData] = useState({
    _id: '',
    teamName: '',
    founded: '',
    hall: '',
    country: '',
    logo: ''
  });
  const [nationalities, setNationalities] = useState([]);
  const [halls, setHalls] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('team')) {
      navigation('/team-page');
    }
    const team = JSON.parse(sessionStorage.getItem('team'));
    setFormData(team);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file.name,
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
      const response = await fetch('http://localhost:8080/team', options);

      if (response.ok) {
        const result = await response;
        navigation(`/team/${formData._id}`);
        sessionStorage.removeItem('team');
        console.log('Uspesno dodavanje tima:', result);
      } else {
        console.error('Neuspesno dodavanje tima');
      }
    } catch (error) {
      console.error('Doslo je do greske:', error);
    }
  };

  return (
    <>
      <Navigator />
      <div className="add-team">
        <h1>Add new team</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="teamName">Team name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="founded">Founded (year):</label>
            <input
              type="number"
              id="founded"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Choose country</option>
              <option value="Serbia">Srbija</option>
              <option value="Bosnia and Hercegovina">Bosnia and Hercegovina</option>
              <option value="Montenegro">Montenegro</option>
            </select>
          </div>
          <div>
            <label htmlFor="hall">Hall:</label>
            <input
              type="text"
              id="hall"
              name="hall"
              value={formData.hall}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="logo">Logo:</label>
            <input
              type="text" // Promenjen tip na text
              id="logo"
              name="logo"
              value={formData.logo}
              readOnly // Ovo onemogućava korisnicima da direktno menjaju vrednost
            />
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Update team</button>
        </form>
      </div>
    </>
  );
};

export default UpdateTeam;

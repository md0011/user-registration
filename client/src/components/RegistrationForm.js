import React, { useState } from 'react';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [alert, setAlert] = useState(null);
  const [alertType, setAlertType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const agePattern = /^\d+$/;

    if (!namePattern.test(name)) {
      setAlert('Name should only contain text characters.');
      setAlertType('error');
      return;
    }
    if (!emailPattern.test(email) || !email.endsWith('.com')) {
      setAlert('Email should be valid and end with .com');
      setAlertType('error');
      return;
    }
    if (!agePattern.test(age)) {
      setAlert('Age should be an integer.');
      setAlertType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age }),
      });

      if (response.ok) {
        setAlert('Registration successful!');
        setAlertType('success');
        setName('');
        setEmail('');
        setAge('');
      } else {
        setAlert('Registration failed. Please try again.');
        setAlertType('error');
      }
    } catch (error) {
      setAlert('Error connecting to the server.');
      setAlertType('error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl mb-4">Register</h2>
        {alert && (
          <div
            className={`mb-4 p-2 rounded ${
              alertType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {alert}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    username: '',
    password: '',
  });
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' }); // Unified message state
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/signin', formData);
    
    const userData = {
      name: response.data.user.name,
      username: response.data.user.username,
      notes: response.data.user.notes,
      isAuthenticatd: true,
    };

    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    setUserData(userData);
    setMessage({ text: response.data.message, type: 'success' });
    setShowPopup(true);
  } catch (err) {
    setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
    console.log(err)
  }
};


  const closePopup = () => {
    setShowPopup(false);
    if (userData) {
       navigate('/', { state: { ...userData, isAuthenticated: true } });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        margin: 'auto',
        padding: 3,
        borderRadius: 4,
        marginTop : 10,
        backgroundColor: '#f9fafb',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Sign In
      </Typography>
      {message.text && (
        <Typography
          variant="body1"
          sx={{
            color: message.type === 'success' ? 'green' : 'red',
            mb: 2,
          }}
        >
          {message.text}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          margin="normal"
          value={formData.username}
          required
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          required
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
            '& .MuiInputLabel-root': {
              fontWeight: 500,
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{
            marginTop: 2,
            padding: '10px',
            fontSize: '16px',
            fontWeight: 600,
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Submit
        </Button>
      </form>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none', color: '#3f51b5' }}>
            Sign Up
          </Button>
        </Typography>
      </Box>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg transform transition-transform duration-300 scale-110">
            <h3 className="text-2xl font-bold text-green-600">Sign In successful!</h3>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default SignIn;

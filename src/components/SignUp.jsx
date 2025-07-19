import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    Date: new Date(Date.now()).toLocaleString(),
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://react-notes-app-backend-9ly8.onrender.com/api/signup', formData);
      setMessage({ text: response.data.message, type: "success" });
      setShowPopup(true);
    } catch (err) {
      setMessage({ text: "Something went wrong", type: "error" });
      console.log(err)
    }
  };

  const closePopup = () => {
    navigate('/signin');
    setShowPopup(false);
  };

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '90%', sm: 350 },
        margin: 'auto',
        padding: 3,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: '#fff',
        marginTop: 5,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
        Create Your Account
      </Typography>

      {message.text && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: message.type === "success" ? "green" : "red",
          }}
        >
          {message.text}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
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
                  borderRadius: 3,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
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
                  borderRadius: 3,
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginTop: 2,
                padding: '12px',
                borderRadius: 3,
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#3f51b5',
                },
              }}
            >
              Sign Up
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 1 }}>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Already have an account?{' '}
              <Button size="small" onClick={handleClick} sx={{ color: '#1976d2' }}>
                Sign In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
          <div className="bg-black p-6 rounded-lg text-center shadow-lg max-w-sm w-full">
            <h3 className="text-2xl font-bold text-green-600">Sign Up Successful!</h3>
            <p className="text-xl font-bold text-white mt-3">You can now log in with your new account.</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
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

export default SignUp;

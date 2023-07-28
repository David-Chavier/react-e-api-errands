import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Button, Grid, ListItemAvatar, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RequestLoginTypes from '../types/RequestLoginTypes';
import { createUsersAction } from '../store/modules/registerSlice';
import { useDispatch } from 'react-redux';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [username, setUsername] = useState<string>('');
  const [enableRegister, setEnableRegister] = useState<boolean>(true);
  const [password, setPassord] = useState<string>('');
  const [confirmPassord, setConfirmPassord] = useState<string>('');

  const [alertErroPassword, setalertErroPassword] = useState<boolean>(false);
  const [alertPasswordsMatch, setAlertPasswordsMatch] = useState<boolean>(false);
  const [alertEmailTested, setAlertEmailTested] = useState<boolean>(false);
  const [alertRegistrationSuccess, setAlertRegistrationSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (username.length >= 3) {
      setEnableRegister(false);
    } else {
      setEnableRegister(true);
    }
  }, [username]);

  const setRegister = async () => {
    if (password.length < 8) {
      setalertErroPassword(true);
    } else if (password !== confirmPassord) {
      setAlertPasswordsMatch(true);
    } else {
      const register: RequestLoginTypes = { username, password };
      const result = await dispatch(createUsersAction(register));

      if (!result.payload.ok) {
        setAlertPasswordsMatch(false);
        setAlertEmailTested(true);
      } else {
        setAlertRegistrationSuccess(true);
      }
    }
  };

  useEffect(() => {
    if (password.length > 4) {
      setalertErroPassword(false);
    }
  }, [password]);

  useEffect(() => {
    setAlertEmailTested(false);
  }, [username]);

  const handleChange = () => {
    navigate('/');
  };

  return (
    <Grid container sx={{ marginBottom: 7, display: 'flex', width: '400px', justifyContent: 'center' }}>
      {alertRegistrationSuccess && <Alert severity="success">Successfully registered</Alert>}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: 'cursive' }}>
          TaskTracker Register
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ListItemAvatar>
          <Avatar
            alt="Avatar n°'/images/imgBase.png'"
            src="/images/imgBase.png"
            sx={{ height: '130px', width: '130px', marginTop: '25px' }}
          />
        </ListItemAvatar>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '20px' }}>
        <TextField
          onChange={e => setUsername(e.target.value)}
          fullWidth
          label="Username"
          type="email"
          variant="standard"
        />
        {alertEmailTested && <Alert severity="error">This Username is already registered.</Alert>}
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '20px' }}>
        <TextField
          onChange={e => setPassord(e.target.value)}
          fullWidth
          label="Password"
          type="password"
          variant="standard"
        />
        {alertErroPassword && <Alert severity="error">The password must be at least 5 characters long.</Alert>}
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '20px' }}>
        <TextField
          onChange={e => setConfirmPassord(e.target.value)}
          fullWidth
          label="Confirm password"
          type="password"
          variant="standard"
        />
        {alertPasswordsMatch && (
          <Alert severity="error">The entered passwords are different. Please check and try again.</Alert>
        )}
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '30px' }}>
        <Button onClick={setRegister} disabled={enableRegister} fullWidth variant="contained">
          Register
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '30px' }}>
        <Typography>
          Already have an account?
          <Button onClick={handleChange}> Login </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemAvatar,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginAction } from '../store/modules/userLoggedSlice';
import { RootState } from '../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.login);

  const [username, setUsername] = useState<string>('');
  const [password, setPassord] = useState<string>('');

  const [AlertIncorrectCredentials, setAlertIncorrectCredentials] = useState<boolean>(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user.userId) {
      navigate('/home');
      return;
    }
  }, [user]);

  const loginRequest = async () => {
    const userToLogin = { username, password };
    await dispatch(loginAction(userToLogin));

    if (!user.userId) {
      setAlertIncorrectCredentials(true);
    }
  };

  const handleChange = () => {
    navigate('/register');
  };
  return (
    <Grid container sx={{ marginBottom: 20, display: 'flex', width: '400px', justifyContent: 'center' }}>
      {AlertIncorrectCredentials && (
        <Alert severity="error">Incorrect username or password. check and try again.</Alert>
      )}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: 'cursive' }}>
          TaskTracker Login
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
          type="text"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '20px' }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            onChange={e => setPassord(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '30px' }}>
        <Button onClick={loginRequest} fullWidth variant="contained">
          Login
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ paddingTop: '30px' }}>
        <Typography>
          Don’t have an account?
          <Button onClick={handleChange}> Sign up</Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;

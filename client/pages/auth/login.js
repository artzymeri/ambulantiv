import React, { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: null,
    password: null,
  });

  const [textFieldProps, setTextFieldProps] = useState({
    phoneNumberError: false,
    passwordError: false
  })

  const login = () => {
    if (loginInfo.phoneNumber === null || loginInfo.password === null || loginInfo.phoneNumber === '' || loginInfo.password === '') {
      window.alert("Fill all the forms");
    } else {
      if (loginInfo.phoneNumber.length < 12 || !loginInfo.phoneNumber.includes('+383')){
        setTextFieldProps({...textFieldProps, phoneNumberError: true})
      } else if (loginInfo.password.length < 8) {
        setTextFieldProps({...textFieldProps, passwordError: true})
      }
      else {
        localStorage.setItem("authenticated", true);
        router.push("/");
      }
    } 
    
  };

  return (
    <>
      <Head>
        <title>Kyçu</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Kyçu</Typography>
              <Typography color="text.secondary" variant="body2">
                Nuk posedoni llogari?{" "}
                <Link
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Regjistrohu
                </Link>
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <TextField
                fullWidth
                error={textFieldProps.phoneNumberError}
                helperText={
                  textFieldProps.phoneNumberError
                    ? "Shenoni numrin e telefonit sipas formës +38344123123"
                    : null
                }
                autoComplete="off"
                label="Numri Telefonit"
                name="phone-number"
                type="tel"
                inputProps={{
                  inputMode: "tel",
                }}
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Fjalëkalimi
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  error={textFieldProps.passwordError}
                  helperText={
                  textFieldProps.passwordError
                    ? "Fjalëkalimi duhet të jetë së paku 8 karaktere"
                    : null
                  }
                  type={showPassword ? "text" : "password"}
                  onChange={(e)=> setLoginInfo({...loginInfo, password: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={login}
            >
              Kyçu
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Login;

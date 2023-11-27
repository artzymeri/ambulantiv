import React, { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
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

  const login = () => {
    if (loginInfo.phoneNumber === null || loginInfo.password === null) {
      window.alert("Fill all the forms");
    } else {
      localStorage.setItem("authenticated", true);
      router.push("/");
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
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
            <FormHelperText>
              Forma e numrit të telefonit : +38344222000
            </FormHelperText>
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

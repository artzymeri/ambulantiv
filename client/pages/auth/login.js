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
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "@/styling/global.css";
import LoginChecker from "@/components/LoginChecker";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ title: "", message: "" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: null,
    password: null,
  });

  const [textFieldProps, setTextFieldProps] = useState({
    phoneNumberError: false,
    passwordError: false,
  });

  const login = () => {
    if (
      loginInfo.phoneNumber === null ||
      loginInfo.password === null ||
      loginInfo.phoneNumber === "" ||
      loginInfo.password === ""
    ) {
      setSnackbarData({
        title: "error",
        message: "Ju lutem mbushni të dhënat",
      });
      setSnackbarOpen(true);
    } else {
      if (
        loginInfo.phoneNumber.length < 12 ||
        !loginInfo.phoneNumber.includes("+383") ||
        loginInfo.phoneNumber.length > 12
      ) {
        setTextFieldProps({ ...textFieldProps, phoneNumberError: true });
      } else if (loginInfo.password.length < 8) {
        setTextFieldProps({ ...textFieldProps, passwordError: true });
      } else {
        axios
          .post("http://localhost:8080/login", {
            phoneNumber: loginInfo.phoneNumber,
            password: loginInfo.password,
          })
          .then((res) => {
            const {
              title,
              message,
              adminToken,
              distributorToken,
              pranuesToken,
              phoneNumberOfUser,
              companyLogo,
              namesurname,
              emailAddressOfUser,
              companyType,
              userId,
            } = res.data;
            setSnackbarData({
              title: title,
              message: message,
            });
            if (adminToken) {
              localStorage.setItem("adminToken", adminToken);
              router.push("/");
            } else if (distributorToken) {
              localStorage.setItem("distributorToken", distributorToken);
              router.push("/");
            } else if (pranuesToken) {
              localStorage.setItem("pranuesToken", pranuesToken);
              router.push("/");
            }
            setSnackbarOpen(true);
          });
      }
    }
  };

  return (
    <LoginChecker>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarData.title.toLowerCase()}
        >
          {snackbarData.message}
        </MuiAlert>
      </Snackbar>
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
                  className="register-login-button-link"
                >
                  Regjistrohu
                </Link>
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <TextField
                className="shadow-one b-5"
                fullWidth
                size="small"
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
                onKeyPress={handleKeyPress}
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ top: "-7px" }}
                >
                  Fjalëkalimi
                </InputLabel>
                <OutlinedInput
                  size="small"
                  className="shadow-one b-5"
                  id="outlined-adornment-password"
                  error={textFieldProps.passwordError}
                  helperText={
                    textFieldProps.passwordError
                      ? "Fjalëkalimi duhet të jetë së paku 8 karaktere"
                      : null
                  }
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
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
              className="shadow-one"
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
    </LoginChecker>
  );
};

export default Login;

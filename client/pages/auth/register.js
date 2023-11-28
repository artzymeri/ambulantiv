import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  const [regsiterInfo, setRegisterInfo] = useState({
    namesurname: "",
    companyname: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    companyType: "",
  });

  const [textFieldProps, setTextFieldProps] = useState({
    namesurnameError: false,
    companynameError: false,
    phoneNumberError: false,
    emailAddressError: false,
    passwordError: false,
    companyTypeError: false,
  });

  const handleRegister = () => {
    const isEmpty = (value) => value === null || value === "";

    if (Object.values(regsiterInfo).some((value) => isEmpty(value))) {
      window.alert("Fill all the forms");
    } else {
      if (regsiterInfo.namesurname.length < 3) {
        setTextFieldProps({ ...textFieldProps, namesurnameError: true });
      } else if (regsiterInfo.companyname.length < 3) {
        setTextFieldProps({ ...textFieldProps, companynameError: true });
      } else if (
        regsiterInfo.phoneNumber.length < 12 ||
        !regsiterInfo.phoneNumber.includes("+383")
      ) {
        setTextFieldProps({ ...textFieldProps, phoneNumberError: true });
      } else if (
        !regsiterInfo.emailAddress.includes("@") ||
        !regsiterInfo.emailAddress.includes(".")
      ) {
        setTextFieldProps({ ...textFieldProps, emailAddressError: true });
      } else if (regsiterInfo.password.length < 8) {
        setTextFieldProps({ ...textFieldProps, passwordError: true });
      } else {
        axios
          .post("http://localhost:8080/requestregister", regsiterInfo)
          .then((res) => {
            const { title, message } = res.data;
            setSnackbarData({
              title: title,
              message: message,
            });
            setSnackbarOpen(true);
            setRegisterInfo({
              namesurname: "",
              companyname: "",
              phoneNumber: "",
              emailAddress: "",
              password: "",
              companyType: null,
            });
          });
        setTextFieldProps({
          ...textFieldProps,
          namesurnameError: false,
          companynameError: false,
          phoneNumberError: false,
          emailAddressError: false,
          passwordError: false,
          companyTypeError: false,
        });
      }
    }
  };

  return (
    <>
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
        <title>Regjistrohu</title>
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
              <Typography variant="h4">Regjistrohu</Typography>
              <Typography color="text.secondary" variant="body2">
                Posedoni llogari?{" "}
                <Link href="/auth/login" underline="hover" variant="subtitle2">
                  Kyçu
                </Link>
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <TextField
                fullWidth
                error={textFieldProps.namesurnameError}
                helperText={
                  textFieldProps.namesurnameError
                    ? "Shenoni një emër të duhur"
                    : null
                }
                autoComplete="off"
                size="small"
                label="Emri dhe Mbiemri"
                name="name"
                type="text"
                onKeyPress={handleKeyPress}
                value={regsiterInfo.namesurname}
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    namesurname: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                error={textFieldProps.companynameError}
                helperText={
                  textFieldProps.companynameError
                    ? "Shenoni një emër të duhur"
                    : null
                }
                autoComplete="off"
                size="small"
                label="Emri Dyqanit/Kompanisë"
                name="companyname"
                type="text"
                value={regsiterInfo.companyname}
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    companyname: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
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
                size="small"
                inputProps={{
                  inputMode: "tel",
                }}
                value={regsiterInfo.phoneNumber}
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    phoneNumber: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <TextField
                fullWidth
                error={textFieldProps.emailAddressError}
                helperText={
                  textFieldProps.emailAddressError
                    ? "Shënoni një email-address të duhur"
                    : null
                }
                autoComplete="off"
                size="small"
                label="Email"
                name="email"
                type="email"
                value={regsiterInfo.emailAddress}
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    emailAddress: e.target.value,
                  })
                }
                onKeyPress={handleKeyPress}
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ top: "-6px" }}
                >
                  Fjalëkalimi
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  size="small"
                  error={textFieldProps.passwordError}
                  helperText={
                    textFieldProps.passwordError
                      ? "Fjalëkalimi duhet të jetë së paku 8 karaktere"
                      : null
                  }
                  type={showPassword ? "text" : "password"}
                  value={regsiterInfo.password}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...regsiterInfo,
                      password: e.target.value,
                    })
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
              <FormControl className="radio-wrapper">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Lloji i Kompanisë
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="radios-group-container"
                >
                  <FormControlLabel
                    value="pranues"
                    control={<Radio />}
                    label="Pranues"
                    onChange={(e) =>
                      setRegisterInfo({
                        ...regsiterInfo,
                        companyType: e.target.value,
                      })
                    }
                    onKeyPress={handleKeyPress}
                  />
                  <FormControlLabel
                    value="distributor"
                    control={<Radio />}
                    label="Distributor"
                    onChange={(e) =>
                      setRegisterInfo({
                        ...regsiterInfo,
                        companyType: e.target.value,
                      })
                    }
                    onKeyPress={handleKeyPress}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={handleRegister}
            >
              Regjistrohu
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Login;

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
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const router = useRouter();

  const [regsiterInfo, setRegisterInfo] = useState({
    namesurname: null,
    companyname: null,
    phoneNumber: null,
    emailAddress: null,
    password: null,
    companyType: null,
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
        axios.post('http://localhost:8080/requestregister', regsiterInfo).then((res)=> console.log(res.data))
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
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    companyname: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    phoneNumber: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    emailAddress: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                error={textFieldProps.passwordError}
                helperText={
                  textFieldProps.passwordError
                    ? "Fjalëkalimi duhet të përmbajë së paku 8 karaktere"
                    : null
                }
                autoComplete="off"
                size="small"
                label="Fjalëkalimi"
                name="password"
                type="password"
                onChange={(e) =>
                  setRegisterInfo({
                    ...regsiterInfo,
                    password: e.target.value,
                  })
                }
              />
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

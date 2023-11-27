import React, { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const router = useRouter();

  const [method, setMethod] = useState("email");

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const [emailInputs, setEmailInputs] = useState({
    emailAddress: null,
    password: null,
  });

  const [phoneInputs, setPhoneInputs] = useState({
    phoneNumber: null,
    password: null,
  });

  const loginByEmail = () => {
    if (emailInputs.emailAddress === null || emailInputs.password === null) {
      window.alert("Fill all the forms");
    } else {
      localStorage.setItem("authenticated", true);
      router.push("/");
    }
  };

  const loginByPhoneNumber = () => {
    if (phoneInputs.phoneNumber === null || phoneInputs.password === null) {
      window.alert("Fill all the forms");
    } else {
      localStorage.setItem("authenticated", true);
      router.push("/");
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
                autoComplete="off"
                size="small"
                label="Emri dhe Mbiemri"
                name="name"
                type="text"
                onChange={(e) =>
                  setEmailInputs({
                    ...emailInputs,
                    emailAddress: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                label="Emri Dyqanit/Kompanisë"
                name="companyname"
                type="text"
                onChange={(e) =>
                  setEmailInputs({
                    ...emailInputs,
                    password: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                autoComplete="off"
                label="Numri Telefonit"
                name="phone-number"
                type="tel"
                size="small"
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
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                label="Email"
                name="email"
                type="email"
                onChange={(e) =>
                  setEmailInputs({
                    ...emailInputs,
                    password: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                label="Password"
                name="password"
                type="password"
                onChange={(e) =>
                  setEmailInputs({
                    ...emailInputs,
                    password: e.target.value,
                  })
                }
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={loginByEmail}
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

import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
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
import dynamic from "next/dynamic";

const LoginChecker = dynamic(
  () => import("@/components/Checkers/LoginChecker"),
  {
    ssr: false,
  }
);

const Login = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        setLoading(true);
        axios
          .post("https://ecommerce-kosova-server.onrender.com/login", {
            phoneNumber: loginInfo.phoneNumber,
            password: loginInfo.password,
          })
          .then((res) => {
            const {
              title,
              message,
              phoneNumberOfUser,
              companyLogo,
              namesurname,
              companyname,
              emailAddressOfUser,
              companyType,
              companyAddress,
              userId,
              adminToken,
              distributorToken,
              pranuesToken,
            } = res.data;
            setSnackbarData({
              title: title,
              message: message,
            });
            if (adminToken) {
              Cookies.set("adminToken", adminToken, { expires: 1 / 24 });
              localStorage.setItem("userId", userId);
              router.push("/");
            } else if (distributorToken) {
              Cookies.set("distributorToken", distributorToken, {
                expires: 1 / 24,
              });
              localStorage.setItem("namesurname", namesurname);
              localStorage.setItem("companyname", companyname);
              localStorage.setItem("phonenumber", phoneNumberOfUser);
              localStorage.setItem("emailaddress", emailAddressOfUser);
              localStorage.setItem("companyAddress", companyAddress);
              localStorage.setItem("userId", userId);
              localStorage.setItem("companylogo", companyLogo);

              router.push("/");
            } else if (pranuesToken) {
              Cookies.set("pranuesToken", pranuesToken, { expires: 1 / 24 });
              localStorage.setItem("namesurname", namesurname);
              localStorage.setItem("companyname", companyname);
              localStorage.setItem("phonenumber", phoneNumberOfUser);
              localStorage.setItem("emailaddress", emailAddressOfUser);
              localStorage.setItem("companyAddress", companyAddress);
              localStorage.setItem("userId", userId);
              router.push("/");
            }
            setSnackbarOpen(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    isClient && (
      <>
        <Head>
          <link rel="icon" href="/e-commerceKosovaLogo.png" />
        </Head>
        <LoginChecker>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1500}
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
          <>
            <div className="login-and-register-background"></div>
            <Box
              sx={{
                backgroundColor: "transparent",
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
                  zIndex: "999",
                }}
              >
                <div>
                  <h2
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1976d2",
                      marginBottom: "30px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 500 500"
                      height="60px"
                      width="60px"
                      fill="#1976d2"
                    >
                      <path
                        d="M240 13.166c-42.253 3.321-80.5 41.339-90.375 89.834-4.185 20.554-3.092 31 3.243 31 4.707 0 5.807-2.39 6.449-14 1.762-31.865 19.181-64.386 43.209-80.67 58.114-39.384 128.89 1.912 136.536 79.666 1.345 13.671 1.902 15.004 6.273 15.004 4.774 0 5.666-1.488 5.661-9.45-.021-36.84-20.743-76.282-50.469-96.061C281.744 15.991 263.339 11.332 240 13.166M42.647 80.75c-.336 5.362-3.621 93.58-7.3 196.038-6.375 177.576-6.61 186.535-5.026 191.56 2.111 6.699 7.473 12.978 14.041 16.442l5.138 2.71h399l4.652-2.292c2.559-1.261 6.688-4.467 9.175-7.127 8.588-9.18 8.529 9.68.647-206.421-3.835-105.138-6.973-193.298-6.973-195.91L456 71h-57c-31.35 0-56.998.338-56.997.75.002.412 1.359 4.074 3.014 8.138 3.308 8.116 6.335 19.209 7.872 28.841.851 5.339 1.523 6.694 4.701 9.484 12.391 10.879 5.321 31.073-10.878 31.073-16.063 0-24.492-17.775-13.959-29.435l3.545-3.924-1.673-8.516c-2.167-11.029-5.095-19.847-9.544-28.748L321.5 71.5l-72.096-.257-72.096-.256-4.582 9.756c-4.585 9.765-8.129 21.276-9.324 30.285-.581 4.378-.353 5.15 2.605 8.831 9.866 12.278 1.717 29.372-14.001 29.372-16.725 0-23.726-20.983-10.641-31.891 2.599-2.167 3.571-3.907 4.098-7.34 1.202-7.831 5.747-24.233 8.695-31.383 1.563-3.79 2.842-7.055 2.842-7.255 0-.199-25.592-.362-56.871-.362H43.258l-.611 9.75m199.235 114c-.066.412-.054 1.123.026 1.578.079.456-1.593.703-3.717.55-3.267-.236-4.31.22-6.776 2.961-2.425 2.696-3.746 3.29-7.86 3.537-4.73.283-6.85 1.706-4.608 3.091.579.358 1.053 1.48 1.053 2.494 0 1.149 1.13 2.237 3 2.889 1.65.575 3 1.763 3 2.64 0 .876.9 2.56 2 3.74 2.573 2.763 2.521 3.382-.52 6.201-2.095 1.942-2.36 2.755-1.57 4.832 1.247 3.279-3.18 8.002-6.649 7.095-1.755-.459-2.631.155-4.328 3.032-1.171 1.984-2.554 3.344-3.075 3.022-1.295-.8-3.52 1.204-5.301 4.774-1.555 3.118-1.518 3.23 2.593 7.786 1.828 2.025.742 4.028-2.185 4.028-.899 0-2.838 1.351-4.31 3.002-2.245 2.52-2.97 2.818-4.514 1.854-1.16-.725-2.91-.85-4.74-.339-1.596.445-3.403.73-4.018.633-.614-.097-1.659.478-2.323 1.277-.663.8-1.813 1.221-2.555.937-2.192-.842-5.071 1.277-8.992 6.619-4.212 5.738-5.309 5.967-12.77 2.667-5.184-2.293-5.393-2.307-8.607-.583-4.822 2.586-7.284 5.105-6.637 6.79.313.816.04 1.81-.607 2.21-1.907 1.178 2.757 6.933 5.619 6.933 1.306 0 3.975.944 5.93 2.098l3.556 2.098-1.998 2.805c-3.029 4.254-1.494 14.59 2.595 17.477 4.624 3.266 8.133 7.299 8.856 10.179.371 1.477 1.527 3.77 2.57 5.095 1.55 1.971 1.678 2.758.703 4.32-1.003 1.606-.845 2.154.988 3.438 1.68 1.177 2.145 2.441 2.023 5.497-.204 5.115.907 6.105 7.102 6.329 2.796.101 5.642.742 6.324 1.424.682.682 1.839 1.24 2.571 1.24.733 0 1.582.653 1.889 1.452.306.798 2.077 1.953 3.936 2.566 1.858.614 4.525 2.548 5.926 4.299a618.857 618.857 0 0 0 3.604 4.467c2.339 2.843 6.11 15.863 5.96 20.577-.11 3.447.37 5.441 1.649 6.853 1.73 1.909 3.837 8.504 5.002 15.651.461 2.826.105 3.718-2.224 5.575l-2.772 2.21 1.823 4.773c2.101 5.503 3.757 6.538 6.494 4.06 1.59-1.438 2.222-1.529 3.462-.499 2.21 1.834 6.824-.339 9.706-4.572 1.273-1.869 2.652-3.401 3.064-3.405.412-.004.75-.682.75-1.507 0-.825-.403-1.5-.895-1.5-.833 0-1.609-3.649-2.533-11.916-.21-1.878-.027-4.128.406-5 .434-.871 1.367-2.822 2.074-4.334.707-1.512 2.024-2.75 2.926-2.75.902 0 2.513-.661 3.581-1.468 1.067-.808 3.146-1.483 4.619-1.5 1.768-.021 3.482-1.06 5.048-3.062 1.304-1.666 3.527-3.239 4.94-3.495 4.31-.782 9.217-3.177 11.55-5.638 5.166-5.447 5.785-5.798 8.81-4.989 2.895.775 9.997 11.496 8.847 13.357-.882 1.427 1.701 4.795 3.678 4.795 2.887 0 9.949-2.349 9.949-3.309 0-.452-.46-1.681-1.022-2.731-1.292-2.415 3.454-13.281 7.37-16.874 2.526-2.318 2.709-2.344 4.579-.653 2.579 2.335 4.354 1.125 3.572-2.436-.552-2.514-.296-2.883 2.417-3.479 3.316-.728 5.084-.088 5.084 1.841 0 3.728 7.005 3.677 8.439-.061.813-2.119-2.621-9.372-4.174-8.815-1.729.62-3.175-2.505-2.585-5.588.402-2.105.941-2.499 2.907-2.123 1.733.331 2.413.013 2.413-1.13 0-1.202.674-1.459 2.75-1.048 4.258.842 7.259-5.078 4.737-9.347l-1.732-2.931 5.143-5.307c3.717-3.837 4.977-5.827 4.546-7.184-.455-1.434.106-2.121 2.376-2.912 3.218-1.122 4.549-4.502 2.919-7.414-.622-1.112-.568-2.07.157-2.795.607-.607 1.104-1.914 1.104-2.904s.689-1.8 1.531-1.8c2.527 0 2.79-2.741.562-5.869-1.151-1.617-2.093-3.453-2.093-4.081 0-.764-1.238-.932-3.75-.508-6.081 1.026-7.25 1.514-7.25 3.025 0 2.323-1.832 1.636-2.18-.817-.229-1.611-1.101-2.34-3.07-2.566-1.923-.222-2.75-.888-2.75-2.215 0-2.48-3.529-4.313-6.977-3.624-1.646.33-3.604-.064-4.924-.988-1.205-.845-2.831-1.29-3.613-.99-.782.3-1.679.13-1.993-.378-.314-.508-1.903-.657-3.532-.331-2.878.575-4.139-.812-1.961-2.158.55-.34 1-1.941 1-3.559s.45-2.941 1-2.941 1-1.485 1-3.3c0-1.815.51-3.81 1.133-4.433 1.895-1.895.166-4.438-2.881-4.237-4.851.32-5.758.015-6.766-2.28-.813-1.849-1.746-2.235-5.237-2.164-2.922.06-4.249-.331-4.249-1.25 0-.735-.34-1.336-.756-1.336-1.205 0-3.364-5.623-3.138-8.173.708-8.022-4.113-13.326-6.886-7.577-1.057 2.193-1.086 2.197-1.152.154-.038-1.153-.835-3.628-1.772-5.5-.937-1.872-1.725-5.204-1.75-7.404-.036-3.09-.436-4.003-1.761-4.011-.944-.007-2.401-.907-3.238-2-1.51-1.974-1.536-1.972-3.286.257l-1.763 2.245-2.92-2.508c-2.862-2.46-5.397-2.575-8.165-.373-.676.538-1.972-.076-3.425-1.622-1.285-1.369-2.947-2.488-3.694-2.488-.746 0-1.616-.675-1.932-1.5-.317-.825-1.428-1.5-2.469-1.5-1.353 0-1.893-.714-1.893-2.5 0-1.86.529-2.5 2.067-2.5 2.61 0 1.866-2.937-1.957-7.729-2.366-2.965-6.908-4.549-7.228-2.521"
                        fill-rule="evenodd"
                      />
                    </svg>
                    e-Commerce
                    <br />
                    Kosova
                  </h2>
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
                      style={{ background: "white" }}
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
                        style={{ background: "white" }}
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
                          setLoginInfo({
                            ...loginInfo,
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Stack>
                  {loading ? (
                    <Button
                      className="shadow-two"
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained"
                      onClick={login}
                    >
                      <span className="button-loader"></span>
                    </Button>
                  ) : (
                    <Button
                      className="shadow-two"
                      fullWidth
                      size="large"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="contained"
                      onClick={login}
                    >
                      Kyçu
                    </Button>
                  )}
                </div>
              </Box>
            </Box>
          </>
        </LoginChecker>
      </>
    )
  );
};

export default Login;

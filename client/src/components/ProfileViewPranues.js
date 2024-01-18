import React, { useEffect, useState } from "react";

const {
  TextField,
  Snackbar,
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} = require("@mui/material");
import MuiAlert from "@mui/material/Alert";
import Head from "next/head";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const ProfileViewPranues = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [showPassword, setShowPassword] = useState(false);

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
    if (dialogPasswordOpen) {
      return;
    } else {
      if (event.key === "Enter") {
        handleConfirmDetails();
      }
    }
  };

  const [profileInfo, setProfileInfo] = useState({
    namesurname: localStorage.getItem("namesurname"),
    companyname: localStorage.getItem("companyname"),
    phoneNumber: localStorage.getItem("phonenumber"),
    emailAddress: localStorage.getItem("emailaddress"),
    companyAddress: localStorage.getItem("companyAddress"),
  });

  const [newPasswordTester, setNewPasswordTester] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const confirmNewPassword = () => {
    if (newPasswordTester !== newPassword) {
      setSnackbarData({
        title: "warning",
        message: "Të dhënat duhet të jenë njësoj",
      });
      setSnackbarOpen(true);
    } else if (newPasswordTester == "" && newPassword == "") {
      setSnackbarData({
        title: "warning",
        message: "Ju lutem mbushni të dhënat",
      });
      setSnackbarOpen(true);
    } else if (newPasswordTester.length < 8 && newPassword.length < 8) {
      setSnackbarData({
        title: "warning",
        message: "Fjalëkalimi duhet të jetë mbi 8 karaktere",
      });
      setSnackbarOpen(true);
    } else {
      axios
        .post(
          `http://localhost:8080/changepassword/${localStorage.getItem(
            "userId"
          )}`,
          { newPassword }
        )
        .then((res) => {
          const { title, message } = res.data;
          setSnackbarOpen(true);
          setSnackbarData({
            title: title,
            message: message,
          });
          setDialogPasswordOpen(false);
          setNewPasswordTester("");
          setNewPassword("");
        })
        .catch((error) => {
          setSnackbarOpen(true);
          setSnackbarData({
            title: "error",
            message: "Procesi nuk mund të ekzekutohet",
          });
        });
    }
  };

  const [textFieldProps, setTextFieldProps] = useState({
    namesurnameError: false,
    companynameError: false,
    phoneNumberError: false,
    emailAddressError: false,
  });

  const handleConfirmDetails = () => {
    const isEmpty = (value) => value === null || value === "";

    if (Object.values(profileInfo).some((value) => isEmpty(value))) {
      setSnackbarData({
        title: "error",
        message: "Ju lutem mbushni të dhënat",
      });
      setSnackbarOpen(true);
    } else if (
      profileInfo.namesurname.length < 3 ||
      profileInfo.companyname.length < 3 ||
      profileInfo.phoneNumber.length !== 12 ||
      !profileInfo.phoneNumber.includes("+383") ||
      !profileInfo.emailAddress.includes("@") ||
      !profileInfo.emailAddress.includes(".")
    ) {
      setTextFieldProps({
        namesurnameError: profileInfo.namesurname.length < 3,
        companynameError: profileInfo.companyname.length < 3,
        phoneNumberError:
          profileInfo.phoneNumber.length !== 12 ||
          !profileInfo.phoneNumber.includes("+383"),
        emailAddressError:
          !profileInfo.emailAddress.includes("@") ||
          !profileInfo.emailAddress.includes("."),
      });
    } else {
      axios
        .post(
          `http://localhost:8080/changeprofiledetailspranues/${localStorage.getItem(
            "userId"
          )}`,
          {
            profileInfo: profileInfo,
            clientCompanyname: localStorage.getItem("companyname"),
          }
        )
        .then((res) => {
          const {
            title,
            message,
            companyname,
            namesurname,
            emailAddress,
            companyAddress,
            phoneNumber,
          } = res.data;
          localStorage.setItem("companyname", companyname);
          localStorage.setItem("namesurname", namesurname);
          localStorage.setItem("emailaddress", emailAddress);
          localStorage.setItem("companyAddress", companyAddress);
          localStorage.setItem("phonenumber", phoneNumber);
          setSnackbarData({
            title: title,
            message: message,
          });
          setSnackbarOpen(true);
        });
      setTextFieldProps({
        namesurnameError: false,
        companynameError: false,
        phoneNumberError: false,
        emailAddressError: false,
      });
    }
  };

  const [dialogPasswordOpen, setDialogPasswordOpen] = useState(false);

  return (
    isClient && (
      <>
        <Dialog
          open={dialogPasswordOpen}
          onClose={() => {
            setDialogPasswordOpen(false);
          }}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              borderBottom: "1px",
              border: "1px solid lightgray",
            }}
          >
            Ndrysho Fjalëkalimin
          </DialogTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "30px",
            }}
          >
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ top: "-7px" }}
              >
                Sheno fjalëkalimin e ri
              </InputLabel>
              <OutlinedInput
                className="shadow-one b-5"
                id="outlined-adornment-password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={newPasswordTester}
                onChange={(e) => setNewPasswordTester(e.target.value)}
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
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ top: "-7px" }}
              >
                Sheno përsëri
              </InputLabel>
              <OutlinedInput
                className="shadow-one b-5"
                id="outlined-adornment-password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setDialogPasswordOpen(false);
                }}
              >
                Mbyll
              </Button>
              <Button variant="contained" onClick={confirmNewPassword}>
                Ndrysho Fjalëkalimin
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
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
          <title>Profili</title>
        </Head>
        <Box
          sx={{
            backgroundColor: "background.paper",
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            overflow: "clip",
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
                <Typography variant="h4">Profili Juaj</Typography>
                <Typography color="text.secondary" variant="body2">
                  Mundeni të ndryshoni detajet e profilit tuaj këtu!
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  className="shadow-one b-5"
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
                  value={profileInfo.namesurname}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      namesurname: e.target.value,
                    })
                  }
                />
                <TextField
                  className="shadow-one b-5"
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
                  value={profileInfo.companyname}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      companyname: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
                <TextField
                  className="shadow-one b-5"
                  fullWidth
                  autoComplete="off"
                  size="small"
                  label="Adresa Dyqanit/Kompanisë"
                  name="companyAddress"
                  type="text"
                  value={profileInfo.companyAddress}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      companyAddress: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
                <TextField
                  className="shadow-one b-5"
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
                  value={profileInfo.phoneNumber}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      phoneNumber: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
                <TextField
                  className="shadow-one b-5"
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
                  value={profileInfo.emailAddress}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      emailAddress: e.target.value,
                    })
                  }
                  onKeyPress={handleKeyPress}
                />
              </Stack>
              <Button
                className="shadow-one"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                color="warning"
                variant="contained"
                onClick={() => {
                  setDialogPasswordOpen(true);
                }}
              >
                Ndrysho Fjalëkalimin
              </Button>
              <Button
                className="shadow-one"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={handleConfirmDetails}
              >
                Ndrysho Detajet
              </Button>
            </div>
          </Box>
        </Box>
      </>
    )
  );
};

export default ProfileViewPranues;

import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useState } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "../../../fromTogglTrack/GoogleIcon";
import { amber, red } from "@mui/material/colors";
import * as yup from "yup";
import { Form, Formik } from "formik";
import HttpsIcon from "@mui/icons-material/Https";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const textColor = amber[50];

const StyledButton = styled(Button)(({ theme }) => ({
  //   backgroundColor: "#fff",
  borderRadius: "100px",
  color: "black",
  ...theme.typography.h6,
  fontSize: theme.typography.button.fontSize,
  padding: theme.spacing(1.5),
  "& .MuiButton-startIcon>:nth-of-type(1)": {
    fontSize: "1.875rem",
  },
}));

const StyledInput = styled(Input)(({ theme }) => ({
  "&::before,&::after": {
    content: "none",
  },
  "label + &": {
    marginTop: theme.spacing(1),
  },
  backgroundColor: "transparent",
  color: "white",
  borderRadius: 8,
  border: "2px solid",
  borderColor: alpha(theme.palette.primary.light, 1),
  padding: theme.spacing(1.5, 2),
  "&::placeholder": {
    fontWeight: "bold",
    color: theme.palette.primary.light,
    opacity: 0.7,
  },
  "& svg": {
    color: theme.palette.primary.light,
    opacity: 0.7,
    cursor: "pointer",
  },
  "& .MuiInputBase-input": {
    padding: 0,
  },
  "&.Mui-error": {
    borderColor: red[600],
  },
  "&.Mui-focused": {
    backgroundColor: theme.palette.yellowShade.light,
    color: "black",
    borderColor: "black",
    outline: `1px solid ${theme.palette.yellowShade.light}`,
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: textColor,
  marginTop: theme.spacing(3),
  ...theme.typography.subtitle1,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const CompanySSOLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: amber[50],
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "fit-content",
  transition: "color 0.2s ease-in-out",
  margin: "0px auto",
  "&>svg:nth-of-type(1)": {
    marginRight: 6,
  },
  "&:hover": {
    color: theme.palette.secondary.light,
  },
}));

const registerSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .test("password-length", "between 8 and 72 characters", (value) => {
      return value && value.length >= 8 && value.length <= 72;
    })
    .test("password-low-cap", "lowercase and uppercase letters", (value) => {
      return value && /[a-z]/.test(value) && /[A-Z]/.test(value);
    })
    .test("password-number", "at least one number", (value) => {
      return value && /[0-9]/.test(value);
    }),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required(),
  password: yup.string().required("Password cannot be empty"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = ({ loginMode = false, onComplete, style }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, formikHelpers) => {
    console.log(values);
    onComplete(values);
  };

  const handleVisibilityClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      bgcolor={"primary.dark"}
      px={4.5}
      py={5}
      pt={5.5}
      width={"100%"}
      style={style}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <StyledButton
          color="buttonWhite"
          startIcon={<GoogleIcon />}
          variant="contained"
          onClick={onComplete}
          fullWidth
        >
          {loginMode ? "Login Via Google" : "Sign Up with Google"}
        </StyledButton>
        <StyledButton
          color="buttonWhite"
          startIcon={<AppleIcon fontSize="small" style={{ color: "black" }} />}
          variant="contained"
          onClick={onComplete}
          fullWidth
        >
          {loginMode ? "Login Via Apple" : "Sign Up with Apple"}
        </StyledButton>
      </Stack>
      <Divider
        sx={{
          mt: theme.spacing(4),
          "&::after,&:before": {
            borderTopWidth: 2,
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <Typography component={"span"} color={amber[100]} mx={1}>
          OR
        </Typography>
      </Divider>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // validationScheme={loginMode ? loginSchema : registerSchema}
        validationSchema={loginMode ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <StyledInputLabel>Email</StyledInputLabel>
              <StyledInput
                fullWidth
                placeholder="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
              />
              <FormHelperText
                error={Boolean(touched.email) && Boolean(errors.email)}
                style={{ fontSize: theme.typography.subtitle1.fontSize }}
              >
                {Boolean(touched.email) &&
                  Boolean(errors.email) &&
                  errors.email}
              </FormHelperText>
              <StyledInputLabel>Password</StyledInputLabel>
              <StyledInput
                fullWidth
                placeholder="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                type={showPassword ? "text" : "password"}
                error={Boolean(touched.password) && Boolean(errors.password)}
                endAdornment={
                  <Box height={"24px"} onClick={handleVisibilityClick}>
                    {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </Box>
                }
              />
              <FormHelperText
                error={Boolean(touched.password) && Boolean(errors.password)}
                style={{ fontSize: theme.typography.subtitle1.fontSize }}
              >
                {Boolean(touched.password) &&
                  Boolean(errors.password) &&
                  errors.password}
              </FormHelperText>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: "100px",
                  padding: theme.spacing(1.5),
                  mt: theme.spacing(2.5),
                  mb: theme.spacing(4),
                }}
              >
                {loginMode ? "Log in" : "Sign up via email"}
              </Button>
            </Form>
          );
        }}
      </Formik>
      {!loginMode && (
        <Typography
          variant="caption"
          sx={{
            color: textColor,
            lineHeight: 1.6,
          }}
        >
          By signing up, you agree to our{" "}
          <StyledLink>terms of services</StyledLink>,{" "}
          <StyledLink>privacy policy</StyledLink> and to receiving marketing
          communication from Toggl Track. You can opt out anytime.
        </Typography>
      )}
      {loginMode && (
        <CompanySSOLink>
          <HttpsIcon />
          <span>{"Company Login (SSO)"}</span>
          <ArrowRightIcon />
        </CompanySSOLink>
      )}
    </Box>
  );
};

export default SignInForm;

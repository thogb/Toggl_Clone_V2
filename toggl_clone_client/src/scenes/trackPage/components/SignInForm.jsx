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
import { amber, red } from "@mui/material/colors";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import HttpsIcon from "@mui/icons-material/Https";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const textColor = amber[50];

const GoogleIcon = () => {
  return (
    <svg width="28" height="28" viewBox="0 0 20 20">
      <g fill="none">
        <path
          d="M17.876 10.284c0-.574-.052-1.127-.147-1.657H10.1v3.134h4.36a3.726 3.726 0 01-1.617 2.444v2.033h2.618c1.531-1.41 2.415-3.487 2.415-5.954z"
          fill="#4285F4"
        ></path>
        <path
          d="M10.1 18.2c2.187 0 4.02-.725 5.36-1.962l-2.617-2.033c-.725.486-1.653.773-2.743.773-2.11 0-3.895-1.424-4.532-3.339H2.862v2.099A8.097 8.097 0 0010.1 18.2z"
          fill="#34A853"
        ></path>
        <path
          d="M5.568 11.639a4.869 4.869 0 01-.254-1.539c0-.534.092-1.053.254-1.539V6.462H2.862A8.097 8.097 0 002 10.1c0 1.307.313 2.544.862 3.638l2.706-2.099z"
          fill="#FBBC05"
        ></path>
        <path
          d="M10.1 5.222c1.19 0 2.257.408 3.096 1.21L15.52 4.11C14.117 2.803 12.283 2 10.1 2a8.097 8.097 0 00-7.238 4.462l2.706 2.099c.637-1.915 2.422-3.34 4.532-3.34z"
          fill="#EA4335"
        ></path>
      </g>
    </svg>
  );
};

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

const registerSchema = object().shape({
  email: string().email("Invalid email address").required("Required"),
  password: string()
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

const loginSchema = object().shape({
  email: string().email("Invalid email address").required(),
  password: string().required("Password cannot be empty"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = ({
  errorMsg = null,
  loginMode = false,
  onComplete,
  style,
}) => {
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
      pb={5}
      // py={5}
      // pt={5.5}
      width={"100%"}
      style={style}
    >
      <Typography pb={5} pt={1} color={"error"}>
        {errorMsg}
      </Typography>
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

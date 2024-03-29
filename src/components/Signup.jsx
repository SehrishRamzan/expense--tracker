import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Box, Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ToastNotify } from "../utils/ToastNotify";
import { useNavigate, Link } from "react-router-dom";
import { url } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px 30px",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    background: "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
    border: "none",
    height: "44px",
    cursor: "pointer",
    "&:hover": {
      background: "#EB3A5A",
    },
  },
  input: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
    height: "40px",
    border: "1px solid #eee",
    background: "transparent",
    borderRadius: "3px",
    padding: "0px 10px",
    color: "#fff",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    let resp = await axios.post(url + "/signup", data);
    if (resp.data.msg === "Email Already in Use") {
      setAlertState({
        open: true,
        message: resp.data.msg,
        severity: "error",
      });
    } else if (resp.data.msg === "Signed Up...!") {
      navigate("/login");
      setAlertState({
        open: true,
        message: `Signed up successfully`,
        severity: "success",
      });
    }
  };
  return (
    <Box py={4}>
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Container maxWidth="xs">
        <Box className={classes.paper}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar className={classes.avatar}></Avatar>
          </Box>
          <Typography component="h1" variant="h5" textAlign="center">
            Sign up
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
            id="reg-form"
          >
            <div>
              <Box
                component="label"
                fontSize={{ xs: "12px", sm: "14px" }}
                fontWeight="500"
                for="name"
              >
                Name
              </Box>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                className={classes.input}
                required
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <Box
                component="label"
                fontSize={{ xs: "12px", sm: "14px" }}
                fontWeight="500"
                for="email"
              >
                Email
              </Box>
              <input
                id="email"
                className={classes.input}
                type="email"
                placeholder="Enter Email"
                required
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <Box
                component="label"
                fontSize={{ xs: "12px", sm: "14px" }}
                fontWeight="500"
                for="password"
              >
                Password
              </Box>
              <input
                className={classes.input}
                minLength="6"
                required
                placeholder="Enter Password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div>
              <Box
                component="label"
                fontSize={{ xs: "12px", sm: "14px" }}
                fontWeight="500"
                for="contact"
                pt={3}
              >
                Contact No.
              </Box>
              <input
                id="contact"
                type="tel"
                name="contact"
                placeholder="03127654321"
                pattern="[0-9]{11}"
                className={classes.input}
                required
                {...register("contact")}
              />
            </div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <input className={classes.submit} type="submit" />
            </Box>
            <Box component="p" mt={2}>
              Already have account? <Link to="/login">Log in</Link>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

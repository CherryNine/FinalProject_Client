import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { authSignInErrorSelector } from "./store/auth.selectors";
import { signIn } from "./store/auth.actions";
import { signInSchema } from "./validators/authSchemas";
import Header from "components/header";

const SignIn = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector(authSignInErrorSelector);
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
    resolver: yupResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signInUser = async (values: FieldValues) => {
    const response = await dispatch<any>(signIn(values));
    if (response.payload.role === 'USER') navigation("/users");
    if (response.payload.role === 'ADMIN') navigation("/admin/users");
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    signInUser(data);
  };

  return (
    <>
    <Header />
      <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={10} md={8} lg={3} xl={3}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Box
              component="main"
              sx={{
                p: 2,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", m: 1 }}
              >
                LOGIN
              </Typography>
            </Box>
            {authError && (
              <Typography
                color="error.main"
                sx={{ fontSize: 16, fontWeight: "bold" }}
              >
                {authError}
              </Typography>
            )}
            {errors.email && (
              <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {errors.email.message}
              </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mb: 2 }}

                    {...field}
                    helperText={errors.email ? errors.email.message : ""}
                    error={!!errors.email}
                    label="email"
                    variant="outlined"
                  />
                )}
              />
              {errors.password && (
                <Typography color="error.main" sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {errors.password.message}
                </Typography>
              )}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%", mb: 2 }}

                    {...field}
                    helperText={errors.password ? errors.password.message : ""}
                    error={!!errors.password}
                    label="password"
                    variant="outlined"
                    type="password"
                  />
                )}
              />
              <Button
                sx={{ width: "100%", mb: 2 }}

                color="primary"
                disabled={!!(errors.email || errors.password)}
                variant="contained"
                type="submit"
                onClick={() => submitForm}
              >
                ENTER
              </Button>
              <Box sx={{ textAlign: "center" }}>

                <NavLink
                  to="/auth/sign-up"
                >
                  Registration
                </NavLink>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;

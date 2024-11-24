import {
  Button,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import classes from "./SignPages.module.css";

const SignInPage = () => {
  const { signIn, isSigningIn } = useAuthStore();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    signIn(values);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to the Message App!
        </Title>

        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Email address"
              placeholder="hello@gmail.com"
              size="md"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              size="md"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Button type="submit" fullWidth size="md" disabled={isSigningIn}>
              {isSigningIn ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.2rem",
                  }}
                >
                  <Loader color="white" size={"md"} />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          Don't have an account?{" "}
          <Link to={"/signup"} style={{ fontWeight: 700 }}>
            Sign Up
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

export default SignInPage;

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

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    signUp(values);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to the Message App!
        </Title>

        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="John Doe"
              size="md"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
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

            <Button type="submit" fullWidth size="md" disabled={isSigningUp}>
              {isSigningUp ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.2rem",
                  }}
                >
                  <Loader color="white" size="lg" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </Stack>
        </form>

        <Text ta="center" mt="md">
          I have an account{" "}
          <Link to={"/signin"} style={{ fontWeight: 700 }}>
            Sign In
          </Link>
        </Text>
      </Paper>
    </div>
  );
};

export default SignUpPage;

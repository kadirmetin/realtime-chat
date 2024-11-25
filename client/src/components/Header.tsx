import { Burger, Container, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import classes from "./Header.module.css";
import { ThemeChanger } from "./ThemeChanger";

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { signOut, authUser } = useAuthStore();
  const navigate = useNavigate();

  const links = authUser
    ? [
        {
          label: "Profile",
          onClick: () => {
            navigate("/profile");
          },
        },
        {
          label: "Sign Out",
          onClick: () => {
            signOut();
          },
        },
      ]
    : [
        {
          label: "Sign In",
          onClick: () => {
            navigate("/signIn");
          },
        },
      ];

  const items = links.map((link) => (
    <a key={link.label} className={classes.link} onClick={link.onClick}>
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Link to={"/"}>
          <Image h={32} w={32} src={"./logo.svg"} />
        </Link>
        <Group gap={5} visibleFrom="xs">
          <ThemeChanger />
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
};

export default Header;

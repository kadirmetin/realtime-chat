import {
  ActionIcon,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import cx from "clsx";
import { Moon, Sun } from "lucide-react";
import classes from "./ThemeChanger.module.css";

export function ThemeChanger() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="md"
        aria-label="Toggle color scheme"
      >
        <Sun className={cx(classes.icon, classes.light)} />
        <Moon className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </Group>
  );
}

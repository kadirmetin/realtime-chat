import { Flex, Image, Text } from "@mantine/core";
import styles from "./NoChat.module.css";

const NoChat = () => {
  return (
    <Flex
      h="100%"
      display="flex"
      direction="column"
      align="center"
      gap="md"
      justify="center"
    >
      <Image
        h={128}
        w={128}
        src="./logo.svg"
        className={styles.pulseAnimation}
      />
      <Text ta={"center"} size="xl">
        Welcome to the Message App!
      </Text>
      <Text ta={"center"} c="dimmed">
        Select a conversation from the sidebar to start chatting
      </Text>
    </Flex>
  );
};

export default NoChat;

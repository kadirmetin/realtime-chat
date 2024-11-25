import { Container, Flex, Paper } from "@mantine/core";
import Chat from "../components/Chat";
import NoChat from "../components/NoChat";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <Container size={"xl"} pt={"md"}>
      <Flex
        display={"flex"}
        direction={"row"}
        justify={"center"}
        align={"center"}
        gap={"sm"}
        style={{
          height: "calc(100vh - 72px)",
        }}
      >
        <Paper withBorder h={"100%"} w={"25%"} p={15}>
          <Sidebar />
        </Paper>
        <Paper withBorder h="100%" w="75%">
          {selectedUser ? <Chat /> : <NoChat />}
        </Paper>
      </Flex>
    </Container>
  );
};

export default HomePage;

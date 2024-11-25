import { Container, Flex, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Chat from "../components/Chat";
import NoChat from "../components/NoChat";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 425px)");

  return (
    <Container size="xl" py="md">
      <Flex
        direction="row"
        justify="center"
        align="center"
        gap="sm"
        style={{
          height: "calc(100vh - 88px)",
        }}
      >
        {isMobile ? (
          <>
            <Paper
              withBorder
              style={{
                height: "100%",
                width: selectedUser ? "0" : "100%",
                display: selectedUser ? "none" : "block",
              }}
              p="sm"
            >
              <Sidebar />
            </Paper>
            <Paper
              withBorder
              style={{
                height: "100%",
                width: selectedUser ? "100%" : "0",
                display: selectedUser ? "block" : "none",
              }}
              p="sm"
            >
              {selectedUser ? <Chat /> : <NoChat />}
            </Paper>
          </>
        ) : (
          <>
            <Paper withBorder style={{ height: "100%", width: "25%" }} p="sm">
              <Sidebar />
            </Paper>
            <Paper withBorder style={{ height: "100%", width: "75%" }} p="sm">
              {selectedUser ? <Chat /> : <NoChat />}
            </Paper>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default HomePage;

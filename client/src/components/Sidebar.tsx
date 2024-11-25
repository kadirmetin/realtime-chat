import {
  Avatar,
  Divider,
  Flex,
  Loader,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { Contact } from "lucide-react";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <Flex direction="column" h="100%" justify="center" align="center" gap={5}>
        <Loader size="lg" />
        <Text ta="center" size="sm" c="dimmed">
          Users loading...
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex align="center" w="100%" gap={5} mx={5}>
        <Contact />
        <Text size={"lg"}>Users</Text>
      </Flex>

      <Divider size="xs" my="sm" />
      <ScrollArea>
        <Flex direction="column" align="center" gap={10}>
          {users?.map((user) => (
            <Paper
              withBorder
              w="100%"
              p="sm"
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{
                cursor: "pointer",
                userSelect: "none",
                borderColor:
                  selectedUser?._id === user._id ? "gray" : undefined,
              }}
            >
              <Flex direction="row" align="center" gap={5}>
                <Flex pos="relative">
                  <Avatar
                    src={user?.profilePic || undefined}
                    size={48}
                    radius="xl"
                  />
                  <Flex
                    pos="absolute"
                    top={0}
                    right={0}
                    w={12}
                    h={12}
                    bg={
                      user && onlineUsers.includes(user?._id) ? "green" : "gray"
                    }
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                    }}
                  />
                </Flex>
                <Flex direction="column" align="flex-start">
                  <Text>{user.name}</Text>
                  <Flex
                    direction="row"
                    align="center"
                    justify="space-between"
                    w="100%"
                  >
                    <Text c="dimmed">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Paper>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
};

export default Sidebar;

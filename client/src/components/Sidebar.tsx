import {
  Avatar,
  Divider,
  Flex,
  Loader,
  Paper,
  ScrollArea,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";
import { Contact } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers.includes(user._id)) || []
    : users || [];

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
    <Flex display={"flex"} direction={"column"} h={"100%"}>
      <Flex align={"center"}>
        <Flex align="center" w="100%" gap={5} mx={5}>
          <Contact />
          <Text size={"lg"}>Users</Text>
        </Flex>

        <Tooltip label="Show onlines only" refProp="rootRef">
          <Switch
            color="green"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
        </Tooltip>
      </Flex>

      <Divider size="xs" my="sm" />
      <ScrollArea flex={1}>
        <Flex display={"flex"} direction={"column"} gap={10}>
          {filteredUsers?.map((user) => (
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

          {filteredUsers.length === 0 && (
            <Text ta={"center"} c={"dimmed"}>
              No online users
            </Text>
          )}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};

export default Sidebar;

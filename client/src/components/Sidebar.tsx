import {
  Avatar,
  Divider,
  Flex,
  Loader,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Contact } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    onlineUsers,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return (
      <Flex
        display={"flex"}
        direction={"column"}
        h={"100%"}
        justify={"center"}
        align={"center"}
        gap={5}
      >
        <Loader size="lg" />
        <Text ta={"center"} size="sm" c={"dimmed"}>
          Users loading...
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex display={"flex"} align={"center"} w={"100%"} gap={5} mx={5}>
        <Contact />
        <Text size={isMobile ? "sm" : "lg"}>Users</Text>{" "}
      </Flex>

      <Divider size={"xs"} my={"sm"} />
      <ScrollArea type="auto">
        <Flex display={"flex"} align={"center"} direction={"column"} gap={10}>
          {users?.map((user) => (
            <Paper
              withBorder
              w={"100%"}
              p={"sm"}
              key={user._id}
              onClick={() => {
                setSelectedUser(user._id);
              }}
              style={{
                cursor: "pointer",
                userSelect: "none",
                borderColor: selectedUser === user._id ? "gray" : "none",
              }}
            >
              <Flex display={"flex"} direction={"row"} align={"center"} gap={5}>
                <Flex pos={"relative"}>
                  <Avatar
                    src={user?.profilePic || undefined}
                    size={48}
                    radius={80}
                    style={{ display: "block", margin: "0, auto" }}
                  />
                  <Flex
                    pos={"absolute"}
                    top={0}
                    right={0}
                    w={12}
                    h={12}
                    bg={"gray"}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid white",
                    }}
                  />
                </Flex>
                {!isMobile && (
                  <Flex
                    display={"flex"}
                    direction={"column"}
                    align={"flex-start"}
                  >
                    <Text size={isMobile ? "sm" : "md"}>{user.name}</Text>
                    <Flex
                      display={"flex"}
                      direction={"row"}
                      align={"center"}
                      justify={"space-between"}
                      w={"100%"}
                    >
                      <Text c={"dimmed"} size={isMobile ? "xs" : "sm"}>
                        Offline
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Paper>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
};

export default Sidebar;

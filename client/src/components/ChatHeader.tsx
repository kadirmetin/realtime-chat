import { ActionIcon, Avatar, Divider, Flex, Group, Text } from "@mantine/core";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Flex
      display={"flex"}
      direction={"column"}
      justify={"space-between"}
      p={2.5}
      gap={5}
    >
      <Flex display={"flex"} direction={"row"} justify={"space-between"}>
        <Group gap={5}>
          <Avatar
            src={selectedUser?.profilePic || undefined}
            size={48}
            radius={80}
            style={{ display: "block", margin: "0, auto" }}
          />

          <Flex display={"flex"} direction={"column"} align={"flex-start"}>
            <Text size={"md"}>{selectedUser?.name}</Text>
            <Flex
              display={"flex"}
              direction={"row"}
              align={"center"}
              justify={"space-between"}
              w={"100%"}
            >
              <Text c={"dimmed"} size={"sm"}>
                {selectedUser && onlineUsers.includes(selectedUser._id)
                  ? "Online"
                  : "Offline"}
              </Text>
            </Flex>
          </Flex>
        </Group>

        <ActionIcon
          variant="transparent"
          color="gray"
          size="lg"
          radius="xl"
          aria-label="Close the chat"
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          <X />
        </ActionIcon>
      </Flex>

      <Divider size={"xs"} />
    </Flex>
  );
};

export default ChatHeader;

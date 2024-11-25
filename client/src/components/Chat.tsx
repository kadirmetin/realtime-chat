import { Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatBubble from "./ChatBubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!selectedUser) return;

    getMessages(selectedUser._id);
  }, [selectedUser]);

  if (isMessagesLoading)
    return (
      <Flex
        h={"100%"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"xs"}
      >
        <Loader size={"md"} />
        <Text ta={"center"} c={"dimmed"}>
          Loading...
        </Text>
      </Flex>
    );

  return (
    <Flex
      display={"flex"}
      direction={"column"}
      h={"100%"}
      w={"100%"}
      justify={"space-between"}
    >
      <ChatHeader />

      <ScrollArea flex={1}>
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser?._id;

          return (
            <ChatBubble
              key={message._id}
              avatarUrl={
                isOwnMessage
                  ? authUser.profilePic || undefined
                  : selectedUser?.profilePic || null
              }
              imageUrl={message?.image || undefined}
              message={message.text}
              isOwnMessage={isOwnMessage}
              timestamp={message.createdAt}
            />
          );
        })}
      </ScrollArea>

      <ChatInput />
    </Flex>
  );
};

export default Chat;

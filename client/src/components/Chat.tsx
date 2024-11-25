import { Flex, Loader, ScrollArea, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatBubble from "./ChatBubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const Chat = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser?._id);

    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("MESSAGES: ", messages);

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
            <div key={message._id}>
              <ChatBubble
                avatarUrl={
                  isOwnMessage
                    ? authUser.profilePic || ""
                    : selectedUser?.profilePic || ""
                }
                imageUrl={message?.image || undefined}
                message={message.text}
                isOwnMessage={isOwnMessage}
                timestamp={message.createdAt}
              />
              <div ref={messageEndRef}></div>
            </div>
          );
        })}
      </ScrollArea>

      <ChatInput />
    </Flex>
  );
};

export default Chat;

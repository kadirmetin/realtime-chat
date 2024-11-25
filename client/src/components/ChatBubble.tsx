import { Avatar, Group, Image, Paper, Text } from "@mantine/core";
import { FormatMessageTime } from "../utils/FormatMessageTime";

interface ChatBubbleProps {
  message: string;
  imageUrl?: string;
  avatarUrl: string;
  isOwnMessage: boolean;
  timestamp: Date;
}

const ChatBubble = ({
  message,
  imageUrl,
  avatarUrl,
  isOwnMessage,
  timestamp,
}: ChatBubbleProps) => {
  return (
    <Group
      align="flex-start"
      style={{
        width: "100%",
        marginBottom: "10px",
        justifyContent: isOwnMessage ? "flex-end" : "flex-start",
      }}
    >
      {!isOwnMessage && <Avatar src={avatarUrl} radius="xl" />}
      <Paper
        p="sm"
        bg={isOwnMessage ? "blue" : "gray"}
        style={{
          maxWidth: "80%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Message image"
            radius="md"
            style={{
              marginBottom: "8px",
              maxWidth: "100%",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        ) : null}
        <Text c={"gray"}>{message}</Text>
        <Text
          c={"dimmed"}
          style={{
            fontSize: "12px",
            marginTop: "5px",
            textAlign: isOwnMessage ? "right" : "left",
          }}
        >
          {FormatMessageTime(timestamp)}
        </Text>
      </Paper>
      {isOwnMessage && <Avatar src={avatarUrl} radius="xl" />}
    </Group>
  );
};

export default ChatBubble;

import {
  ActionIcon,
  FileButton,
  Flex,
  Image,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ImageIcon, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const ChatInput = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef(null);

  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const handleImageUpload = (file: File | null) => {
    if (!file) {
      setModalMessage("No file selected.");
      setModalOpen(true);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setModalMessage("Please upload a valid image file.");
      setModalOpen(true);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: message.trim(),
        image: imagePreview,
      });

      form.reset();
      removeImage();
    } catch (error) {}
  };

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <Modal opened={isModalOpen} onClose={() => setModalOpen(false)} centered>
        <Text>{modalMessage}</Text>
      </Modal>

      <Flex w="100%" p={2} direction="column">
        {imagePreview && (
          <Flex mb={3} align="center" gap="1rem">
            <div style={{ position: "relative" }}>
              <Image
                src={imagePreview}
                alt="Preview"
                height={120}
                width={120}
                style={{
                  objectFit: "cover",
                  borderRadius: "10%",
                }}
              />
              <ActionIcon
                variant="filled"
                color="gray"
                radius="xl"
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
                onClick={removeImage}
                aria-label="Remove Image"
              >
                <X style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            </div>
          </Flex>
        )}

        <form
          onSubmit={form.onSubmit(({ message }) => handleSendMessage(message))}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "1rem",
          }}
        >
          <TextInput
            w="100%"
            variant="filled"
            size="md"
            placeholder="Type your message..."
            {...form.getInputProps("message")}
          />

          <FileButton onChange={handleImageUpload} accept="image/*">
            {(props) => (
              <ActionIcon
                {...props}
                color="indigo"
                size="xl"
                radius="xl"
                variant="filled"
              >
                <ImageIcon />
              </ActionIcon>
            )}
          </FileButton>

          <ActionIcon size="xl" radius="xl" variant="filled" type="submit">
            <Send />
          </ActionIcon>
        </form>
      </Flex>
    </div>
  );
};

export default ChatInput;

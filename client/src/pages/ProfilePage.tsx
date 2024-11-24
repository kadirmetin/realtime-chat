import {
  ActionIcon,
  Avatar,
  Box,
  Container,
  FileButton,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import classes from "./ProfilePage.module.css";

const ProfilePage: React.FC = () => {
  const { authUser, isUpdatingProfilePic, updateProfilePic } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      await updateProfilePic({ profilePic: base64Image });
    };
  };

  return (
    <Container size={"sm"} my={30}>
      <Title className={classes.title} ta="center">
        Profile
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Your profile information
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Stack mt="lg" className={classes.controls}>
          <Box pos={"relative"} w={164} h={164} mx={"auto"} my={0}>
            <Avatar
              src={selectedImg || authUser?.profilePic || undefined}
              size={164}
              radius={80}
              style={{ display: "block", margin: "0, auto" }}
            />

            {isUpdatingProfilePic ? (
              <Flex
                pos={"absolute"}
                top={0}
                left={0}
                right={0}
                bottom={0}
                align={"center"}
                justify={"center"}
                bg={"rgba(0, 0, 0, 0.5)"}
                style={{
                  borderRadius: "50%",
                }}
              >
                <Loader color="white" size="lg" />
              </Flex>
            ) : (
              <FileButton
                onChange={(file) => handleImageUpload(file)}
                accept="image/*"
              >
                {(props) => (
                  <ActionIcon
                    {...props}
                    color="blue"
                    size="lg"
                    radius="xl"
                    variant="filled"
                    bottom={10}
                    right={10}
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Camera size={20} />
                  </ActionIcon>
                )}
              </FileButton>
            )}
          </Box>

          <Text ta="center" fz="sm" c="dimmed">
            Click the camera icon to update your profile picture
          </Text>
        </Stack>

        <Box my={"md"}>
          <Text size="lg">Account Information</Text>
        </Box>

        <Stack mt="lg" className={classes.controls}>
          <TextInput
            label="Name"
            placeholder={authUser?.name || ""}
            size="md"
            disabled
          />

          <TextInput
            label="Email address"
            placeholder={authUser?.email || ""}
            size="md"
            disabled
          />
        </Stack>

        <Stack mt="xl" className={classes.controls}>
          <Flex direction="column" gap="sm">
            <Flex justify="space-between" align="center">
              <Text>Member Since</Text>
              <Text>{authUser?.createdAt?.split("T")[0]}</Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text>Account Status</Text>
              <Text c="green">Active</Text>
            </Flex>
          </Flex>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProfilePage;

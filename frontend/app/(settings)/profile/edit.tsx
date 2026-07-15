import * as ImagePicker from "expo-image-picker";
import { fetchUserProfileAPI, updateUserProfileAPI } from "@/api/user.api";
import SettingsNav from "@/components/custom/SettingsNav";
import Success from "@/components/custom/Success";
import { useAuth } from "@/hooks/useAuth";
import { handleImageUpload } from "@/utils/uploadImageToSupabase";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  profilePicUrl: string;
}

const EditProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { token, user } = useAuth();

  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [pickedImage, setPickedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [profileUpdateComplete, setProfileUpdateComplete] = useState(false);

  const handleFetchProfile = async () => {
    setLoading(true);
    try {
      await fetchUserProfileAPI(token!, user?.id!)
        .then((res) => {
          setProfile(res.data.user);
          setProfilePicUrl(res.data.user?.profilePicUrl!);
          setName(res.data.user?.name!);
          setUsername(res.data.user?.username!);
          setBio(res.data.user?.bio!);
        })
        .catch((err) => {
          alert(err?.data?.response?.error ?? "Something went wrong");
        });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setPickedImage(asset);
      setProfilePicUrl(asset.uri); // instant preview
    }
  };

  const handleUpdateProfile = async () => {
    setUpdateLoading(true);
    try {
      let finalProfilePicUrl = profilePicUrl;

      if (pickedImage) {
        const response = await fetch(pickedImage.uri);
        const blob = await response.blob();

        const fileExt = pickedImage.uri.split(".").pop() || "jpg";
        const fileNameHint = `profile.${fileExt}`;

        const { publicUrl } = await handleImageUpload(
          blob,
          fileNameHint,
          "profilepic",
        );

        finalProfilePicUrl = publicUrl;
      }

      await updateUserProfileAPI(
        name,
        username.toLocaleLowerCase(),
        finalProfilePicUrl,
        bio,
        token!,
      )
        .then(() => {
          setProfileUpdateComplete(true);
        })
        .catch((err) => {
          alert(err.data.response?.error);
        });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    if (token) handleFetchProfile();
  }, [token]);

  if (profileUpdateComplete) {
    return (
      <Success
        title="Account Updated!"
        description="Your profile has been successfully updated."
        setProfileUpdateComplete={setProfileUpdateComplete}
      />
    );
  }

  if (loading || !profile) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={"#9d73d8"} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SettingsNav header="Edit Profile" />

        <TouchableOpacity
          onPress={pickImage}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Image
            source={{ uri: profile?.profilePicUrl! }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: "#eee",
              borderWidth: 3,
              borderColor: "#fff",
              shadowColor: "#9d73d8",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            gap: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              gap: 6,
            }}
          >
            <Text style={{ fontWeight: 600 }}>Full name</Text>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 10,
                paddingHorizontal: 16,
              }}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              gap: 6,
            }}
          >
            <Text style={{ fontWeight: 600 }}>Username</Text>
            <TextInput
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#D1D5DB",
                borderRadius: 10,
                paddingHorizontal: 16,
              }}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          {updateLoading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.buttonText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#AC97CA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 80,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F5FB",
  },
});

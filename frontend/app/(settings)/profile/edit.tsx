import { fetchUserProfileAPI } from "@/api/user.api";
import SettingsNav from "@/components/custom/SettingsNav";
import Success from "@/components/custom/Success";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
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

  const router = useRouter();

  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (token) handleFetchProfile();
  }, [token]);

  if (profileUpdateComplete) {
    return (
      <Success
        title="Account Updated!"
        description="Your profile has been successfully updated."
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
            gap: 10,
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
            <Text>Full name</Text>
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
            <Text>Username</Text>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
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

import { fetchUserProfileAPI } from "@/api/user.api";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  friends: string[];
  profilePicUrl: string;
}

const Settings = () => {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <View style={styles.main}>
        <Text>No Token</Text>
      </View>
    );
  }

  const handleFetchProfile = async () => {
    setLoading(true);
    try {
      await fetchUserProfileAPI(token, user?.id!)
        .then((res) => {
          console.log(res.data.user);
          setProfile(res.data.user);
        })
        .catch((err) => {
          alert(err.data.response.error);
        });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, [token]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ActivityIndicator color={"9d73d8"} size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View />
        <Text>{profile?.friends.length}</Text>
        <View />
      </View>
      <View style={styles.settings}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    backgroundColor: "#FFFFFF",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 66,
  },
  settings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

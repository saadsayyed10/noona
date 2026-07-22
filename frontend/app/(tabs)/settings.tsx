import { deleteUserProfileAPI, fetchUserProfileAPI } from "@/api/user.api";
import Success from "@/components/custom/Success";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  friends: string[];
  profilePicUrl: string;
}

const PRIMARY = "#9d73d8";
const DANGER = "#e34848";

const Settings = () => {
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [deleteSuccessFlag, setDeleteSuccessFlag] = useState(false);

  const handleFetchProfile = async () => {
    setLoading(true);
    try {
      await fetchUserProfileAPI(token!, user?.id!)
        .then((res) => {
          setProfile(res.data.user);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await handleFetchProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    if (token) handleFetchProfile();
  }, [token]);

  if (!token) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noTokenText}>No Token</Text>
      </View>
    );
  }

  if (loading || !profile) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={PRIMARY} size="large" />
      </View>
    );
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action can't be undone. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteUserProfileAPI(token!)
              .then(() => {
                setDeleteSuccessFlag(true);
              })
              .catch((err) => {
                alert(err.response.data.error);
              });
          },
        },
      ],
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      "Noona will miss you",
      "Are you sure you want to logout from your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/(auth)/login");
              alert("You have been logged out of the app");
            } catch (error: any) {
              alert(error.message);
            }
          },
        },
      ],
    );
  };

  if (deleteSuccessFlag) {
    return (
      <Success
        title="Account Deleted!"
        description="We are sorry to let you go, hope we meet soon."
        setTrigger={setDeleteSuccessFlag}
      />
    );
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={PRIMARY}
          colors={[PRIMARY]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        />
      }
    >
      <Text style={styles.title}>Settings</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: profile.profilePicUrl }}
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={() => {
              router.push("/(settings)/profile/edit");
            }}
            style={styles.cameraBadge}
          >
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.username}>@{profile.username}</Text>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{profile.friends?.length ?? 0}</Text>
          <Text style={styles.statLabel}>Chingudeul</Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsGroup}>
        <SettingsItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => {
            router.push("/(settings)/profile/edit");
          }}
        />
        <SettingsItem icon="lock-closed-outline" label="Change Password" />
        <SettingsItem icon="people-outline" label="Chingudeul (Friends)" />
        <SettingsItem
          icon="mail-unread-outline"
          label="Invitations"
          onPress={() => router.replace("/(users)/invitations")}
        />
        <SettingsItem icon="star-outline" label="Rate the App" />
        <SettingsItem icon="help-circle-outline" label="Help & Support" />
        <SettingsItem icon="shield-checkmark-outline" label="Privacy Policy" />
        <SettingsItem
          icon="log-out"
          label="Logout"
          danger
          onPress={handleLogout}
        />
        <SettingsItem
          icon="trash-outline"
          label="Delete Account"
          danger
          onPress={handleDeleteAccount}
        />
      </View>
    </ScrollView>
  );
};

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress?: () => void;
}

const SettingsItem = ({ icon, label, danger, onPress }: SettingsItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.iconWrapper, danger && styles.iconWrapperDanger]}>
          <Ionicons name={icon} size={18} color={danger ? DANGER : "#4b4b4b"} />
        </View>
        <Text style={[styles.itemLabel, danger && styles.itemLabelDanger]}>
          {label}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? DANGER : "#c4c4c4"}
      />
    </Pressable>
  );
};

export default Settings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#F7F5FB",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F5FB",
  },
  noTokenText: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1c1c1e",
    marginBottom: 24,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
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
    elevation: 4,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1c1c1e",
  },
  username: {
    fontSize: 14,
    color: "#9a9a9a",
    marginTop: 2,
    marginBottom: 16,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1c1c1e",
  },
  statLabel: {
    fontSize: 12,
    color: "#9a9a9a",
    marginTop: 2,
  },
  optionsGroup: {
    width: "100%",
    gap: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  itemPressed: {
    backgroundColor: "#F2EEFA",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F2EEFA",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapperDanger: {
    backgroundColor: "#FDECEC",
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1c1c1e",
  },
  itemLabelDanger: {
    color: DANGER,
  },
});

import { fetchAllUsersAPI } from "@/api/user.api";
import ChatSkeleton from "@/components/custom/ChatSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ChevronLeft, Search, UserRoundPlus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FetchAllUsers {
  id: string;
  name: string;
  username: string;
  profilePicUrl: string;
}

export default function FindUsers() {
  const [users, setUsers] = useState<FetchAllUsers[]>([]);
  const { token } = useAuth();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFetchAllUsers = async () => {
    setLoading(true);
    try {
      await fetchAllUsersAPI(token!)
        .then((res) => {
          console.log(res.data.users);
          setUsers(res.data.users);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllUsers();
  }, [token]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={32} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c1c1e" }}>
            Find Chingudeul
          </Text>
          <View />
        </View>

        <View style={styles.inputWrapper}>
          <Search size={20} color="#939292" style={styles.icon} />
          <TextInput
            placeholder="Search to add new friends..."
            style={styles.input}
          />
        </View>

        {loading ? (
          <ChatSkeleton />
        ) : users.length < 1 ? (
          <Text>No users found</Text>
        ) : (
          users.map((user) => (
            <View
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 14,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{ uri: user.profilePicUrl }}
                  style={{ width: 60, height: 60, borderRadius: "100%" }}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>{user.name}</Text>
                  <Text style={{ fontSize: 11, color: "#929292" }}>
                    @{user.username}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  gap: 8,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity>
                  <UserRoundPlus color={"#AC97CA"} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 16,
  },

  inputWrapper: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  chatText: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

import { fetchAllInvitesAPI } from "@/api/invite.api";
import ChatSkeleton from "@/components/custom/ChatSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Check, ChevronLeft, Search, Send, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

interface FetchAllInvitations {
  id: string;
  sender: {
    name: string;
    username: string;
    profilePicUrl: string;
  };
}

const Invitations = () => {
  const [invitations, setInvitations] = useState<FetchAllInvitations[]>([]);
  const [status, _setStatus] = useState<"sent" | "receive">("receive");
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFetchAllInvites = async () => {
    setLoading(true);
    try {
      await fetchAllInvitesAPI(status, token!)
        .then((res) => {
          console.log(JSON.stringify(res.data.invitations));
          setInvitations(res.data.invitations[0].recieveInvitations);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllInvites();
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
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={32} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c1c1e" }}>
            Pending Requests
          </Text>
          <TouchableOpacity>
            <Send />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ChatSkeleton />
        ) : invitations.length < 1 ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Text>No users found</Text>
          </View>
        ) : (
          invitations.map((user) => (
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
                  source={{ uri: user.sender.profilePicUrl }}
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
                  <Text style={{ fontWeight: 600 }}>{user.sender.name}</Text>
                  <Text style={{ fontSize: 11, color: "#929292" }}>
                    @{user.sender.username}
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
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity>
                    <Check color={"#AC97CA"} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <X color={"#AC97CA"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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

export default Invitations;

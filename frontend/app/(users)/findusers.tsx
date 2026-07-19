import ChatSkeleton from "@/components/custom/ChatSkeleton";
import { useRouter } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import { useState } from "react";
import {
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
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

        <ChatSkeleton />
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

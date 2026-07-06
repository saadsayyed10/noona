import { Link, router } from "expo-router";
import {
  ChevronLeft,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  User2,
  Mail,
} from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const NameEmail = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.top}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                  <ChevronLeft size={26} color="#000000" />
                </TouchableOpacity>

                <View style={styles.progress}>
                  <View style={styles.dotActive} />
                  <View style={styles.progressLine} />
                  <View style={styles.dotInactive} />
                  <View style={styles.progressLine} />
                  <View style={styles.dotInactive} />
                </View>

                <View style={{ width: 26 }} />
              </View>

              <Image
                source={require("../../../assets/images/register.png")}
                style={styles.logo}
              />

              <View style={styles.welcome}>
                <Text style={{ fontSize: 22, fontWeight: "800" }}>
                  Create your account
                </Text>
                <Text style={{ color: "#939292" }}>Step 1 of 3</Text>

                <View style={styles.inputs}>
                  <View style={styles.inputWrapper}>
                    <User2 size={20} color="#939292" style={styles.icon} />
                    <TextInput
                      placeholder="Name"
                      style={styles.input}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Mail size={20} color="#939292" style={styles.icon} />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push("/(auth)/register/username-password")
                }
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  top: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#AC97CA",
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E1EC",
  },
  progressLine: {
    width: 16,
    height: 1,
    backgroundColor: "#E5E1EC",
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginTop: 10,
  },
  welcome: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  inputs: {
    width: "100%",
    gap: 16,
    marginTop: 24,
  },
  inputWrapper: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  helperText: {
    width: "100%",
    fontSize: 12,
    color: "#939292",
    marginTop: -6,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#AC97CA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NameEmail;

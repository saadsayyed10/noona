import { registerUserAPI } from "@/api/user.api";
import { useAuth } from "@/hooks/useAuth";
import { useSignUp } from "@/hooks/useSignUp";
import { Link, router } from "expo-router";
import { ChevronLeft, AtSign, Lock, Eye, EyeOff } from "lucide-react-native";
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
  ActivityIndicator,
} from "react-native";

const ConfirmPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { name, email, username, password, reset } = useSignUp();
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (confirmPassword != password) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUserAPI(name!, email!, username!, password!)
        .then((res) => {
          console.log(res.data.message);
          const { token, user } = res.data;

          setAuth(token, user);
          router.push("/(auth)/register/success");
        })
        .catch((err) => {
          console.log(JSON.stringify(err.response?.data, null, 2));
          alert(err.response?.data?.message ?? "Something went wrong");
        });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
                  <View style={styles.dotInactive} />
                  <View style={styles.progressLine} />
                  <View style={styles.dotInactive} />
                  <View style={styles.progressLine} />
                  <View style={styles.dotActive} />
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
                <Text style={{ color: "#939292" }}>Step 3 of 3</Text>

                <View style={styles.inputs}>
                  <View style={styles.inputWrapper}>
                    <Lock size={20} color="#939292" style={styles.icon} />
                    <TextInput
                      placeholder="Confirm Password"
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color="#939292" />
                      ) : (
                        <Eye size={20} color="#939292" />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.helperText}>
                    Please confirm your password.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
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

export default ConfirmPassword;

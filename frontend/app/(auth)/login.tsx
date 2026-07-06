import { Link } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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

const Login = () => {
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
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />

            <View style={styles.form}>
              <View style={styles.welcome}>
                <Text style={{ fontSize: 26, fontWeight: "800" }}>
                  Welcome back!
                </Text>
                <Text style={{ color: "#939292" }}>Login to continue</Text>

                <View style={styles.inputs}>
                  <View style={styles.inputWrapper}>
                    <Mail size={20} color="#939292" style={styles.icon} />
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <Lock size={20} color="#939292" style={styles.icon} />
                    <TextInput
                      placeholder="Password"
                      style={styles.input}
                      secureTextEntry={!showPassword}
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
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <Text>
                Don't have an account?{" "}
                <Link href={"/(auth)/register/name-email"}>
                  <Text style={styles.registerText}>Register</Text>
                </Link>
              </Text>
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
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  form: {
    width: "100%",
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
  registerText: {
    fontWeight: "bold",
    color: "#AC97CA",
  },
});

export default Login;

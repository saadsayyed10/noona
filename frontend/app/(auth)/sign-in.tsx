import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Mail, Lock } from "lucide-react-native";

const SignIn = () => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-between items-center w-full py-16 px-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require("../../assets/images/logos/Logo.png")}
            className="w-72 h-72"
          />

          {/* Input fields */}
          <View className="flex justify-start items-start w-full gap-y-6">
            {/* Message */}
            <View className="flex justify-center items-center w-full gap-y-1">
              <Text className="text-4xl text-neutral-800 tracking-wide text-center w-full font-semibold">
                Welcome back!
              </Text>

              <Text className="text-base text-neutral-400 tracking-wide text-center w-full">
                Login to continue
              </Text>
            </View>

            {/* Email */}
            <View className="flex justify-start items-center w-full flex-row gap-x-4 h-16 border border-neutral-500/40 rounded-lg px-4">
              <Mail size={20} color="#404040" />

              <TextInput
                placeholder="Email"
                className="flex-1"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View className="flex justify-start items-start w-full gap-y-2">
              <View className="flex justify-start items-center w-full flex-row gap-x-4 h-16 border border-neutral-500/40 rounded-lg px-4">
                <Lock size={20} color="#404040" />

                <TextInput
                  placeholder="Password"
                  className="flex-1"
                  secureTextEntry
                />
              </View>

              {/* Redirect to Forgot Password screen */}
              <View className="flex justify-between items-center w-full flex-row">
                <Text />

                <Text className="font-medium text-purple-700/50 tracking-wide text-sm">
                  Forgot Password?
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom section */}
          <View className="flex justify-center items-center w-full gap-y-4">
            {/* Sign-in button */}
            <TouchableOpacity className="bg-purple-700/50 w-full py-4 rounded-lg">
              <Text className="text-white text-center text-lg font-semibold tracking-wide">
                Login
              </Text>
            </TouchableOpacity>

            {/* Redirect to sign up screen */}
            <View className="flex justify-center items-center w-full flex-row gap-x-1">
              <Text className="text-sm text-neutral-800 tracking-wide">
                Don't have an account?
              </Text>

              <Text className="font-medium text-purple-700/50 tracking-wide">
                Register
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
};

export default SignIn;

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
import { Mail, Lock, User } from "lucide-react-native";
import { useRouter } from "expo-router";

const SignUpStep1 = () => {
  const router = useRouter();

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-between items-center w-full py-20 px-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Tracker and Logo */}
          <Image
            source={require("../../../assets/images/logos/Logo_No_Slogan.png")}
            className="w-64 h-52"
          />

          {/* Input fields */}
          <View className="flex justify-start items-start w-full gap-y-6">
            {/* Message */}
            <View className="flex justify-center items-center w-full gap-y-1">
              <Text className="text-4xl text-neutral-800 tracking-wide text-center w-full font-semibold">
                Create your account
              </Text>

              <Text className="text-base text-neutral-400 tracking-wide text-center w-full">
                Step 1 of 3
              </Text>
            </View>

            {/* Name */}
            <View className="flex justify-start items-center w-full flex-row gap-x-4 h-16 border border-neutral-500/40 rounded-lg px-4">
              <User size={20} color="#404040" />

              <TextInput
                placeholder="Full Name"
                className="flex-1"
                keyboardType="default"
                autoCapitalize="none"
              />
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
          </View>

          {/* Bottom section */}
          <View className="flex justify-center items-center w-full gap-y-4">
            {/* Sign-in button */}
            <TouchableOpacity className="bg-purple-700/50 w-full py-4 rounded-lg">
              <Text className="text-white text-center text-lg font-semibold tracking-wide">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
};

export default SignUpStep1;

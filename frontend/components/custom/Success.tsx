import { useAuth } from "@/hooks/useAuth";
import { useSignUp } from "@/hooks/useSignUp";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const Success = ({
  title,
  description,
  setTrigger,
}: {
  title: string;
  description: string;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { hydrate, token } = useAuth();
  const { reset } = useSignUp();

  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.circleWrapper}>
          <Image
            source={require("../../assets/images/success_register.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.welcome}>
          <Text style={{ fontSize: 22, fontWeight: "800" }}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            reset();
            router.replace("/settings");
          }}
        >
          <Text
            style={styles.buttonText}
            onPress={() => {
              router.replace("/settings");
              setTrigger(false);
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  top: {
    width: "100%",
    alignItems: "center",
    gap: 24,
  },
  circleWrapper: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#F1EDF7",
  },
  sparkle: {
    position: "absolute",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  welcome: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  subtitle: {
    color: "#939292",
    textAlign: "center",
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

export default Success;

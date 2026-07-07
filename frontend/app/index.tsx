import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { token, logout } = useAuth();

  return (
    <View style={styles.container}>
      {token ? (
        <Text
          onPress={() => {
            logout();
          }}
        >
          Logout
        </Text>
      ) : (
        <Link href={"/(auth)/login"}>
          <Text>Login Screen</Text>
        </Link>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

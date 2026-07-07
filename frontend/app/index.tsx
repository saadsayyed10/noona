import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { hydrate, token, logout } = useAuth();

  useEffect(() => {
    hydrate();
  }, [token]);

  return (
    <View style={styles.container}>
      {token ? (
        <View>
          <Text
            onPress={() => {
              logout();
            }}
          >
            Logout
          </Text>
          <Text>{token}</Text>
        </View>
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

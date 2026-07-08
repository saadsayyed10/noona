import { StyleSheet, Text, View } from "react-native";

const Chat = () => {
  return (
    <View style={styles.main}>
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

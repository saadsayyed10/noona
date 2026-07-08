import { StyleSheet, Text, View } from "react-native";

const Noona = () => {
  return (
    <View style={styles.main}>
      <Text>Noona</Text>
    </View>
  );
};

export default Noona;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
});

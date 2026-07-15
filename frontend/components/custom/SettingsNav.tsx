import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const SettingsNav = ({ header }: { header: string }) => {
  const router = useRouter();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        marginTop: 40,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <ChevronLeft size={32} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#1c1c1e" }}>
        {header}
      </Text>
      <View />
    </View>
  );
};

export default SettingsNav;

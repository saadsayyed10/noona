import { Tabs } from "expo-router";
import { Flower, Home, MessageCircle, Settings } from "lucide-react-native";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e793e7",
        tabBarInactiveTintColor: "#e4d1de",

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },

        tabBarItemStyle: {
          paddingVertical: 8,
        },

        tabBarStyle: {
          height: 88,
          borderTopWidth: 1,
          borderColor: "#e8e8e8",
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <MessageCircle color={color} />,
        }}
      />

      <Tabs.Screen
        name="noona"
        options={{
          title: "Noona",
          tabBarIcon: ({ color }) => <Flower color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}

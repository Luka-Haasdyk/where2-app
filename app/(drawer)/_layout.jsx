import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { logoutUser } from "../../custom/api";
import { useNavigation } from "expo-router";

const _layout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logoutUser();
    navigation.navigate("index");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: "left",
          drawerStyle: { backgroundColor: "white", width: 350 },
          drawerLabelStyle: { fontSize: 20, color: "black" },
        }}
      >
        {/* Regular Screens */}
        <Drawer.Screen name="home" options={{ title: "My Interests" }} />
        <Drawer.Screen
          name="eventList"
          options={{ title: "Upcoming Events" }}
        />

        {/* Log out button */}
        <Drawer.Screen
          name="logout"
          options={{
            title: "Log Out", // Custom title for the sidebar
            drawerLabelStyle: { paddingVertical: 10, color: "red", fontWeight: "bold" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default _layout;

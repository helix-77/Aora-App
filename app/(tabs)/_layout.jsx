import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-6 w-6"
      />
      <Text
        className={`text-xs ${focused ? "font-psemibold" : "font-pregular"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF9C01",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            height: 84,
            backgroundColor: "#161622",
            borderTopWidth: 4,
            borderTopColor: "#161622",
          },
        }}
      >
        <Tabs.Screen
          name="home" // route name
          options={{
            title: "Home", // title (can be any name)
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home" // name of the tab
                focused={focused}
                color={color}
                icon={icons.home}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Profile"
                focused={focused}
                color={color}
                icon={icons.profile}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Create"
                focused={focused}
                color={color}
                icon={icons.plus}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Bookmark"
                focused={focused}
                color={color}
                icon={icons.bookmark}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

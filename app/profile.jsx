import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

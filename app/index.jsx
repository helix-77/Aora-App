import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="h-[300px] w-full"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-100">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-3 -right-7 h-[15px] w-[120px]"
              resizeMode="contain"
            />
          </View>

          <View className="mt-8">
            <Text className="text-center text-gray-400">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora
            </Text>
          </View>

          <View className="">
            <CustomButton
              title={"Continue With E-mail"}
              onclick={() => { router.push('/sign-in') }}
              containerStyles="mt-8 px-16"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>

  );
}

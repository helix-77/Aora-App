import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-[15vh] w-full px-4 " >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px]"
          />
          <Text className="mb-6 font-psemibold text-xl text-white">
            Sign Up
          </Text>

          <FormField
            title="Username"
            placeholder="Your unique username"
            value={form.username}
            handleChangeText={(e) =>
              setform({
                ...form,
                username: e
              })
            }
            extraStyles="mb-5"
            keyboardType="email-address"
          />

          <FormField
            title="Email"
            placeholder="Your Email..."
            value={form.email}
            handleChangeText={(e) =>
              setform({
                ...form,
                email: e
              })
            }
            extraStyles=""
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e) =>
              setform({
                ...form,
                password: e
              })
            }
            extraStyles="mt-5"

          />

          <CustomButton
            title={"Sign up"}
            containerStyles={"mt-8"}
            isLoaded={isSubmitting}
          />

          <View className="flex-row justify-center mt-4">
            <Text className=" text-gray-400  "> Already have an account? </Text>
            <Link href='/sign-in' className="text-secondary font-psemibold"> Login </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-[20vh] w-full px-4 " >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px]"
          />
          <Text className="mb-6 font-psemibold text-xl text-white">
            Sign in
          </Text>

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
            title={"Sign In"}
            containerStyles={"mt-8"}
            isLoaded={isSubmitting}
          />

          <View className="flex-row justify-center mt-4">
            <Text className=" text-gray-400  "> Don't have an account? </Text>
            <Link href='/sign-up' className="text-secondary font-psemibold"> Sign Up </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

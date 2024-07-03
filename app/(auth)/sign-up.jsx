import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password)
      return Alert.alert("Please fill all the fields");

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      // set it to the global state....
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-[12vh] w-full px-4">
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
                username: e,
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
                email: e,
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
                password: e,
              })
            }
            extraStyles="mt-5"
          />

          <CustomButton
            title={"Sign up"}
            containerStyles={"mt-8"}
            isLoaded={isSubmitting}
            onclick={handleSubmit}
          />

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-400"> Already have an account? </Text>
            <Link href="/sign-in" className="font-psemibold text-secondary">
              {" "}
              Login{" "}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

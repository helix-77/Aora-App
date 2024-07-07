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
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-[18vh] w-full px-4">
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
              setForm({
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
              setForm({
                ...form,
                password: e,
              })
            }
            extraStyles="mt-5"
          />

          <CustomButton
            title={"Sign In"}
            containerStyles={"mt-8"}
            isLoaded={isSubmitting}
            onclick={handleSubmit}
          />

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-400"> Don't have an account? </Text>
            <Link href="/sign-up" className="font-psemibold text-secondary">
              {" "}
              Sign Up{" "}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

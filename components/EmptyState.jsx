import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="items-center justify-center px-4">
            <Image
                source={images.empty}
                className="h-[215px] w-[100vh]"
                resizeMode="contain"
            />
            <Text className="mb-1 font-psemibold text-xl text-gray-100">{title}</Text>
            <Text className="text-gray-400">{subtitle}</Text>

            <CustomButton
                title="Create Videos"
                containerStyles="mt-8 py-3 w-full"
                onclick={() => router.push('/create')}

            />
        </View>
    );
};

export default EmptyState;

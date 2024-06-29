import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { isLoaded } from "expo-font";

const CustomButton = ({ title, onclick, textStyles, containerStyles, isLoaded }) => {
    return (
        <TouchableOpacity
            onPress={onclick}
            activeOpacity={0.8}
            className={` bg-secondary rounded-xl py-3 justify-center 
                ${isLoaded ? " opacity-50 " : " "}
                ${containerStyles}

             `}
            disabled={isLoaded}
        >
            <Text className={`font-psemibold text-base text-center ${textStyles} `}> {title} </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
    title,
    placeholder,
    value,
    handleChangeText,
    extraStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${extraStyles} `}>
            {/* title */}
            <Text className="font-pregular text-sm text-[#CDCDE0]">{title}</Text>

            {/* text-field */}
            <View className="h-12 w-full flex-row justify-center rounded-xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
                <TextInput
                    className="flex-1 font-psemibold text-white"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        className="justify-center"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="h-6 w-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;

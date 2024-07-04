import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Images, icons, images } from "../constants";

const SearchInput = ({
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

            {/* text-field */}
            <View className="h-12 w-full flex-row justify-center rounded-xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
                <TextInput
                    className="flex-1 font-pregular text-white text-base "
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />

                <TouchableOpacity className="justify-center" >
                    <Image source={icons.search}
                        className="h-5 w-5"
                        resizeMode="contain"

                    />
                </TouchableOpacity>


            </View>
        </View>
    );
};

export default SearchInput;

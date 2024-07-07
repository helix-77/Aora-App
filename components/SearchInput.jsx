import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Images, icons, images } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  placeholder,
  value,
  handleChangeText,
  extraStyles,
  initialQuery,
  ...props
}) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className={`space-y-2 ${extraStyles} `}>
      {/* text-field */}
      <View className="h-12 w-full flex-row justify-center rounded-xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 font-pregular text-base text-white"
          value={query}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          className="justify-center"
          onPress={() => {
            if (!query) {
              return Alert.alert("Please enter a valid search query");
            }

            if (pathName.startsWith("/search/")) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }}
        >
          <Image
            source={icons.search}
            className="h-5 w-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;

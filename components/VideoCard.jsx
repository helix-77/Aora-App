import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const VideoCard = ({
  post: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="mb-14 flex flex-col items-center px-4">
      <View className="flex flex-row items-start gap-3">
        <View className="flex flex-1 flex-row items-center justify-center">
          <View className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-secondary p-0.5">
            <Image
              source={{ uri: avatar }}
              className="h-full w-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="ml-3 flex flex-1 justify-center gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-pregular text-xs text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="h-5 w-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        /* <Image
          source={{ uri: video }}
          className="mt-3 h-60 w-full rounded-xl"
        /> */
        <View className="relative mb-2 mt-4 items-center justify-center">
          <TouchableOpacity
            className="text-white"
            onPress={() => setPlay(false)}
          >
            <Text className="text-white"> Playing </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative mt-3 flex h-60 w-full items-center justify-center rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="mt-3 h-full w-full rounded-xl"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

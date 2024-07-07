import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  // console.log(posts);
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard post={item} />}
        ListHeaderComponent={() => (
          <>
            <TouchableOpacity
              className="mx-4 my-4 flex flex-row justify-end"
              onPress={logout}
            >
              <Image source={icons.logout} className="h-5 w-5" />
            </TouchableOpacity>

            <View className="mx-5 flex-1 flex-row justify-center bg-primary">
              <View className="flex flex-col items-center justify-center">
                <View className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-secondary p-0.5">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="h-full w-full rounded-lg"
                    resizeMode="cover"
                  />
                </View>
                <Text className="mb-4 mt-3 font-psemibold text-xl text-white">
                  {user?.username}
                </Text>

                <View className="flex flex-row justify-center gap-6">
                  <View className="flex flex-col items-center">
                    <Text className="font-plight text-white">
                      {posts.length}
                    </Text>
                    <Text className="font-plight text-gray-400">Posts</Text>
                  </View>
                  <View className="mb-6 flex flex-col items-center">
                    <Text className="font-plight text-white">1.2K</Text>
                    <Text className="font-plight text-gray-400">Views</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to create videos"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

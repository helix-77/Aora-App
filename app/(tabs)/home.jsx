import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
            <View className="mx-5 mt-5 flex-1 flex-row justify-between bg-primary">
              <View>
                <Text className="mb-2 text-gray-200">Welcome Back, </Text>
                <Text className="font-psemibold text-3xl text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="">
                <Image
                  source={images.logoSmall}
                  className="mt-3 h-9 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View>
              <SearchInput
                title="Search"
                placeholder="Search for a video topic"
                extraStyles="mx-5 mt-5"
              />
            </View>

            <View className="mx-5 mt-5 pb-8">
              <Text className="mb-3 text-lg text-gray-300">
                Trending Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to create videos"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

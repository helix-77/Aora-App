import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { icons, images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: type === "video" ? "video/*" : "image/*",
    });

    // if(result.type === 'success') {
    //   setForm({
    //     ...form,
    //     [type]: result,
    //   });
    // }

    if (!result.canceled) {
      if (type === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
      if (type === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Error", "No file selected");
      }, 100);
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleVideoUpload = () => {};

  const handleSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Please fill all fields");
      return;
    }

    setUploading(true);

    try {
      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");

      // const video = await createUser({
      //   title: form.title,
      //   video: form.video.uri,
      //   thumbnail: form.thumbnail.uri,
      //   prompt: form.prompt,
      // });

      // if(video) {
      //   setUploading(false);
      //   router.push('/home');
      // } else {
      //   setUploading(false);
      //   Alert.alert('Error', 'Failed to upload video');
      // }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="my-[10vh] w-full px-4">
          <Text className="mb-6 font-pbold text-2xl text-white">
            Upload Video
          </Text>

          <FormField
            title="Video Title"
            placeholder="Give your video a catchy title..."
            value={form.title}
            handleChangeText={(e) =>
              setForm({
                ...form,
                title: e,
              })
            }
            extraStyles="mb-5"
          />

          <View>
            <Text className="mb-2 font-pregular text-sm text-[#CDCDE0]">
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  resizeMode={ResizeMode.COVER}
                  className="h-40 w-full rounded-2xl"
                  useNativeControls
                  isLooping
                />
              ) : (
                <View className="flex h-40 w-full items-center justify-center rounded-2xl border border-black-200 bg-black-100 px-4">
                  <View className="flex h-14 w-14 items-center justify-center border border-dashed border-secondary">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="h-5 w-5"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text className="mb-2 mt-6 font-pregular text-sm text-[#CDCDE0]">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.video ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  className="h-40 w-full rounded-2xl"
                />
              ) : (
                <View className="h-18 flex w-full flex-row items-center justify-center rounded-2xl border border-black-200 bg-black-100 px-4">
                  <View className="flex h-12 w-12 items-center justify-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="h-1/2 w-1/2"
                    />
                  </View>
                  <Text className="text-xs text-gray-200">Chose a file</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title="AI Prompt"
            value={form.prompt}
            handleChangeText={(e) =>
              setForm({
                ...form,
                prompt: e,
              })
            }
            extraStyles="mt-5"
          />

          <CustomButton
            title={"Submit & Publish"}
            containerStyles={"mt-8"}
            onclick={handleSubmit}
            isLoaded={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.helix.aora",
  projectID: "6682b9ae000dadf41e11",
  databaseID: "6682bc3f0030f0922a0c",
  userCollectionID: "6682bc5f003d8e0fd4c9",
  videoCollectionID: "6682bc8d002a03aaeaa4",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectID) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );
    if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseID,
      config.userCollectionID,
      ID.unique(),
      {
        accountID: newAccount.$id,
        email,
        username,
        avatar: avatarURL,
        // role: "user",
      },
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseID,
      config.userCollectionID,
    );

    [Query.equal("accountID", currentAccount.$id)];

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
    );
    // if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.orderDesc("$createdAt", Query.limit(7))],
    );
    // if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.search("title", query)],
    );
    // if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.equal("creator", userId)],
    );
    // if (!posts) throw Error;
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadFile = async (file, type) => {
  if (!file) {
    return;
  }
  const { mimeType, ...rest } = file;
  const assets = { type, mimeType, ...rest };

  try {
    const uploadedFile = await Storage.createFile(
      storageId,
      ID.unique(),
      asset,
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (form) => {
  try {
    const [videoURL, thumbnailURL] = await Promise.all([
      uploadFile(form.video, "video"),
      uploadFile(form.thumbnail, "image"),
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

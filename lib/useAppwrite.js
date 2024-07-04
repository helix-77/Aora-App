import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [Isloading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        fetchData();
    }

    return { data, Isloading, refetch }


};

export default useAppwrite;

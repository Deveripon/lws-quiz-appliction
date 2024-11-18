import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
    const [data, setData] = useState(
        JSON.parse(localStorage.getItem(key)) || defaultValue
    );

    useEffect(() => {
        console.log("Data updated:", data);
        localStorage.setItem(key, JSON.stringify(data));
    }, [data, key]);

    return {
        data,
        setData,
    };
};

export default useLocalStorage;

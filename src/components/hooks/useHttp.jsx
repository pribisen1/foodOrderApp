import { useCallback, useEffect, useState } from "react";


async function sendHttpRequest(url,config){
    const response = await fetch(url,config);
    const restData = await response.json();

    if(!response.ok){
        throw new Error(
            restData.message || 'Something went wrong, failed to send request'
        );
    }
    return restData;
}

export default function useHttp(url,config,initialData){
    const [data,setData] = useState(initialData);
    const [isLoading,setIsLoading] = useState();
    const [error,setError] = useState();

    function clearData (){
        setData(initialData);
    }
    const sendRequest = useCallback( async function sendRequest(data){
        setIsLoading(true);
        try {
            const restData = await sendHttpRequest(url,{...config,body:data});
            setData(restData);

        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    },[url,config]);

    useEffect(()=>{
        if(config && (config.method === 'GET' || !config.method) || !config){
            sendRequest();
        }
    },[sendRequest,config]);
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData,
    }
}


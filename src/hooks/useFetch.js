import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || {},
        body: requestConfig.body || null,
      });

      if (!response.ok) {
        throw new Error("Zapytanie nie powiodło się!");
      }
      const data = await response.json();

      if (data) applyData(data);
    } catch (error) {
      setError(error.message || "Coś nie tak");
    }

    setIsLoading(false);
  };

  return { isLoading, error, sendRequest };
};

export default useFetch;

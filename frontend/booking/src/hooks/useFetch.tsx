import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUrl = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/${url}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/${url}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;

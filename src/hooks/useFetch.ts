import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data.data);
      setData(response.data.data);
    });
  }, []);

  return { data };
}

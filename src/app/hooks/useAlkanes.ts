import { useQuery, useQueryClient } from "@tanstack/react-query";
import { provider } from "../constants";

const fetchAlkanes = async (limit: number) => {
  if (!provider?.alkanes?.getAlkanes) {
    throw new Error("Provider or getAlkanes function is undefined");
  }

  const result = await provider.alkanes.getAlkanes({ limit });
  return result;
};

export const useAlkanesQuery = (limit: number) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["alkanes", limit], // Unique key for the query
    queryFn: () => fetchAlkanes(limit), // Function to fetch data
    staleTime: 1000 * 60 * 5, // Optional: Keep data fresh for 5 minutes
  });
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Provider } from "@oyl/sdk";
import { configDotenv } from "dotenv";

configDotenv();

const fetchAlkanes = async (limit: number, provider: Provider) => {
  if (!provider?.alkanes?.getAlkanes) {
    throw new Error("Provider or getAlkanes function is undefined");
  }
  const result = await provider.alkanes.getAlkanes({ limit });
  return result;
};

export const useAlkanesQuery = (limit: number, provider: Provider) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["alkanes"], // Unique key for the query
    queryFn: () => fetchAlkanes(limit, provider), // Function to fetch data
    staleTime: 1000 * 60 * 3, // Optional: Keep data fresh for 5 minutes
  });
};

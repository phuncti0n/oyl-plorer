import { useQuery, useQueryClient } from "@tanstack/react-query";
import { provider } from "../constants";

const fetchAlkanes = async (block: string, tx: string) => {
  const result = await provider.alkanes.getAlkaneById({ block, tx });
  return result;
};

export const useAlkaneByIdQuery = (block: string, tx: string) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["alkaneById", block, tx], // Unique key for the query
    queryFn: () => fetchAlkanes(block, tx), // Function to fetch data
    staleTime: 1000 * 60 * 5, // Optional: Keep data fresh for 5 minutes
  });
};

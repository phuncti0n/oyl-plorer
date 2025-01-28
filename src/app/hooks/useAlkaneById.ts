import { useQuery, useQueryClient } from "@tanstack/react-query";
import { provider } from "../constants";

const fetchAlkane = async (block: string, tx: string) => {
  const result = await provider.alkanes.getAlkaneById({ block, tx });
  const final = { ...result, id: { block, tx } };
  return final;
};

export const useAlkaneByIdQuery = (block: string, tx: string) => {
  const client = useQueryClient();
  return useQuery({
    queryKey: ["alkaneById", block, tx], // Unique key for the query
    queryFn: () => fetchAlkane(block, tx), // Function to fetch data
    staleTime: 1000 * 60 * 5, // Optional: Keep data fresh for 5 minutes
  });
};

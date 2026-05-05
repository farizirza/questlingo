import { useStore } from "../store";

// Export custom hooks here
export const useCount = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return { count, increment, decrement, reset };
};

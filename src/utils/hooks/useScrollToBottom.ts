/* eslint-disable @typescript-eslint/no-explicit-any */
// useScrollToBottom.ts
import { useEffect } from "react";

export function useScrollToBottom(
  ref: React.RefObject<HTMLElement>,
  dependency: any[]
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency, ref]);
}

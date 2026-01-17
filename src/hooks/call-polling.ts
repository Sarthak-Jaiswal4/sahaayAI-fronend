import { useEffect, useRef, useState } from "react";
import { getCallStatus } from "@/lib/call";

export function useCallPolling(callId?: string) {
  const [status, setStatus] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!callId) return;

    intervalRef.current = setInterval(async () => {
      try {
        const data = await getCallStatus(callId);
        setStatus(data.status);

        if (data.status === "completed") {
          setSummary(data.summary ?? null);
          clearInterval(intervalRef.current!);
        }

        if (data.status === "failed") {
          clearInterval(intervalRef.current!);
        }
      } catch (err) {
        console.error("Polling failed", err);
      }
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [callId]);

  return { status, summary };
}

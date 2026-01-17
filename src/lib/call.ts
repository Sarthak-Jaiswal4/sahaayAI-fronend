import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCallStatus(callId: string) {
  const res = await axios.get(`${BASE_URL}/status/${callId}`);
  return res.data as {
    status: "initiated" | "in_progress" | "completed" | "failed";
    summary?: string;
  };
}

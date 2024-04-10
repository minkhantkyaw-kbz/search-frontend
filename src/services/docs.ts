import { axiosInstance } from "@/utils/axios";

export function heartbeatFn() {
  return axiosInstance.get("/heartbeat");
}

export function deleteFn() {
  return axiosInstance.delete("/delete");
}

export function addDocs(value: Record<string, unknown>) {
  return axiosInstance.post("/add", value);
}

export function uploadAndAdd(value: FormData) {
  return axiosInstance.post("/upload", value);
}

export function searchDocs(query: string) {
  if (!query) return;
  return axiosInstance.get(`/search?query=${query}`);
}

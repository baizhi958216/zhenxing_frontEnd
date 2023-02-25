import { defineStore } from "pinia";
export default defineStore("history", {
  state: () => ({
    history: <Array<{ name: string }>>[],
  }),
  persist: {
    enabled: true,
  },
});

import type { IAuthenticate, IRegister } from "@/includes/User.interface";
import { defineStore } from "pinia";
export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
    userAutoLogin: false,
  }),
  actions: {
    async register(values: IRegister) {},
    async authenticate(values: IAuthenticate) {
      this.userLoggedIn = true;
    },
    async signOut() {
      this.userLoggedIn = false;
    },
  },
  persist: {
    enabled: true,
  },
});

import { create } from "zustand";
import Cookies from "js-cookie";

const getTokenFromCookie = (): string | undefined => {
	return Cookies.get("token");
};

const setTokenInCookie = (token: string): void => {
	Cookies.set("token", token, { path: "/" });
};

interface AuthStore {
	token: string;
	login: (token: string) => void;
	logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
	token: getTokenFromCookie() || "",
	login: (token) => {
		set({ token });
		setTokenInCookie(token);
	},
	logout: () => {
		set({ token: "" });
		Cookies.remove("token");
	},
}));

export default useAuthStore;

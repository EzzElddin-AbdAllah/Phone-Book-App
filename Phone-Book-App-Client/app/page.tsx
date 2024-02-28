"use client";

import { redirect } from "next/navigation";
import Home from "./components/Home";
import useAuthStore from "./stores/authStore";

const App = () => {
	const { token } = useAuthStore();

	if (token) {
		return <Home />;
	} else {
		redirect("/login");
	}
};

export default App;

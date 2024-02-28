import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/authStore";

interface Props {
	setLoginError: (error: string) => void;
}

const useLoginMutation = ({ setLoginError }: Props) => {
	const { login } = useAuthStore();
	const { push } = useRouter();

	return useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			try {
				const response = await axios.post(
					"http://localhost:8000/api/auth/login",
					{
						email: data.email,
						password: data.password,
					}
				);

				if (response.status !== 200) {
					throw new Error("Credentials are invalid");
				}

				return response.data;
			} catch (error: any) {
				throw new Error(error.response?.data?.error || "Authentication failed");
			}
		},
		onError: (error: any) => {
			setLoginError(error.message || "Authentication failed");
		},
		onSuccess: (data) => {
			setLoginError("");
			const token = data.token;
			login(token);
			push("/");
		},
	});
};

export default useLoginMutation;

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/authStore";

interface Props {
	setRegisterError: (error: string) => void;
}

const useRegisterMutation = ({ setRegisterError }: Props) => {
	const { login } = useAuthStore();
	const { push } = useRouter();

	return useMutation({
		mutationFn: async (data: {
			email: string;
			password: string;
			fullname: string;
			phone: string;
		}) => {
			try {
				const response = await axios.post(
					"http://localhost:8000/api/auth/register",
					{
						email: data.email,
						password: data.password,
						fullname: data.fullname,
						phone: data.phone,
					}
				);

				if (response.status !== 200) {
					throw new Error("Failed to register user");
				}

				return response.data;
			} catch (error: any) {
				throw new Error(
					error.response?.data?.error || "Failed to register user"
				);
			}
		},
		onError: (error: any) => {
			setRegisterError(error.message || "Failed to register user");
		},
		onSuccess: (data) => {
			setRegisterError("");
			const token = data.token;
			login(token);
			push("/");
		},
	});
};

export default useRegisterMutation;

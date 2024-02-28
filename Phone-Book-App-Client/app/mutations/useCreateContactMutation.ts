import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/authStore";

export interface Contact {
	fullName: string;
	phoneNumber: string;
	email?: string;
	image?: string;
}

interface Props {
	setCreateError: (createError: string) => void;
}

const useCreateTaskMutation = ({ setCreateError }: Props) => {
	const { token } = useAuthStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newContact: Contact) => {
			return axios.post("http://localhost:8000/api/contacts", newContact, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
		},

		onError: (error: any) => setCreateError(error.response.data.error),

		onSuccess: () => {
			queryClient.invalidateQueries(["contacts"]);
		},
	});
};

export default useCreateTaskMutation;

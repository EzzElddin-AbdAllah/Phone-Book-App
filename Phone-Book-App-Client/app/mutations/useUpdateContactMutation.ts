import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/authStore";

export interface Contact {
	id: number;
	fullName: string;
	email: string;
	phoneNumber: string;
	image: string;
}

interface Props {
	setUpdateError: (updateError: string) => void;
}

const useUpdateContactMutation = ({ setUpdateError }: Props) => {
	const { token } = useAuthStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedContact: Contact) => {
			const { id, ...rest } = updatedContact;
			return axios.patch(`http://localhost:8000/api/contacts/${id}`, rest, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
		},

		onError: (error: any) => setUpdateError(error.response.data.error),

		onSuccess: () => {
			queryClient.invalidateQueries(["contacts"]);
		},
	});
};

export default useUpdateContactMutation;

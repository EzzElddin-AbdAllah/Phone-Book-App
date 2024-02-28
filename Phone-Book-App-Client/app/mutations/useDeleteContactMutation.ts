import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/authStore";

interface Props {
	setDeleteError: (deleteError: string) => void;
}

const useDeleteContactMutation = ({ setDeleteError }: Props) => {
	const { token } = useAuthStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			return axios.delete(`http://localhost:8000/api/contacts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},

		onError: (error: any) => setDeleteError(error.response.data.error),

		onSuccess: () => {
			queryClient.invalidateQueries(["contacts"]);
		},
	});
};

export default useDeleteContactMutation;

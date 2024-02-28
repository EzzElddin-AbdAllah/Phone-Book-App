import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/authStore";

export interface Contact {
	id: number;
	fullName: string;
	email: string;
	phoneNumber: string;
	image: string;
}

const useContactByIdQuery = (id: number) => {
	const { token } = useAuthStore();

	return useQuery<Contact>({
		queryKey: ["contact", id],
		queryFn: async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/contacts/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response.data;
			} catch (error) {
				throw new Error("Error fetching contact by ID");
			}
		},
	});
};

export default useContactByIdQuery;

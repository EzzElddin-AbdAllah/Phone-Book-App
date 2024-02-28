import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/authStore";

export interface ContactQueryResponse {
	id: number;
	email: string;
	fullName: string;
	phoneNumber: string;
	image: string;
}

const useContactQuery = () => {
	const { token } = useAuthStore();

	return useQuery<ContactQueryResponse[]>({
		queryKey: ["contacts"],
		queryFn: async () => {
			try {
				const response = await axios.get(
					"http://localhost:8000/api/contacts/user",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				return response.data;
			} catch (error) {
				throw new Error("Error Fetching Tasks");
			}
		},
	});
};

export default useContactQuery;

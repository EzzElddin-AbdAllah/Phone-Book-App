import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import useContactQuery, {
	ContactQueryResponse,
} from "../queries/useContactQuery";

const Home = () => {
	const { data: contacts, isLoading, isError } = useContactQuery();

	if (isLoading) return null;
	if (isError) return <div>Error fetching contacts</div>;

	return (
		<div className="container mx-auto px-4 py-10 lg:px-20 min-h-screen bg-gray-200">
			<div className="flex justify-end mb-8 mr-10">
				<Link href="/create-contact" className="text-2xl text-black">
					<FaPlus />
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-10">
				{contacts.map((contact: ContactQueryResponse) => (
					<Link href={`/edit-contact/${contact.id}`} key={contact.id}>
						<div className="bg-gray-200 border border-black overflow-hidden flex flex-col justify-center w-60">
							<div className="h-64">
								<Image
									width={240}
									height={256}
									src={contact.image}
									alt={contact.fullName}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4 flex flex-col items-center">
								<div className="text-2xl font-bold mb-2">
									{contact.fullName}
								</div>
								<div className="text-gray-600 text-sm mb-2">
									{contact.phoneNumber}
								</div>
								<div className="text-gray-600 text-sm">{contact.email}</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;

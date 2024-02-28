"use client";
import Image from "next/image";
import useDeleteContactMutation from "@/app/mutations/useDeleteContactMutation";
import useUpdateTaskMutation from "@/app/mutations/useUpdateContactMutation";
import useContactByIdQuery from "@/app/queries/useContactByIdQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { z } from "zod";

const schema = z.object({
	fullName: z.string().min(3).max(100),
	email: z.string().email(),
	phoneNumber: z.string().min(6).max(15),
	image: z.string().url(),
});

type FormData = z.infer<typeof schema>;

const EditContactPage = () => {
	const [updateError, setUpdateError] = useState("");
	const [deleteError, setDeleteError] = useState("");
	const { id } = useParams();
	const { push } = useRouter();

	const { data: contact, isLoading, isError } = useContactByIdQuery(Number(id));
	const updateContactMutation = useUpdateTaskMutation({ setUpdateError });
	const deleteContactMutation = useDeleteContactMutation({ setDeleteError });

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		if (contact) {
			setValue("fullName", contact.fullName);
			setValue("email", contact.email);
			setValue("phoneNumber", contact.phoneNumber);
			setValue("image", contact.image);
			setImageUrl(contact.image);
		}
	}, [contact]);

	const onSubmit = async (data: FormData) => {
		try {
			await updateContactMutation.mutateAsync({ id: Number(id), ...data });
			push("/");
		} catch (error) {
			console.error("Error updating contact:", error);
		}
	};

	const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(event.target.value);
	};

	const handleDelete = async () => {
		try {
			await deleteContactMutation.mutateAsync(Number(id));
			push("/");
		} catch (error) {
			console.error("Error deleting contact:", error);
		}
	};

	if (isLoading) return null;
	if (isError) return <div>Error fetching contact</div>;

	return (
		<div className="container mx-auto px-4 py-10 lg:px-20 min-h-screen bg-gray-200">
			<div className="flex justify-between items-center mb-8">
				<div className="flex ml-auto mr-40">
					<button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						className="text-black text-2xl"
					>
						<FaCheck />
					</button>
					<Link href="/" className="text-2xl text-black ml-10">
						<FaTimes />
					</Link>
					<button onClick={handleDelete} className="text-xl text-black ml-10">
						<FaTrash />
					</button>
				</div>
			</div>
			<form className="space-y-4">
				<div className="flex items-center">
					<div className="w-80 h-96 overflow-hidden mr-32">
						<Image
							width={320}
							height={384}
							src={imageUrl || "https://via.placeholder.com/250x250"}
							alt="Avatar"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="w-1/2">
						<div className="mb-10">
							<label htmlFor="fullName" className="block font-semibold">
								Full Name
							</label>
							<input
								id="fullName"
								type="text"
								{...register("fullName")}
								className="block w-full border border-gray-300 rounded-md p-2"
							/>
							{errors.fullName && (
								<p className="text-red-500">{errors.fullName.message}</p>
							)}
						</div>
						<div className="mb-10">
							<label htmlFor="phoneNumber" className="block font-semibold">
								Phone Number
							</label>
							<input
								id="phoneNumber"
								type="text"
								{...register("phoneNumber")}
								className="block w-full border border-gray-300 rounded-md p-2"
							/>
							{errors.phoneNumber && (
								<p className="text-red-500">{errors.phoneNumber.message}</p>
							)}
						</div>
						<div className="mb-10">
							<label htmlFor="email" className="block font-semibold">
								Email
							</label>
							<input
								id="email"
								type="email"
								{...register("email")}
								className="block w-full border border-gray-300 rounded-md p-2"
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div>
							<label htmlFor="image" className="block font-semibold">
								Image URL
							</label>
							<input
								id="image"
								type="text"
								{...register("image")}
								onChange={handleImageUrlChange}
								className="block w-full border border-gray-300 rounded-md p-2"
							/>
							{errors.image && (
								<p className="text-red-500">{errors.image.message}</p>
							)}
						</div>
					</div>
				</div>
			</form>
			{updateError && (
				<div className="text-red-500 mb-4">{`Error: ${updateError}`}</div>
			)}
			{deleteError && (
				<div className="text-red-500 mb-4">{`Error: ${deleteError}`}</div>
			)}
		</div>
	);
};

export default EditContactPage;

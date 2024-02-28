"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaTimes } from "react-icons/fa";
import { z } from "zod";
import useCreateTaskMutation from "../mutations/useCreateContactMutation";

const schema = z.object({
	fullName: z.string().min(3).max(100),
	email: z.string().email(),
	phoneNumber: z.string().min(6).max(15),
	image: z.string().url(),
});

type FormData = z.infer<typeof schema>;

const CreateContactPage = () => {
	const { push } = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const [imageUrl, setImageUrl] = useState("");
	const [createError, setCreateError] = useState("");

	const createContactMutation = useCreateTaskMutation({ setCreateError });

	const onSubmit = async (data: FormData) => {
		try {
			await createContactMutation.mutateAsync(data);
			push("/");
		} catch (error: any) {
			setCreateError(error.message);
		}
	};

	const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(event.target.value);
	};

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
				</div>
			</div>
			<form className="space-y-4">
				<div className="flex items-center">
					<div className="w-80 h-96 overflow-hidden mr-32">
						<Image
							width={320}
							height={384}
							src={
								imageUrl ||
								"https://s3-alpha-sig.figma.com/img/2f28/0759/e5fdaae548771cc074d4053c35c9ffeb?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NMre~zRx-gqjRYX-pEAy8acZ~CJkRT2yD6e9PDpkaRPAlAutOwcwZBbXJKHHHsMqA2nHhjFbZlEkHmFvkYK68BlTdONE9g61SqpI2-3XprxdrGh5Y~mHqovrPxutcypr~0FS7-vMAmiW6vRqyCoyKx94L-2uH6P9PCnRBGcvlNSc~2-vig75nkIzaLorJC3wuX7WHItUDtxntcROqiDcBAJXG~8jPojTxXXhSTN5-UJQT8Dzg-SY1AdTP4hHuXljZaN5o8VDGrIAw8FcB0hMCmYGry0YDcU8FHyzJjtdlOZBaQH-2MINQEXLbuHVcD7uctcgNC9yy3iJhi8BO44GZQ__"
							}
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
			{createError && (
				<div className="text-red-500 mb-4">{`Error: ${createError}`}</div>
			)}
		</div>
	);
};

export default CreateContactPage;

"use client";

import useRegisterMutation from "@/app/mutations/useRegisterMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	fullname: z.string().min(3).max(100),
	email: z.string().email(),
	phone: z.string().min(6).max(15),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
	const [registerError, setRegisterError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const watchPassword = watch("password");
	const watchConfirmPassword = watch("confirmPassword");
	const passwordMatch = watchPassword === watchConfirmPassword;

	const registerMutation = useRegisterMutation({ setRegisterError });

	const onSubmit = async (data: FormData) => {
		registerMutation.mutate(data);
	};

	return (
		<div className="min-h-screen bg-gray-200 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full bg-white p-8 shadow-md mx-32">
				<h2 className="text-center text-3xl font-bold mb-16">
					Create My Account
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="fullname" className="block text-sm font-medium">
								Full Name:
							</label>
							<input
								id="fullname"
								type="text"
								placeholder="John Doe"
								{...register("fullname")}
								className={`mt-1 block h-6 w-full border-2 border-gray-300 sm:text-sm rounded-md ${
									errors.fullname ? "border-red-500" : ""
								}`}
							/>
							{errors.fullname && (
								<p className="mt-2 text-sm text-red-600">
									{errors.fullname.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium">
								Password:
							</label>
							<input
								id="password"
								type="password"
								{...register("password")}
								className={`mt-1 block h-6 w-full border-2 border-gray-300 sm:text-sm rounded-md ${
									errors.password ? "border-red-500" : ""
								}`}
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium">
								Email:
							</label>
							<input
								id="email"
								type="email"
								placeholder="example@email.com"
								{...register("email")}
								className={`mt-1 block h-6 w-full border-2 border-gray-300 sm:text-sm rounded-md ${
									errors.email ? "border-red-500" : ""
								}`}
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium"
							>
								Confirm Password:
							</label>
							<input
								id="confirmPassword"
								type="password"
								{...register("confirmPassword")}
								className={`mt-1 block h-6 w-full border-2 border-gray-300 sm:text-sm rounded-md ${
									errors.confirmPassword ? "border-red-500" : ""
								}`}
							/>
							{errors.confirmPassword && (
								<p className="mt-2 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium">
								Number:
							</label>
							<input
								id="phone"
								type="tel"
								placeholder="+201119803181"
								{...register("phone")}
								className={`mt-1 block h-6 w-full border-2 border-gray-300 sm:text-sm rounded-md ${
									errors.phone ? "border-red-500" : ""
								}`}
							/>
							{errors.phone && (
								<p className="mt-2 text-sm text-red-600">
									{errors.phone.message}
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							disabled={!passwordMatch}
							className="w-32 flex justify-center py-1 mt-8 border border-transparent rounded-none shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
						>
							Sign me up
						</button>
					</div>
				</form>
				{registerError && (
					<p className="mt-2 text-center text-sm text-red-600">
						{registerError}
					</p>
				)}
				<div className="text-center text-sm mt-8">
					<p>
						Already have an account?{" "}
						<Link href="/login" className="font-medium text-black underline">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

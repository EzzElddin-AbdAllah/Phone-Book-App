"use client";

import useLoginMutation from "@/app/mutations/useLoginMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
	const [loginError, setLoginError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const loginMutation = useLoginMutation({ setLoginError });

	const onSubmit = async (data: FormData) => {
		loginMutation.mutate({ email: data.email, password: data.password });
	};

	return (
		<div className="min-h-screen bg-gray-200 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
					Welcome Back!
				</h2>
				<p className="text-center text-gray-600 text-sm mb-8">
					Enter your email and password to access your account
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium">
							Email:
						</label>
						<input
							id="email"
							type="email"
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
						<label htmlFor="password" className="block sm:text-sm font-medium">
							Password
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
					<div className="flex justify-center">
						<button
							type="submit"
							className="w-80 flex justify-center py-2 px-4 mt-8 border border-transparent rounded-none shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900"
						>
							Sign In
						</button>
					</div>
				</form>
				{loginError && (
					<p className="mt-2 text-center text-sm text-red-600">{loginError}</p>
				)}
				<div className="text-center text-sm mt-28">
					<p>
						Don&apos;t have an account?{" "}
						<Link href="/register" className="font-medium text-black underline">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;

import React, { useState } from "react";
import Link from "next/link";
import {useFormik} from "formik";
import axios from "axios";
import {useRouter} from "next/router";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const onSubmit = async (values) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
      values
    );
    loginUser(res.data.user);
  };

  const loginUser = async ({ email, password }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "/",
    });
    console.log(res);

    if (res.ok) router.push("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-black text-white">
      <div className="flex flex-col bg-[#1a1a1a] w-96 h-80">
        <form
          className="flex flex-col justify-center ml-10 gap-3"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-justify font-bold text-3xl mt-2">Register</h1>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-[300px] p-2"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            required
          />
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-[300px] p-2 "
            placeholder="Password"
            {...formik.getFieldProps("password")}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 border text-white w-[300px] p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
        <div className="flex gap-3 items-center justify-center mt-8">
          <p>Have an account?</p>
          <Link href={"/login"}>
            <span className="text-blue-500 underline">Sign in.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

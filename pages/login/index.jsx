import React from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // Google Handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-black text-white">
      <div className="flex flex-col bg-[#1a1a1a] w-96 h-[325px]">
        <form
          className="flex flex-col justify-center ml-10 gap-3"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-justify font-bold text-3xl mt-2">Login</h1>
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
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="flex justify-center items-center bg-blue-700 border text-white w-[300px] py-3 rounded-lg mt-4 ml-10"
        >
          {" "}
          <FaGoogle />{" "}
        </button>
        <div className="flex gap-3 items-center justify-center mt-4">
          <p>New Here?</p>
          <Link href={"/register"}>
            <span className="text-blue-500 underline">Register.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


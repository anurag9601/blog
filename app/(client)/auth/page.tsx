"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface UserCredentialsDataType {
  email: string;
  fullName: string;
  password: string;
}

function AuthPage() {
  const router = useRouter();

  const [userCredentials, setUserCredentials] =
    useState<UserCredentialsDataType>({
      email: "",
      fullName: "",
      password: "",
    });

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userCredentials.email,
      fullName: userCredentials.fullName,
      password: userCredentials.password,
      redirect: false,
    });

    console.log("response", res);

    if (res.error) {
      alert(res.error);
    } else {
      router.push("/create-blog");
    }
  }
  return (
    <div className="min-h-screen min-w-screen bg-black text-white flex flex-col items-center justify-center ">
      <h1>Register or Login using your credentials</h1>
      <form
        className="flex flex-col itmes-center justify-center max-w-[350px] w-full px-[10px] mt-[20px] gap-[10px]"
        onSubmit={handleOnSubmit}
      >
        <p>Email</p>
        <input
          type="email"
          className="h-[35px] w-full border-[1px] border-white rounded-md text-white px-[10px]"
          value={userCredentials.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserCredentials((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <p>Full name</p>
        <input
          type="text"
          className="h-[35px] w-full border-[1px] border-white rounded-md text-white px-[10px]"
          value={userCredentials.fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserCredentials((prev) => {
              return { ...prev, fullName: e.target.value };
            });
          }}
        />
        <p>Password</p>
        <input
          type="password"
          className="h-[35px] w-full border-[1px] border-white rounded-md text-white px-[10px]"
          value={userCredentials.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserCredentials((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <button
          type="submit"
          className="bg-white text-black px-[10px] py-[5px] rounded-md cursor-pointer"
        >
          Get Started
        </button>
      </form>
    </div>
  );
}

export default AuthPage;

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end gap-5 py-2 px-3 bg-black">
      {data?.user ? (
        <button
          className="bg-white text-black px-[10px] py-[5px] rounded-md cursor-pointer"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <Link
          className="bg-white text-black px-[10px] py-[5px] rounded-md cursor-pointer"
          href="/auth"
        >
          Let's Go
        </Link>
      )}
    </div>
  );
};

export default NavBar;

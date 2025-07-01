"use client";

import { useSession } from "next-auth/react";

function CreateBlogPage() {
  const data = useSession();
  return (
    <div className="h-dvh w-dvw bg-black flex items-center justify-center">
      <form className="flex flex-col items-center justify-center gap-3 max-w-[400px] w-full">
        <label className="h-[50px] w-full border-2 border-white border-dashed rounded-lg cursor-pointer relative flex flex-col items-center justify-center">
          <p className="text-white text-sm">Uplaod cover image</p>
          <input type="file" className="invisible absolute" />
        </label>
        <div className="text-white flex flex-col gap-1 w-full">
          <p>Title</p>
          <input
            type="text"
            className="w-full h-[35px] border-1 border-white rounded-md text-white px-3"
          />
        </div>
        <div className="text-white flex flex-col gap-1 w-full">
          <p>Title</p>
          <textarea
            className="w-full border-1 border-white rounded-md text-white px-3 py-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-white text-black px-[10px] py-[5px] rounded-md cursor-pointer w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateBlogPage;

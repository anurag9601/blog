import Link from "next/link";

function HomePage() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl">Home</h1>
      <Link
        href="/create-blog"
        className="bg-white text-black px-[10px] py-[5px] rounded-md cursor-pointer"
      >
        Create blog
      </Link>
    </div>
  );
}

export default HomePage;

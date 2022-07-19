import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
        <div></div>
        <div className="flex justify-center space-x-4 text-sm">
          <Link href="/survey">
            <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
              Submit a new inquiry
            </div>
          </Link>

          <div className="px-6 py-2 text-gray-800 cursor-pointer bg-neutral-200 ">
            View my inquiries
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

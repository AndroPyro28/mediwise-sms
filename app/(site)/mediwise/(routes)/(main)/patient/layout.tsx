import { getSession } from "@/lib/auth";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getSession();

  if (!currentUser?.user) {
    return redirect("/mediwise");
  }
  const { user } = currentUser;

  return (
    <main className=" h-full bg-[#F9FAFC] flex justify-center items-center py-10 px-20">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar currentUser={user} />
      </div>
      <div className=" w-full overflow-hidden bg-white">
        {children}
      </div>
    </main>
  );
};

export default Layout;
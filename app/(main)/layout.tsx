import { currentUser } from "@clerk/nextjs/server";
import PubllicNavBar from "../../components/PublicNavBar";
import PriavteNavBar from "../../components/PrivateNavBar";

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // Checks if the user is authenticated
    const user = await currentUser();

  return (
    <main className="realtative">
        {/* If the user is authenticated, display private Navbar, if not displays the public navbar */}
        {user ? <PriavteNavBar /> : <PubllicNavBar />}
        <section>
           {children} 
        </section>
    </main>
  );
}
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function PubllicNavBar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Calendary App</div>
                <div>
                    <a href="/" className="text-white hover:text-gray-300 px-3">Home</a>
                    <a href="/about" className="text-white hover:text-gray-300 px-3">About</a>
                    <a href="/contact" className="text-white hover:text-gray-300 px-3">Contact</a>
                </div>
                <Link href="/login" className="flex items-center gap-1 hover:scale-150 duration-500 ">
                <Image
                            src='/assets/logo.svg'
                            width={100}
                            height={100}
                            alt="logo"
                        />
                </Link>
            </div>

            {/* Nav Links */}
            <section className="sticky top-0 flex justify-between  ">
                <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
                <SignInButton>
                    <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 cursor-pointer hover:scale-150 duration-500 rounded-2xl shadow-2xl"
                    >
                        Login
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 cursor-pointer hover:scale-150 duration-500 rounded-2xl shadow-2xl"
                    variant={"outline"}
                    >
                        Register
                    </Button>
                </SignUpButton>
                </div>
            </section>  

        </nav>
    );
}
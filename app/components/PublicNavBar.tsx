import Image from "next/image";

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
                <Image
                            src='/assets/logo.svg'
                            width={100}
                            height={100}
                            alt="logo"
                        />
            </div>
        </nav>
    );
}
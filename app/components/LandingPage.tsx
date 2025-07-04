'use client'

import Image from "next/image"

export default function LandingPage() {
    return (
        <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
            <h1 className="font-bold text-5xl text-center">Calendary App</h1>
            <p className="flex flex-col items-center text-gray-500 text-lg">A simple calendar app that allows you to manage and schedule events and meetings</p>
            <Image
                src='/assets/logo.svg'
                width={300}
                height={300}
                alt="logo"
            />
        
        </main>
    )
    }
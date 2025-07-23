'use client'

import { SignIn } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes"
import Image from "next/image"

export default function LandingPage() {
    return (
        
        <main className="flex items-center p-10 gap-24 animate-fade-in max-md:flex-col">
            {/* Section with Logo, heading & subheading */}
            <section>
                <h1 className="font-bold text-5xl text-center">Calendary App</h1>
                <p className="flex flex-col items-center text-gray-500 text-lg">A simple calendar app that allows you to manage and schedule events and meetings</p>
                <Image
                    src='/assets/logo.svg'
                    width={300}
                    height={300}
                    alt="logo"
                />
            </section>
         <div className="mt-3">
            <SignIn
            routing="hash" // Keeps sign-in UI on the same page using hash-based routing
            appearance={{
                baseTheme: neobrutalism, // Applies the neobrutalism theme style to the sign-in UI
            }}
            />
        </div>
        
        </main>
    )
    }
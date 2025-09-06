"use client"

import { InvitationCard } from "@/components/invitation-card"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RENTREE%20205525-8kcUmJbSmuzrQozXQWsEoxBu4BQyXt.png')",
        }}
      />
      <InvitationCard />
    </main>
  )
}

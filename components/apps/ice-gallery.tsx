"use client"

import { Card } from "@/components/ui/card"

export function IceGallery() {
  const photos = [
    { id: 1, title: "Mountain Peak", color: "from-blue-400 to-cyan-300" },
    { id: 2, title: "Frozen Lake", color: "from-purple-400 to-pink-300" },
    { id: 3, title: "Snow Forest", color: "from-emerald-400 to-teal-300" },
    { id: 4, title: "Ice Cave", color: "from-indigo-400 to-blue-300" },
    { id: 5, title: "Winter Sunset", color: "from-orange-400 to-red-300" },
    { id: 6, title: "Snowy Village", color: "from-slate-400 to-gray-300" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Ice Gallery</h2>
        <p className="text-muted-foreground">Showcase your winter photos in a stunning gallery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden group cursor-pointer">
            <div
              className={`aspect-square bg-gradient-to-br ${photo.color} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300`}
            >
              ❄️
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{photo.title}</h3>
              <p className="text-sm text-muted-foreground">Winter 2024</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

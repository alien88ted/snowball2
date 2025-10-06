"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Snowflake, ThermometerSnowflake } from "lucide-react"

export function WinterDashboard() {
  const stats = [
    { label: "Snow Days", value: "12", change: "+3", trend: "up", icon: Snowflake },
    { label: "Avg Temperature", value: "-5°C", change: "-2°C", trend: "down", icon: ThermometerSnowflake },
    { label: "Snowfall (cm)", value: "45", change: "+12", trend: "up", icon: Snowflake },
    { label: "Activities", value: "8", change: "+2", trend: "up", icon: TrendingUp },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 font-serif">Winter Dashboard</h2>
        <p className="text-muted-foreground">Track your winter activities and snow day statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div
                  className={`flex items-center text-xs mt-1 ${stat.trend === "up" ? "text-green-600" : "text-blue-600"}`}
                >
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {stat.change} from last week
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { activity: "Skiing", date: "Today", duration: "2h 30m" },
              { activity: "Snowboarding", date: "Yesterday", duration: "3h 15m" },
              { activity: "Ice Skating", date: "2 days ago", duration: "1h 45m" },
              { activity: "Sledding", date: "3 days ago", duration: "1h 20m" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
                <span className="text-sm font-medium text-primary">{item.duration}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Forecast</h3>
          <div className="space-y-4">
            {[
              { day: "Monday", temp: "-3°C", snow: "Heavy", icon: "❄️" },
              { day: "Tuesday", temp: "-5°C", snow: "Light", icon: "🌨️" },
              { day: "Wednesday", temp: "-2°C", snow: "Moderate", icon: "❄️" },
              { day: "Thursday", temp: "-4°C", snow: "Heavy", icon: "❄️" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.snow} snow</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">{item.temp}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

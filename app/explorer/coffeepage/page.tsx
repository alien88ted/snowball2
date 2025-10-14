import { redirect } from "next/navigation"

export default function CoffeePageRedirect() {
  // Backward-compat or typo guard: /explorer/coffeepage -> /explorer/coffee
  redirect("/explorer/coffee")
}


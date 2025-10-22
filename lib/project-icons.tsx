import { Coffee, ShoppingBag, Shirt, UtensilsCrossed, Store, Package } from "lucide-react"

export function getProjectIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'coffee':
    case 'first $now launch': // for the coffee project
      return Coffee
    case 'marketplace':
      return ShoppingBag
    case 'fashion':
      return Shirt
    case 'food':
      return UtensilsCrossed
    case 'retail':
      return Store
    default:
      return Package
  }
}

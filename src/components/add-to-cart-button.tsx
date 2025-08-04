"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types/product"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product)
  }

  return (
    <Button
      onClick={handleAddToCart}
      size="lg"
      className="w-full bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Agregar al carrito
    </Button>
  )
}

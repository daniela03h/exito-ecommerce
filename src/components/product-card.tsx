"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20 border-2 hover:border-primary/30">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image || "../public/logo-exito.png"}
            alt={product.title}
            width={300}
            height={300}
            className="h-full w-full object-contain transition-transform group-hover:scale-105 p-4"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary">{product.title}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-muted-foreground">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary-600 text-primary-foreground"
          size="sm"
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}

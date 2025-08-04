"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b bg-gradient-to-r from-secondary to-secondary/90 backdrop-blur supports-[backdrop-filter]:bg-secondary/60 shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo-exito.png" alt="Logo" width={50} height={50} />
          </Link>
        </div>

        {onSearchChange && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary-600 hover:text-white">
              Inicio
            </Button>
          </Link>
          <Link href="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-secondary-foreground hover:bg-secondary-600 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

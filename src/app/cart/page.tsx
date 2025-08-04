"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-16 min-h-[calc(100vh_-_334px)]">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-6">Agrega algunos productos para comenzar tu compra</p>
            <Link href="/">
              <Button>Continuar comprando</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="container mx-auto py-8 px-4 min-h-[calc(100vh_-_334px)]">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 w-90 lg:w-auto">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6 w-auto">
                  <div className="flex gap-4">
                    <div className="h-20">
                      <Image
                        src={item.image || "../public/logo-exito.png"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1 w-90 lg:w-auto">
            <Card className="sticky top-24 border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate mr-2">
                        {item.title} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button
                    className="w-full bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg"
                    size="lg"
                  >
                    Proceder al pago
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Continuar comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

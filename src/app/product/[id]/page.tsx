import Image from "next/image"
import { notFound } from "next/navigation"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { getProduct } from "@/lib/api"
import { AddToCartButton } from "../../../components/add-to-cart-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id)

    return (
      <>
        <Header />

        <div className="container mx-auto py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={600}
                height={600}
                className="h-full w-full object-contain p-8"
              />
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold">{product.title}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count} reseñas)
                </span>
              </div>

              <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>

              <AddToCartButton product={product} />

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    notFound()
  }
}

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { getProducts, getCategories } from "@/lib/api";
import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error al obtener los datos de los productos");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((product) => product.rating.rate >= minRating);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, minRating, searchQuery]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinRating(0);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || minRating > 0 || searchQuery !== "";

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text">
            Productos Destacados
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubre nuestra selección de productos de calidad
          </p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoriesChange={setSelectedCategories}
                minRating={minRating}
                onMinRatingChange={setMinRating}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Sheet
                  open={showMobileFilters}
                  onOpenChange={setShowMobileFilters}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden bg-transparent"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                      {hasActiveFilters && (
                        <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                          {selectedCategories.length + (minRating > 0 ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full overflow-y-auto">
                    <div className="py-4">
                      <ProductFilters
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoriesChange={setSelectedCategories}
                        minRating={minRating}
                        onMinRatingChange={setMinRating}
                        onClearFilters={clearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? "s" : ""} encontrado
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary-foreground hover:bg-primary"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar filtros
                </Button>
              )}
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <span className="capitalize">{category}</span>
                    <button
                      onClick={() => {
                        const nextSelectedCategories =
                          selectedCategories.filter(
                            (currentCategory) => currentCategory !== category
                          );

                        setSelectedCategories(nextSelectedCategories);
                      }}
                      className="hover:bg-primary/20 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {minRating > 0 && (
                  <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    <span>{minRating}+ estrellas</span>
                    <button
                      onClick={() => setMinRating(0)}
                      className="hover:bg-primary/20 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No se encontraron productos
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Intenta ajustar los filtros o buscar con otros términos.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Limpiar todos los filtros
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

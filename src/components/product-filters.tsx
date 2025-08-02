"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ProductFiltersProps {
  categories: string[]
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  onClearFilters: () => void
}

export function ProductFilters({
  categories,
  selectedCategories,
  onCategoriesChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoriesChange([...selectedCategories, category])
    } else {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    }
  }

  const ratingOptions = [
    { value: 0, label: "Todas las calificaciones" },
    { value: 4, label: "4 estrellas o más" },
    { value: 3, label: "3 estrellas o más" },
    { value: 2, label: "2 estrellas o más" },
  ]

  return (
    <div className="w-full space-y-4">
      <Card>
        <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Categoría</CardTitle>
                {openSections.categories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card>
        <Collapsible open={openSections.rating} onOpenChange={() => toggleSection("rating")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Calificación</CardTitle>
                {openSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {ratingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${option.value}`}
                    checked={minRating === option.value}
                    onCheckedChange={() => onMinRatingChange(option.value)}
                  />
                  <Label htmlFor={`rating-${option.value}`} className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <div className="space-y-2">
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          Limpiar filtros
        </Button>
      </div>

    </div>
  )
}

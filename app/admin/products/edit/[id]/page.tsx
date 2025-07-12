"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import type { Product } from "@/types"
import MultiImageUpload from "@/components/multi-image-upload"

const EditProductPage = () => {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    // image: "", // قم بإزالة هذا السطر
    rating: "",
    stock: "",
  })
  const [images, setImages] = useState<string[]>([]) // أضف هذه الحالة الجديدة لإدارة الصور

  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
      setImages(foundProduct.images || []) // قم بتعيين الصور الموجودة للمنتج
      setFormData({
        name: foundProduct.name,
        description: foundProduct.description,
        price: foundProduct.price.toString(),
        originalPrice: foundProduct.originalPrice?.toString() || "",
        category: foundProduct.category,
        subcategory: foundProduct.subcategory || "",
        stock: foundProduct.stock.toString(),
        // image: foundProduct.image, // قم بإزالة هذا السطر
        rating: foundProduct.rating.toString(),
      })
    }
  }, [products, productId])

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedProducts = products.map((p) =>
      p.id === productId
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            price: Number.parseFloat(formData.price),
            originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
            category: formData.category,
            subcategory: formData.subcategory || undefined,
            stock: Number.parseInt(formData.stock),
            // image: formData.image, // قم بإزالة هذا السطر
            images: images, // أضف هذا السطر لحفظ مصفوفة الصور
            rating: Number.parseFloat(formData.rating),
            inStock: Number.parseInt(formData.stock) > 0,
          }
        : p,
    )

    localStorage.setItem("products", JSON.stringify(updatedProducts))
    router.push("/admin/products")
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">تعديل المنتج</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم المنتج</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="text-right"
              placeholder="اسم المنتج"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="text-right"
              placeholder="السعر"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="originalPrice">السعر الأصلي</Label>
            <Input
              type="number"
              id="originalPrice"
              value={formData.originalPrice}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
              className="text-right"
              placeholder="السعر الأصلي"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">الفئة</Label>
            <Select onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="اختر الفئة" defaultValue={formData.category} />
              </SelectTrigger>
              <SelectContent className="text-right">
                <SelectItem value="electronics">إلكترونيات</SelectItem>
                <SelectItem value="clothing">ملابس</SelectItem>
                <SelectItem value="books">كتب</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory">الفئة الفرعية</Label>
            <Input
              type="text"
              id="subcategory"
              value={formData.subcategory}
              onChange={(e) => handleChange("subcategory", e.target.value)}
              className="text-right"
              placeholder="الفئة الفرعية"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">المخزون</Label>
            <Input
              type="number"
              id="stock"
              value={formData.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              className="text-right"
              placeholder="المخزون"
            />
          </div>

          {/* قم بإزالة هذا القسم بالكامل:
          <div className="space-y-2">
            <Label htmlFor="image">رابط الصورة</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="text-right"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          */}

          {/* أضف هذا المكون بدلاً منه */}
          <MultiImageUpload initialImages={images} onImagesChange={setImages} />

          <div className="space-y-2">
            <Label htmlFor="description">وصف المنتج</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="text-right"
              placeholder="وصف المنتج"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">التقييم</Label>
            <Input
              type="number"
              id="rating"
              value={formData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              className="text-right"
              placeholder="التقييم"
            />
          </div>

          <Button type="submit" className="w-full">
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage

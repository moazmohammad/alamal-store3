"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import MultiImageUpload from "@/components/multi-image-upload"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  stock: number
  image?: string
  images: string[]
  rating: number
  inStock: boolean
  reviews: number
  sales: number
}

const AddProductPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    stock: "",
    rating: "4.5",
  })
  const [images, setImages] = useState<string[]>([])

  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Sports"]
  const subcategories = {
    Electronics: ["Smartphones", "Laptops", "Headphones", "Smartwatches"],
    Clothing: ["Men's", "Women's", "Kids'"],
    "Home & Kitchen": ["Furniture", "Cookware", "Decor"],
    Books: ["Fiction", "Non-Fiction", "Mystery"],
    Sports: ["Outdoor", "Fitness", "Team Sports"],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newId = uuidv4()

    const newProduct: Product = {
      id: newId,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      stock: Number.parseInt(formData.stock),
      images: images.length > 0 ? images : ["/placeholder.svg"],
      rating: Number.parseFloat(formData.rating),
      inStock: Number.parseInt(formData.stock) > 0,
      reviews: 0,
      sales: 0,
    }

    try {
      const existingProducts = JSON.parse(localStorage.getItem("products") || "[]")
      localStorage.setItem("products", JSON.stringify([...existingProducts, newProduct]))
      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (e: string, name: string) => {
    setFormData({ ...formData, [name]: e })
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <Form>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Original Price</FormLabel>
                <FormControl>
                  <Input
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="Original Price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={(e) => handleSelectChange(e, "category")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select onValueChange={(e) => handleSelectChange(e, "subcategory")} disabled={!formData.category}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category &&
                        subcategories[formData.category].map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div>
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </div>

          <MultiImageUpload initialImages={images} onImagesChange={setImages} />

          <Button type="submit">Add Product</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddProductPage

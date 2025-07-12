"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, FolderPlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getCategories, saveCategories, type Category } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState("")
  const [subcategoryName, setSubcategoryName] = useState("")
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>("")
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الفئة",
        variant: "destructive",
      })
      return
    }

    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : Date.now(),
      name: categoryName,
      subcategories: editingCategory ? editingCategory.subcategories : [],
    }

    let updatedCategories: Category[]
    if (editingCategory) {
      updatedCategories = categories.map((cat) => (cat.id === newCategory.id ? newCategory : cat))
      toast({
        title: "تم التحديث ✅",
        description: "تم تحديث الفئة بنجاح",
      })
    } else {
      updatedCategories = [...categories, newCategory]
      toast({
        title: "تم الإضافة ✅",
        description: "تم إضافة الفئة بنجاح",
      })
    }

    setCategories(updatedCategories)
    saveCategories(updatedCategories)
    resetForm()
  }

  const handleAddSubcategory = () => {
    if (!subcategoryName.trim() || !selectedParentCategory) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الفئة الفرعية واختيار الفئة الرئيسية",
        variant: "destructive",
      })
      return
    }

    const updatedCategories = categories.map((cat) =>
      cat.id === Number.parseInt(selectedParentCategory)
        ? { ...cat, subcategories: [...cat.subcategories, subcategoryName] }
        : cat,
    )

    setCategories(updatedCategories)
    saveCategories(updatedCategories)

    toast({
      title: "تم الإضافة ✅",
      description: "تم إضافة الفئة الفرعية بنجاح",
    })

    setSubcategoryName("")
    setSelectedParentCategory("")
    setIsAddingSubcategory(false)
  }

  const handleEditClick = (category: Category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = (id: number) => {
    if (!confirm("هل أنت متأكد أنك تريد حذف هذه الفئة؟ سيتم حذف جميع الفئات الفرعية أيضاً.")) return

    const updatedCategories = categories.filter((cat) => cat.id !== id)
    setCategories(updatedCategories)
    saveCategories(updatedCategories)

    toast({
      title: "تم الحذف",
      description: "تم حذف الفئة بنجاح",
    })
  }

  const handleDeleteSubcategory = (categoryId: number, subcategoryIndex: number) => {
    if (!confirm("هل أنت متأكد أنك تريد حذف هذه الفئة الفرعية؟")) return

    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId
        ? { ...cat, subcategories: cat.subcategories.filter((_, index) => index !== subcategoryIndex) }
        : cat,
    )

    setCategories(updatedCategories)
    saveCategories(updatedCategories)

    toast({
      title: "تم الحذف",
      description: "تم حذف الفئة الفرعية بنجاح",
    })
  }

  const resetForm = () => {
    setEditingCategory(null)
    setCategoryName("")
    setSubcategoryName("")
    setSelectedParentCategory("")
    setIsDialogOpen(false)
    setIsAddingSubcategory(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>إدارة الفئات</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddingSubcategory(true)} variant="outline">
              <FolderPlus className="h-4 w-4 ml-2" />
              إضافة فئة فرعية
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة فئة رئيسية
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الفئة</TableHead>
                <TableHead>الفئات الفرعية</TableHead>
                <TableHead>عدد الفئات الفرعية</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((sub, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {sub}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                            onClick={() => handleDeleteSubcategory(category.id, index)}
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{category.subcategories.length}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog for adding/editing main category */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "تعديل فئة" : "إضافة فئة رئيسية جديدة"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name">اسم الفئة</Label>
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="أدخل اسم الفئة"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              إلغاء
            </Button>
            <Button onClick={handleAddCategory}>{editingCategory ? "حفظ التعديلات" : "إضافة الفئة"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding subcategory */}
      <Dialog open={isAddingSubcategory} onOpenChange={setIsAddingSubcategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة فئة فرعية جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="parent-category">الفئة الرئيسية</Label>
              <Select value={selectedParentCategory} onValueChange={setSelectedParentCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة الرئيسية" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subcategory-name">اسم الفئة الفرعية</Label>
              <Input
                id="subcategory-name"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                placeholder="أدخل اسم الفئة الفرعية"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              إلغاء
            </Button>
            <Button onClick={handleAddSubcategory}>إضافة الفئة الفرعية</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

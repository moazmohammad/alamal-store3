"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Database, FileText, ShoppingCart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExportBackupManager() {
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleExport = async (type: "products" | "orders" | "backup") => {
    setIsExporting(type)

    try {
      let url = ""
      let filename = ""

      switch (type) {
        case "products":
          url = "/api/export-products"
          filename = `products-${new Date().toISOString().split("T")[0]}.csv`
          break
        case "orders":
          url = "/api/export-orders"
          filename = `orders-${new Date().toISOString().split("T")[0]}.csv`
          break
        case "backup":
          url = "/api/backup"
          filename = `backup-${new Date().toISOString().split("T")[0]}.json`
          break
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()

      // إنشاء رابط التنزيل
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      toast({
        title: "تم التصدير بنجاح ✅",
        description: `تم تنزيل ${getTypeLabel(type)} بنجاح`,
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "فشل التصدير",
        description: "حدث خطأ أثناء تصدير البيانات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(null)
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "products":
        return "قائمة المنتجات"
      case "orders":
        return "قائمة الطلبات"
      case "backup":
        return "النسخة الاحتياطية"
      default:
        return "البيانات"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* تصدير المنتجات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 ml-2" />
            تصدير المنتجات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">تصدير جميع المنتجات إلى ملف CSV يمكن فتحه في Excel</p>
          <Button onClick={() => handleExport("products")} disabled={isExporting === "products"} className="w-full">
            {isExporting === "products" ? (
              <>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري التصدير...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 ml-2" />
                تصدير المنتجات
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* تصدير الطلبات */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 ml-2" />
            تصدير الطلبات
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">تصدير جميع الطلبات إلى ملف CSV للمراجعة والتحليل</p>
          <Button onClick={() => handleExport("orders")} disabled={isExporting === "orders"} className="w-full">
            {isExporting === "orders" ? (
              <>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري التصدير...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 ml-2" />
                تصدير الطلبات
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* النسخة الاحتياطية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 ml-2" />
            نسخة احتياطية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">إنشاء نسخة احتياطية كاملة من جميع البيانات (JSON)</p>
          <Button
            onClick={() => handleExport("backup")}
            disabled={isExporting === "backup"}
            className="w-full"
            variant="outline"
          >
            {isExporting === "backup" ? (
              <>
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                جاري الإنشاء...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 ml-2" />
                إنشاء نسخة احتياطية
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

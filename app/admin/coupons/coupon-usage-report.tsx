"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp } from "lucide-react"
import { getCoupons, getOrders, type Coupon, type Order } from "@/lib/store"

export default function CouponUsageReport() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setCoupons(getCoupons())
    setOrders(getOrders())
  }, [])

  // حساب إجمالي الخصم الممنوح لكل كوبون
  const getCouponTotalDiscount = (couponCode: string): number => {
    return orders.reduce((sum, order) => {
      if (order.coupon === couponCode && order.discount) {
        return sum + order.discount
      }
      return sum
    }, 0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 ml-2" />
          تقارير استخدام أكواد الخصم
        </CardTitle>
      </CardHeader>
      <CardContent>
        {coupons.length === 0 ? (
          <p className="text-center text-muted-foreground">لا توجد أكواد خصم لإعداد التقارير.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>كود الخصم</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>القيمة</TableHead>
                <TableHead>الحد الأدنى</TableHead>
                <TableHead>الاستخدامات</TableHead>
                <TableHead>إجمالي الخصم الممنوح</TableHead>
                <TableHead>الصلاحية</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.code}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.type === "percentage" ? "نسبة مئوية" : "قيمة ثابتة"}</TableCell>
                  <TableCell>
                    {coupon.discount} {coupon.type === "percentage" ? "%" : "ج.م"}
                  </TableCell>
                  <TableCell>{coupon.minAmount ? `${coupon.minAmount} ج.م` : "لا يوجد"}</TableCell>
                  <TableCell>
                    {coupon.usedCount} / {coupon.maxUses || "غير محدود"}
                  </TableCell>
                  <TableCell>{getCouponTotalDiscount(coupon.code).toFixed(2)} ج.م</TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleDateString("ar-EG")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={coupon.isActive && new Date(coupon.expiryDate) >= new Date() ? "default" : "destructive"}
                    >
                      {coupon.isActive && new Date(coupon.expiryDate) >= new Date() ? "نشط" : "غير نشط / منتهي"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

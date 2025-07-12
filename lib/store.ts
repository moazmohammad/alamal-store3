// مخزن البيانات المحلي
export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[] // إضافة دعم للصور المتعددة
  rating: number
  category: string
  subcategory?: string
  badge?: string
  description: string
  inStock: boolean
  reviews: number
  stock: number
  sales: number
}

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export interface Order {
  id: string
  customer: string
  phone: string
  address: string
  items: CartItem[]
  subtotal?: number
  shipping?: number
  discount?: number
  total: number
  paymentMethod: string
  status: string
  date: string
  notes?: string
  coupon?: string
}

export interface User {
  id: number
  username: string
  password: string
  name: string
  email: string
  role: "admin" | "manager" | "employee"
  permissions: string[]
  createdAt: string
}

export interface Category {
  id: number
  name: string
  subcategories: string[]
}

export interface ForumPost {
  id: number
  title: string
  content: string
  author: string
  category: string
  createdAt: string
  replies: ForumReply[]
  views: number
}

export interface ForumReply {
  id: number
  content: string
  author: string
  createdAt: string
}

// إضافة واجهات جديدة للكوبونات والإشعارات
export interface Coupon {
  id: number
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount?: number
  maxUses?: number
  usedCount: number
  expiryDate: string
  isActive: boolean
  createdAt: string
}

export interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  createdAt: string
}

// الفئات الافتراضية
export const defaultCategories: Category[] = [
  {
    id: 1,
    name: "أدوات مكتبية",
    subcategories: ["أقلام", "دفاتر", "مشغولات يدوية", "أدوات هندسية"],
  },
  {
    id: 2,
    name: "كتب",
    subcategories: ["كتب أطفال", "روايات", "كتب علمية", "كتب دينية"],
  },
  {
    id: 3,
    name: "ألعاب",
    subcategories: ["ألعاب تعليمية", "ألعاب إلكترونية", "ألعاب خشبية", "ألعاب رياضية"],
  },
]

// المستخدمين الافتراضيين
export const defaultUsers: User[] = [
  {
    id: 1,
    username: "moaz",
    password: "01011661918",
    name: "معاذ أحمد",
    email: "moaz@hopestore.com",
    role: "admin",
    permissions: ["all"],
    createdAt: new Date().toISOString(),
  },
]

// بيانات المنتجات الافتراضية
export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "مجموعة أقلام ملونة فاخرة",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    rating: 4.8,
    category: "أدوات مكتبية",
    subcategory: "أقلام",
    badge: "خصم 25%",
    description: "مجموعة من الأقلام الملونة عالية الجودة مناسبة للرسم والكتابة",
    inStock: true,
    reviews: 124,
    stock: 25,
    sales: 89,
  },
  {
    id: 2,
    name: "كتاب الأدب العربي الحديث",
    price: 35,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    rating: 4.9,
    category: "كتب",
    subcategory: "روايات",
    badge: "الأكثر مبيعاً",
    description: "كتاب شامل عن الأدب العربي الحديث ومدارسه المختلفة",
    inStock: true,
    reviews: 89,
    stock: 15,
    sales: 156,
  },
  {
    id: 3,
    name: "لعبة الشطرنج الخشبية",
    price: 120,
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=400&fit=crop",
    rating: 4.7,
    category: "ألعاب",
    subcategory: "ألعاب خشبية",
    badge: "جديد",
    description: "لعبة شطرنج خشبية فاخرة مع قطع منحوتة يدوياً",
    inStock: true,
    reviews: 45,
    stock: 8,
    sales: 67,
  },
  {
    id: 4,
    name: "دفتر ملاحظات جلدي",
    price: 25,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    rating: 4.6,
    category: "أدوات مكتبية",
    subcategory: "دفاتر",
    description: "دفتر ملاحظات أنيق بغلاف جلدي طبيعي",
    inStock: true,
    reviews: 67,
    stock: 30,
    sales: 134,
  },
  {
    id: 5,
    name: "مشغولات يدوية - سلة خوص",
    price: 85,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.8,
    category: "أدوات مكتبية",
    subcategory: "مشغولات يدوية",
    description: "سلة خوص مصنوعة يدوياً بحرفية عالية",
    inStock: true,
    reviews: 156,
    stock: 12,
    sales: 78,
  },
]

// إضافة الكوبونات الافتراضية
export const defaultCoupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minAmount: 50,
    maxUses: 100,
    usedCount: 0,
    expiryDate: "2024-12-31",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "SAVE20",
    discount: 20,
    type: "fixed",
    minAmount: 100,
    maxUses: 50,
    usedCount: 0,
    expiryDate: "2024-12-31",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]

// إضافة الإشعارات الافتراضية
export const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "مرحباً بك في مكتبة الأمل",
    message: "تم إعداد النظام بنجاح وجميع الوظائف تعمل بشكل صحيح",
    type: "success",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
]

// وظائف إدارة البيانات مع دعم التزامن عبر المتصفحات
export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return defaultProducts
  const stored = localStorage.getItem("products")
  if (!stored) {
    localStorage.setItem("products", JSON.stringify(defaultProducts))
    return defaultProducts
  }
  return JSON.parse(stored)
}

export const saveProducts = (products: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("lastUpdate", Date.now().toString())
    // إشعار التحديث
    window.dispatchEvent(new Event("productsUpdated"))
    // إشعار التزامن
    window.dispatchEvent(new CustomEvent("dataSync", { detail: { type: "products", data: products } }))
  }
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("cart")
  return stored ? JSON.parse(stored) : []
}

export const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
  }
}

export const getFavorites = (): number[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("favorites")
  return stored ? JSON.parse(stored) : []
}

export const saveFavorites = (favorites: number[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }
}

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("orders")
  return stored ? JSON.parse(stored) : []
}

export const saveOrders = (orders: Order[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("orders", JSON.stringify(orders))
    localStorage.setItem("lastUpdate", Date.now().toString())
    window.dispatchEvent(new Event("ordersUpdated"))
    // إشعار التزامن للطلبات الجديدة
    window.dispatchEvent(new CustomEvent("dataSync", { detail: { type: "orders", data: orders } }))
  }
}

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return defaultUsers
  const stored = localStorage.getItem("users")
  if (!stored) {
    localStorage.setItem("users", JSON.stringify(defaultUsers))
    return defaultUsers
  }
  return JSON.parse(stored)
}

export const saveUsers = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users))
  }
}

export const getCategories = (): Category[] => {
  if (typeof window === "undefined") return defaultCategories
  const stored = localStorage.getItem("categories")
  if (!stored) {
    localStorage.setItem("categories", JSON.stringify(defaultCategories))
    return defaultCategories
  }
  return JSON.parse(stored)
}

export const saveCategories = (categories: Category[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("categories", JSON.stringify(categories))
  }
}

export const getForumPosts = (): ForumPost[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("forumPosts")
  return stored ? JSON.parse(stored) : []
}

export const saveForumPosts = (posts: ForumPost[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("forumPosts", JSON.stringify(posts))
  }
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("currentUser")
  return stored ? JSON.parse(stored) : null
}

export const setCurrentUser = (user: User | null) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("currentUser")
    }
  }
}

// إضافة وظائف إدارة الكوبونات
export const getCoupons = (): Coupon[] => {
  if (typeof window === "undefined") return defaultCoupons
  const stored = localStorage.getItem("coupons")
  if (!stored) {
    localStorage.setItem("coupons", JSON.stringify(defaultCoupons))
    return defaultCoupons
  }
  return JSON.parse(stored)
}

export const saveCoupons = (coupons: Coupon[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("coupons", JSON.stringify(coupons))
  }
}

// إضافة وظائف إدارة الإشعارات
export const getNotifications = (): Notification[] => {
  if (typeof window === "undefined") return defaultNotifications
  const stored = localStorage.getItem("notifications")
  if (!stored) {
    localStorage.setItem("notifications", JSON.stringify(defaultNotifications))
    return defaultNotifications
  }
  return JSON.parse(stored)
}

export const saveNotifications = (notifications: Notification[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }
}

// إضافة وظيفة إضافة فئة فرعية جديدة
export const addSubcategory = (categoryName: string, subcategory: string) => {
  const categories = getCategories()
  const updatedCategories = categories.map((cat) =>
    cat.name === categoryName ? { ...cat, subcategories: [...cat.subcategories, subcategory] } : cat,
  )
  saveCategories(updatedCategories)
  return updatedCategories
}

// إضافة نظام التزامن عبر المتصفحات
export const initializeSync = () => {
  if (typeof window === "undefined") return

  // الاستماع لتغييرات localStorage من متصفحات أخرى
  window.addEventListener("storage", (e) => {
    if (e.key === "products" || e.key === "orders") {
      window.dispatchEvent(new Event(`${e.key}Updated`))
    }
  })

  // فحص دوري للتحديثات
  setInterval(() => {
    const lastUpdate = localStorage.getItem("lastUpdate")
    const currentTime = Date.now()

    // إذا كان هناك تحديث خلال آخر 5 ثوانٍ
    if (lastUpdate && currentTime - Number.parseInt(lastUpdate) < 5000) {
      window.dispatchEvent(new Event("productsUpdated"))
      window.dispatchEvent(new Event("ordersUpdated"))
    }
  }, 2000)
}

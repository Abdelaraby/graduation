import toast from "react-hot-toast";

export const checkCheckoutFormData = (checkoutData: {
  email_address: string;
  address: string;
  city: string;
  country: string;
  region: string;
  postal_code: string;
  phone: string;
  payment_type: string;
  subtotal: number;
  products: { id: number }[];
  latitude: string;
  longitude: string;
  amount: number;
}): boolean => {
  if (!checkoutData.email_address) {
    toast.error("البريد الإلكتروني مطلوب");
    return false;
  }
  if (!checkoutData.address) {
    toast.error("العنوان مطلوب");
    return false;
  }
  if (!checkoutData.city) {
    toast.error("المدينة مطلوبة");
    return false;
  }
  if (!checkoutData.country) {
    toast.error("الدولة مطلوبة");
    return false;
  }
  if (!checkoutData.region) {
    toast.error("المنطقة/المحافظة مطلوبة");
    return false;
  }
  if (!checkoutData.postal_code) {
    toast.error("الرمز البريدي مطلوب");
    return false;
  }
  if (!checkoutData.phone) {
    toast.error("رقم الهاتف مطلوب");
    return false;
  }
  if (!checkoutData.payment_type) {
    toast.error("نوع الدفع مطلوب");
    return false;
  }
  if (checkoutData.products.length === 0) {
    toast.error("يجب اختيار منتجات");
    return false;
  }
  if (checkoutData.subtotal <= 0) {
    toast.error("المجموع الفرعي يجب أن يكون أكبر من صفر");
    return false;
  }
  if (!checkoutData.latitude || !checkoutData.longitude) {
    toast.error("من فضلك اختر مكانًا من الخريطة");
    return false;
  }

  return true;
};
import toast from "react-hot-toast";

export const checkCheckoutFormData = (checkoutData: {
  data: {
    [k: string]: FormDataEntryValue;
  };
  products: any[];
  subtotal: number;
}) => {
  if (!checkoutData.data?.address || checkoutData.data.address === "") {
    toast.error("العنوان مطلوب");
    return false;
  }
  if (!checkoutData.data?.city || checkoutData.data.city === "") {
    toast.error("المدينة مطلوبة");
    return false;
  }
  if (!checkoutData.data?.country || checkoutData.data.country === "") {
    toast.error("الدولة مطلوبة");
    return false;
  }
  if (!checkoutData.data?.latitude || !checkoutData.data?.longitude) {
    toast.error("من فضلك اختاري مكان من الخريطة");
    return false;
  }
  if (checkoutData.data?.cardNumber === "") {
    toast.error("رقم الكارت مطلوب");
    return false;
  }
  if (checkoutData.data?.cvc === "") {
    toast.error("رقم CVC مطلوب");
    return false;
  }
  if (checkoutData.data?.emailAddress === "") {
    toast.error("البريد الإلكتروني مطلوب");
    return false;
  }
  if (checkoutData.data?.expirationDate === "") {
    toast.error("تاريخ انتهاء الصلاحية مطلوب");
    return false;
  }
  if (checkoutData.data?.firstName === "") {
    toast.error("الاسم الأول مطلوب");
    return false;
  }
  if (checkoutData.data?.lastName === "") {
    toast.error("اسم العائلة مطلوب");
    return false;
  }
  if (checkoutData.data?.nameOnCard === "") {
    toast.error("الاسم على الكارت مطلوب");
    return false;
  }
  if (checkoutData.data?.paymentType === "") {
    toast.error("نوع الدفع مطلوب");
    return false;
  }
  if (checkoutData.data?.phone === "") {
    toast.error("رقم الهاتف مطلوب");
    return false;
  }
  if (checkoutData?.products.length === 0) {
    toast.error("لازم تختاري منتجات");
    return false;
  }
  if (checkoutData?.subtotal === 0) {
    toast.error("الإجمالي مطلوب");
    return false;
  }
  return true;
};
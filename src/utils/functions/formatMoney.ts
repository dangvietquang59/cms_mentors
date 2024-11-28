export function formatMoney(
  amount: number,
  locale: string = "vi-VN",
  currency: string = "VND"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

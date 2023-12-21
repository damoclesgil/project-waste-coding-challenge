export default function formatPrice(price) {
  let value = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price);
  if (value === "$NaN") {
    return "$ 0";
  }
  return value;
}

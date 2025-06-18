export const formatPrice = (amount, currency = "৳") => {
  const formatted = amount.toLocaleString("en-BD"); 
  return (
    <div className="flex items-center gap-1">
      {currency} {" "}
      {formatted}
    </div>
  );
};

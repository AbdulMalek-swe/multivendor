export const maskPhone = (phone) => {
  if (!phone || phone.length < 5) return phone;
  const first = phone.slice(0, 3);
  const last = phone.slice(-2);
  const masked = "*".repeat(phone.length - 5);
  return `${first}${masked}${last}`;
};
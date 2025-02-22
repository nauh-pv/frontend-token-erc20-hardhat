export const numberFormat = (value: number | string) =>
  new Intl.NumberFormat().format(Number(value));

export const showSortAddress = (address?: string): string => {
  return `${address?.slice(0, 6)}...${address?.substring(
    address.length - 4,
    address.length - 1
  )}`;
};

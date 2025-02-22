export interface WalletProps {
  address: string | null;
  balance: string | null;
  tokens: { symbol: string; balance: string }[];
}

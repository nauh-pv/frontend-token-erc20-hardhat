export interface WalletProps {
  address: string | null;
  balance: string | null;
  tokens: TokenProps[];
}

interface TokenProps {
  symbol: string;
  balance: string;
}

export interface LoadingButtonState {
  groupIndex: number | null;
  optionIndex: number | null;
}

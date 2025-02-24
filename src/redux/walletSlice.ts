// src/features/wallet/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletProps } from "../types";

const initialState: WalletProps = {
  address: null,
  balance: null,
  tokens: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
    },
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.balance = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{ symbol: string; balance: string }[]>
    ) => {
      state.tokens = action.payload;
    },
    addToken: (
      state,
      action: PayloadAction<{ symbol: string; balance: string }>
    ) => {
      state.tokens.push(action.payload);
    },
    resetWallet: () => initialState,
  },
});

export const { setAddress, setBalance, setTokens, addToken, resetWallet } =
  walletSlice.actions;
export default walletSlice.reducer;

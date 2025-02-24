// app/providers.tsx
"use client";

import { store } from "@/src/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

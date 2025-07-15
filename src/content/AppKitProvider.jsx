import { createAppKit, useAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = "94d733d4b2da25b32aecaf3fa8bcdec9";

const metadata = {
  name: "AppKit Example",
  description: "AppKit Example Application",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};


const bsc = {
  id: 56,
  name: "Binance Smart Chain",
  rpcUrls: {
    default: "https://bsc-dataseed.binance.org",
  },
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};

const networks = [bsc];
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    swaps: false,
    send: false,
    receive: false,
  },
  ui: {
    walletModal: {
      actions: false,
    },
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

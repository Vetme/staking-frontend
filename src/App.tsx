import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  INFURA_API_KEY,
  WEB3_MODEL_PROJECT_ID,
  chains as chs,
} from "./lib/constants";
import AllRoutes from "./routes";
import { GlobalStyles } from "./styles";
// import { w3mProvider, EthereumClient } from "@web3modal/ethereum";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { InjectedConnector } from "wagmi/connectors/injected";
import { infuraProvider } from "wagmi/providers/infura";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
function App() {
  const { chains, publicClient } = configureChains(chs, [
    infuraProvider({ apiKey: INFURA_API_KEY }),
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new InjectedConnector({
        chains,
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: WEB3_MODEL_PROJECT_ID,
        },
      }),
    ],
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <AllRoutes />
      <GlobalStyles />

      <div style={{ position: "relative", zIndex: 999999 }}>
        <ToastContainer />
      </div>
    </WagmiConfig>
  );
}

export default App;

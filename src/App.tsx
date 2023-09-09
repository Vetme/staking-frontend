import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { WEB3_MODEL_PROJECT_ID, chains } from "./lib/constants";
import AllRoutes from "./routes";
import { GlobalStyles } from "./styles";
import {
  w3mConnectors,
  w3mProvider,
  EthereumClient,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const projectId = WEB3_MODEL_PROJECT_ID;

function App() {
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <WagmiConfig config={wagmiConfig}>
      <AllRoutes />
      <GlobalStyles />

      <div style={{ position: "relative", zIndex: 999999 }}>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

        <ToastContainer />
      </div>
    </WagmiConfig>
  );
}

export default App;

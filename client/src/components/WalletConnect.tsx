/**
 * WalletConnect.tsx — AgentCorp Wallet Connection Component
 * Design: Industrial Legal Modernism — brass/gold on near-black
 *
 * Provides a self-contained wallet connection modal with:
 * - MetaMask, Coinbase Wallet, WalletConnect, and Rabby options
 * - EIP-1193 provider detection (window.ethereum)
 * - Address display, balance fetch, and disconnect
 * - Mobile-responsive layout
 */

import { useState, useEffect, useCallback } from "react";

const BRASS = "#c9a84c";
const BLACK = "#080808";
const WHITE = "#f2efe8";
const MUTED = "rgba(242,239,232,0.45)";
const BORDER = "rgba(201,168,76,0.15)";

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
}

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  detect: () => boolean;
  connect: () => Promise<string>;
}

const WALLET_OPTIONS: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
    detect: () => typeof window !== "undefined" && !!(window as any).ethereum?.isMetaMask,
    connect: async () => {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect using Coinbase Wallet",
    detect: () => typeof window !== "undefined" && !!(window as any).ethereum?.isCoinbaseWallet,
    connect: async () => {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },
  },
  {
    id: "injected",
    name: "Browser Wallet",
    icon: "🌐",
    description: "Any injected Web3 wallet (Rainbow, Rabby, etc.)",
    detect: () => typeof window !== "undefined" && !!(window as any).ethereum,
    connect: async () => {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    },
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan QR code with any mobile wallet",
    detect: () => true,
    connect: async () => {
      // WalletConnect v2 would require @walletconnect/modal — show info for now
      throw new Error("WALLETCONNECT_REDIRECT");
    },
  },
];

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatBalance(wei: string): string {
  const eth = parseInt(wei, 16) / 1e18;
  return eth.toFixed(4);
}

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  compact?: boolean;
}

export function WalletConnect({ onConnect, onDisconnect, compact = false }: WalletConnectProps) {
  const [showModal, setShowModal] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    error: null,
  });

  // Check for already-connected wallet on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === "undefined" || !(window as any).ethereum) return;
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
          const balance = await (window as any).ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          });
          setWallet({
            address: accounts[0],
            balance: formatBalance(balance),
            chainId: parseInt(chainId, 16),
            isConnecting: false,
            error: null,
          });
          onConnect?.(accounts[0]);
        }
      } catch {
        // Silently fail — user hasn't connected yet
      }
    };
    checkConnection();
  }, []);

  // Listen for account/chain changes
  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;
    const eth = (window as any).ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWallet({ address: null, balance: null, chainId: null, isConnecting: false, error: null });
        onDisconnect?.();
      } else {
        setWallet((prev) => ({ ...prev, address: accounts[0] }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWallet((prev) => ({ ...prev, chainId: parseInt(chainId, 16) }));
    };

    eth.on("accountsChanged", handleAccountsChanged);
    eth.on("chainChanged", handleChainChanged);
    return () => {
      eth.removeListener("accountsChanged", handleAccountsChanged);
      eth.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const connectWallet = useCallback(async (option: WalletOption) => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      const address = await option.connect();
      const eth = (window as any).ethereum;
      const chainId = await eth.request({ method: "eth_chainId" });
      const balance = await eth.request({ method: "eth_getBalance", params: [address, "latest"] });

      setWallet({
        address,
        balance: formatBalance(balance),
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        error: null,
      });
      setShowModal(false);
      onConnect?.(address);

      // Suggest switching to Base (chainId 8453) if not already on it
      if (parseInt(chainId, 16) !== 8453) {
        try {
          await eth.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x2105" }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await eth.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x2105",
                chainName: "Base",
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: ["https://basescan.org"],
              }],
            });
          }
        }
      }
    } catch (err: any) {
      if (err.message === "WALLETCONNECT_REDIRECT") {
        window.open("https://walletconnect.com/", "_blank");
        setWallet((prev) => ({ ...prev, isConnecting: false, error: null }));
        return;
      }
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err.message?.includes("rejected") ? "Connection rejected by user." : "Failed to connect wallet.",
      }));
    }
  }, [onConnect]);

  const disconnect = useCallback(() => {
    setWallet({ address: null, balance: null, chainId: null, isConnecting: false, error: null });
    onDisconnect?.();
  }, [onDisconnect]);

  const isBase = wallet.chainId === 8453;

  // ── Connected state ──
  if (wallet.address) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        {!isBase && (
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#e57373",
              border: "1px solid rgba(229,115,115,0.3)",
              padding: "6px 12px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            ⚠ Wrong Network — Switch to Base
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: `1px solid ${BORDER}`,
            padding: compact ? "8px 14px" : "12px 20px",
            background: "rgba(201,168,76,0.05)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isBase ? "#4caf50" : "#e57373",
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: compact ? "11px" : "13px",
                color: WHITE,
                letterSpacing: "0.05em",
              }}
            >
              {truncateAddress(wallet.address)}
            </div>
            {!compact && wallet.balance && (
              <div style={{ fontSize: "10px", color: MUTED, marginTop: "2px" }}>
                {wallet.balance} ETH {isBase ? "· Base" : `· Chain ${wallet.chainId}`}
              </div>
            )}
          </div>
          <button
            onClick={disconnect}
            style={{
              background: "none",
              border: `1px solid rgba(201,168,76,0.2)`,
              color: MUTED,
              fontSize: "9px",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              transition: "all 0.2s",
              marginLeft: "4px",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(229,115,115,0.5)";
              (e.target as HTMLElement).style.color = "#e57373";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
              (e.target as HTMLElement).style.color = MUTED;
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    );
  }

  // ── Disconnected state ──
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={wallet.isConnecting}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: BRASS,
          color: BLACK,
          padding: compact ? "10px 20px" : "16px 32px",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: compact ? "11px" : "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          border: "none",
          cursor: wallet.isConnecting ? "wait" : "pointer",
          transition: "opacity 0.2s",
          opacity: wallet.isConnecting ? 0.7 : 1,
          width: compact ? "auto" : "100%",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => { if (!wallet.isConnecting) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
        onMouseLeave={(e) => { if (!wallet.isConnecting) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      >
        {wallet.isConnecting ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span>
            Connecting...
          </>
        ) : (
          <>
            <span>◈</span>
            Connect Wallet
          </>
        )}
      </button>

      {wallet.error && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "11px",
            color: "#e57373",
            fontFamily: "'DM Mono', monospace",
            padding: "8px 12px",
            border: "1px solid rgba(229,115,115,0.2)",
            background: "rgba(229,115,115,0.05)",
          }}
        >
          {wallet.error}
        </div>
      )}

      {/* ── WALLET MODAL ── */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            style={{
              background: "#0d0d0d",
              border: `1px solid rgba(201,168,76,0.25)`,
              width: "100%",
              maxWidth: "440px",
              position: "relative",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: `1px solid ${BORDER}`,
                background: "rgba(201,168,76,0.04)",
              }}
            >
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "16px", color: WHITE }}>
                  Connect Wallet
                </div>
                <div style={{ fontSize: "10px", color: MUTED, fontFamily: "'DM Mono', monospace", marginTop: "2px", letterSpacing: "0.08em" }}>
                  Select a wallet to connect to Base
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: MUTED,
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  lineHeight: 1,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = WHITE; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = MUTED; }}
              >
                ×
              </button>
            </div>

            {/* Wallet options */}
            <div style={{ padding: "8px" }}>
              {WALLET_OPTIONS.map((option) => {
                const isDetected = option.detect();
                return (
                  <button
                    key={option.id}
                    onClick={() => connectWallet(option)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      width: "100%",
                      padding: "16px 20px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.2s",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{option.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: WHITE,
                          marginBottom: "2px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {option.name}
                        {isDetected && option.id !== "walletconnect" && (
                          <span
                            style={{
                              fontSize: "8px",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "#4caf50",
                              border: "1px solid rgba(76,175,80,0.3)",
                              padding: "2px 6px",
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            Detected
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "11px", color: MUTED, fontFamily: "'DM Mono', monospace" }}>
                        {option.description}
                      </div>
                    </div>
                    <span style={{ color: BRASS, fontSize: "14px", flexShrink: 0 }}>→</span>
                  </button>
                );
              })}
            </div>

            {/* Base network info */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: `1px solid ${BORDER}`,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0052ff", flexShrink: 0 }} />
              <div style={{ fontSize: "10px", color: MUTED, fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>
                AgentCorp runs on <span style={{ color: WHITE }}>Base</span> (Chain ID 8453). Your wallet will be prompted to switch networks after connecting.
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

export default WalletConnect;

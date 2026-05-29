import type { Address, Hex } from "viem";
import { publicClient } from "./client.js";
import { BASE_SEPOLIA_USDC_ADDRESS, usdcAbi } from "./usdc.js";

export interface IncomingUsdcTransfer {
  from: Address;
  amount: bigint;
  txHash: Hex;
}

export function watchIncomingUsdc(
  settlementAddress: Address,
  onTransfer: (transfer: IncomingUsdcTransfer) => void,
): () => void {
  return publicClient.watchContractEvent({
    address: BASE_SEPOLIA_USDC_ADDRESS,
    abi: usdcAbi,
    eventName: "Transfer",
    args: {
      to: settlementAddress,
    },
    onLogs: (logs) => {
      for (const log of logs) {
        const { from, value } = log.args;

        if (!from || value === undefined) {
          continue;
        }

        onTransfer({
          from,
          amount: value,
          txHash: log.transactionHash,
        });
      }
    },
  });
}

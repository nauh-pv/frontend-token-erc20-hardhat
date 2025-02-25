export const CONTRACT_ADDRESSES = {
  floppy: "0x956606FE93AdA314D4Cf4db2fa78b3fdB8110605",
  USDT: "0xFfd8E1418B13c36be106d854b4792F81Bc11f4F7",
  FLPcrowndSale: "0xb4cdd6d8fB2210d0Cb5eC473d56C771eef5d2A2c",
};

import FloppyABI from "@/src/abis/Floppy.json";
import USDTABI from "@/src/abis/USDT.json";
import CrowndSaleABI from "@/src/abis/FLPCrowndSale.json";

export const CONTRACT_ABIS = {
  floppy: FloppyABI,
  USDT: USDTABI,
  FLPcrowndSale: CrowndSaleABI,
};

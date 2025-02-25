import { ethers } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

export const getTokenBalance = async (
  provider: ethers.BrowserProvider,
  walletAddress: string,
  tokenAddress: string
) => {
  try {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(walletAddress);

    return ethers.formatUnits(balance, decimals); // Convert từ wei sang số thực
  } catch (error) {
    console.error("❌ Lỗi khi lấy số dư token:", error);
    return "0";
  }
};

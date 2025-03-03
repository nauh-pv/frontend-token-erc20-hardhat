import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../config/contractConfig";
import { LoadingButtonState } from "../types";
import { message } from "antd";

export const buyTokenWithBNB = async (
  bnbAmount: string,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingButtonState[]>>,
  groupIndex: number,
  optionIndex: number
) => {
  if (!(window as any).ethereum) return alert("Please install MetaMask!");

  setIsLoading((prev) => {
    return [...prev, { groupIndex, optionIndex }];
  });

  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    // Lấy số dư BNB của ví
    const balance = await provider.getBalance(walletAddress);
    console.log("Số dư BNB Testnet:", ethers.formatEther(balance), "BNB");

    if (balance <= ethers.parseEther("0.01")) {
      alert("Số dư BNB Testnet quá thấp, hãy nạp thêm từ Faucet.");
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra số dư BNB:", error);
  }

  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.FLPcrowndSale,
      CONTRACT_ABIS.FLPcrowndSale,
      signer
    );

    const tx = await contract.buyTokenByBNB({
      value: ethers.parseEther(bnbAmount),
      gasLimit: 300000,
    });

    await tx.wait();
    message.success("Mua FLP bằng BNB thành công!");
  } catch (error) {
    console.error("Lỗi khi mua FLP bằng BNB:", error);
    message.error("Mua FLP bằng BNB thất bại!");
  } finally {
    setIsLoading((prev) =>
      prev.filter(
        (item) =>
          item.groupIndex !== groupIndex && item.optionIndex !== optionIndex
      )
    );
  }
};

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

export const buyTokenWithUSDT = async (
  usdtAmount: string,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingButtonState[]>>,
  groupIndex: number,
  optionIndex: number
) => {
  if (!(window as any).ethereum) return alert("Please install MetaMask!");

  setIsLoading((prev) => [...prev, { groupIndex, optionIndex }]);

  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();

    // Kết nối tới hợp đồng USDT (ERC-20)
    const usdtContract = new ethers.Contract(
      CONTRACT_ADDRESSES.USDT,
      CONTRACT_ABIS.USDT,
      signer
    );

    // Kiểm tra số dư USDT của ví
    const usdtBalance = await usdtContract.balanceOf(walletAddress);
    console.log("Số dư USDT:", ethers.formatUnits(usdtBalance, 18), "USDT");

    if (usdtBalance < ethers.parseUnits(usdtAmount, 18)) {
      return message.error("Số dư USDT không đủ, hãy nạp thêm.");
    }

    // Kiểm tra allowance (nếu chưa approve thì thực hiện approve)
    const allowance = await usdtContract.allowance(
      walletAddress,
      CONTRACT_ADDRESSES.FLPcrowndSale
    );

    if (allowance < ethers.parseUnits(usdtAmount, 18)) {
      const approveTx = await usdtContract.approve(
        CONTRACT_ADDRESSES.FLPcrowndSale,
        ethers.parseUnits(usdtAmount, 18)
      );
      await approveTx.wait();
      message.success("Đã approve USDT thành công.");
    } else {
      console.log("USDT đã được approve trước đó.");
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra hoặc approve USDT:", error);
    return message.error("Không thể approve USDT. Vui lòng thử lại.");
  }

  try {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    // Kết nối tới Smart Contract FLPcrowndSale
    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.FLPcrowndSale,
      CONTRACT_ABIS.FLPcrowndSale,
      signer
    );

    // Thực hiện giao dịch mua FLP bằng USDT
    const tx = await contract.buyTokenByUSDT(
      ethers.parseUnits(usdtAmount, 18), // Lượng USDT sử dụng
      {
        gasLimit: 300000,
      }
    );

    await tx.wait();
    message.success("Mua FLP bằng USDT thành công!");
  } catch (error) {
    console.error("Lỗi khi mua FLP bằng USDT:", error);
    message.error("Mua FLP bằng USDT thất bại!");
  } finally {
    setIsLoading((prev) =>
      prev.filter(
        (item) =>
          !(item.groupIndex === groupIndex && item.optionIndex === optionIndex)
      )
    );
  }
};

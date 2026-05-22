"use client"

import InputField from "@/src/components/ui/InputField"
import { useState, useMemo } from "react"

import {
    chainsToTSender,
    tsenderAbi,
    erc20Abi,
} from "@/src/constants"

import {
    useChainId,
    useConfig,
    useAccount,
    useWriteContract,
} from "wagmi"

import {
    readContract,
    waitForTransactionReceipt,
} from "@wagmi/core"

import { calculateTotal } from "@/src/utils/calculateTotal/calculateTotal"

export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("")
    const [recipients, setRecipients] = useState("")
    const [amount, setAmount] = useState("")
    const [isConfirming, setIsConfirming] = useState(false)

    const chainId = useChainId()
    const config = useConfig()
    const account = useAccount()

    const total: number = useMemo(
        () => calculateTotal(amount),
        [amount]
    )

    const {
        isPending,
        writeContractAsync,
    } = useWriteContract()

    const isLoading = isPending || isConfirming

    async function getApprovedAmount(
        tSenderAddress: string
    ): Promise<number> {

        if (!account.address) {
            alert("Please connect wallet")
            return 0
        }

        if (!tokenAddress) {
            alert("Please enter token address")
            return 0
        }

        const response = await readContract(config, {
            abi: erc20Abi,

            address: tokenAddress as `0x${string}`,

            functionName: "allowance",

            args: [
                account.address as `0x${string}`,
                tSenderAddress as `0x${string}`,
            ],
        })

        return Number(response)
    }

    async function handleSubmit() {

        const chainData = chainsToTSender[chainId]

        if (!chainData) {
            alert("Unsupported chain")
            return
        }

        const tSenderAddress = chainData.tsender

        try {

            const approvedAmount =
                await getApprovedAmount(tSenderAddress)

            if (approvedAmount < total) {

                const approvedHash =
                    await writeContractAsync({
                        abi: erc20Abi,

                        address:
                            tokenAddress as `0x${string}`,

                        functionName: "approve",

                        args: [
                            tSenderAddress as `0x${string}`,
                            BigInt(total),
                        ],
                    })

                setIsConfirming(true)

                await waitForTransactionReceipt(config, {
                    hash: approvedHash,
                })

                setIsConfirming(false)
            }

            const airdropHash =
                await writeContractAsync({
                    abi: tsenderAbi,

                    address:
                        tSenderAddress as `0x${string}`,

                    functionName: "airdropERC20",

                    args: [
                        tokenAddress,

                        recipients
                            .split(/[,\n]+/)
                            .map((addr) => addr.trim())
                            .filter((addr) => addr !== ""),

                        amount
                            .split(/[,\n]+/)
                            .map((amt) => amt.trim())
                            .filter((amt) => amt !== ""),

                        BigInt(total),
                    ],
                })

            setIsConfirming(true)

            await waitForTransactionReceipt(config, {
                hash: airdropHash,
            })

            setIsConfirming(false)

            alert("Airdrop successful!")

        } catch (error) {

            console.error(error)

            setIsConfirming(false)

            alert("Transaction failed")
        }
    }

    return (
        <div
            className="
                w-full max-w-2xl mx-auto
                rounded-3xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-2xl shadow-black/20
                p-8
            "
        >
            {/* Heading */}
            <div className="mb-8">

                <h2 className="text-3xl font-black text-white tracking-tight">
                    Send Airdrop
                </h2>

                <p className="text-gray-400 mt-2">
                    Distribute ERC20 tokens instantly.
                </p>
            </div>

            {/* Inputs */}
            <div className="space-y-6">

                <InputField
                    label="Token Address"
                    placeholder="0x..."
                    value={tokenAddress}
                    onChange={(e) =>
                        setTokenAddress(e.target.value)
                    }
                />

                <InputField
                    label="Recipients"
                    placeholder="0x..., 0x..."
                    value={recipients}
                    onChange={(e) =>
                        setRecipients(e.target.value)
                    }
                    large
                />

                <InputField
                    label="Amounts"
                    placeholder="100, 200, 300..."
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                    large
                />
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">

                <div
                    className="
                        px-4 py-3 rounded-2xl
                        bg-white/5 border border-white/10
                    "
                >
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                        Total
                    </p>

                    <p className="text-xl font-bold text-white">
                        {total || 0}
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="
                        relative overflow-hidden
                        flex items-center justify-center gap-3
                        px-7 py-3.5
                        rounded-2xl
                        font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:from-blue-500 hover:to-indigo-500
                        active:scale-[0.98]
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        transition-all duration-200
                        shadow-xl shadow-blue-900/30
                        min-w-[220px]
                    "
                >

                    {isLoading && (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />

                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                    )}

                    <span>
                        {isPending &&
                            "Waiting for MetaMask..."}

                        {isConfirming &&
                            "Confirming Transaction..."}

                        {!isLoading &&
                            "Send Tokens"}
                    </span>
                </button>
            </div>
        </div>
    )
}
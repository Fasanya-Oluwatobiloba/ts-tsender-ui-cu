"use client"

import {getDefaultConfig} from "@rainbow-me/rainbowkit"
import { http } from "wagmi"
import {anvil, zksync, mainnet} from "wagmi/chains"

export default getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID!,
  chains: [anvil, zksync, mainnet],
  ssr: false
})
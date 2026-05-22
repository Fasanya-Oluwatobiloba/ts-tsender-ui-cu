"use client"

import dynamic from "next/dynamic"
import { ReactNode } from "react"

const Provider = dynamic(
  () => import("./providers").then((mod) => mod.Provider),
  { ssr: false }
)

export default function ClientProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}
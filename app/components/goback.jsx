'use client'
import React from 'react'
import { useRouter } from "next/navigation"

export default function Goback() {
    const router = useRouter()
  return (
    <>
    <button onClick={() => router.back()} className="backbtn">
&#8592; go back
</button>
    </>
  )
}
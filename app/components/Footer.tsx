"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import "animate.css";
import Link from "next/link";

export default function Header({ session }: { session: Session | null }) {
 
  return (
    <header className="border-b p-5 flex justify-between">
      <nav className="flex gap-2 *:rounded *:px-2 *:py-1">
        <Link href={"placeholder"}>About us</Link>
        <Link href={"placeholder"}>Private Policy</Link>
        <Link href={"placeholder"}>Jadyn Worthington & Donovan Daniels </Link>

      </nav>
    </header>
  );
}

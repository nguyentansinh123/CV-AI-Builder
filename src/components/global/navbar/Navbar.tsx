"use client"
import { UserButton } from '@clerk/nextjs'
import { CreditCard, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from '../changeTheme/ThemeToggle'
import {dark} from "@clerk/themes"
import { useTheme } from 'next-themes'

const Navbar = () => {

  const {theme} = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-sm border-b dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/resumes" className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-md bg-blue-600 flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight dark:text-white">
            CV Builder Pro
          </span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/resumes" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            My Resumes
          </Link>
          <Link href="/templates" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            Templates
          </Link>
          <Link href="/ai-writer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            AI Writer
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle/>
          <Link 
            href="/pricing" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors"
          >
            Upgrade
          </Link>
          
          <UserButton
            appearance={{
              baseTheme: theme ==="dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
              <UserButton.Link
                label="My Resumes"
                labelIcon={<FileText className="size-4" />}
                href="/resumes"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  )
}

export default Navbar
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ButtonLoadingProps extends ButtonProps {
  loading?: boolean
  children: React.ReactNode
  loadingText?: string
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ 
    className, 
    children, 
    loading = false, 
    disabled, 
    loadingText = "Loading...",
    ...props 
  }, ref) => {
    return (
      <Button
        className={cn(
          "relative overflow-hidden transition-all",
          loading && "shadow-inner",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="mr-2"
              >
                <Loader2 className="h-4 w-4" />
              </motion.div>
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {loadingText}
              </motion.span>
              <motion.span 
                className="ml-0.5"
                animate={{ 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                .
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            className="absolute inset-0 bg-current opacity-10"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          />
        )}
      </Button>
    )
  }
)

ButtonLoading.displayName = "ButtonLoading"

export { ButtonLoading }
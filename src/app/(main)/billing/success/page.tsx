"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: -20,
              scale: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              y: `${Math.random() * 100 + 100}vh`,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              ease: "easeOut",
              delay: Math.random() * 2,
            }}
            style={{ 
              width: `${Math.random() * 20 + 5}px`, 
              height: `${Math.random() * 20 + 5}px`,
              background: `hsl(${Math.random() * 360}, 80%, 70%, 0.4)`
            }}
          />
        ))}
      </div>

      <main className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-16">
        <motion.div
          className="space-y-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="border-primary/20 shadow-lg overflow-hidden w-full">
            <div className="relative h-1.5 w-full bg-muted overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </div>

            <CardContent className="p-8 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10,
                  delay: 0.2 
                }}
                className="flex justify-center"
              >
                <div className="relative">
                  <CheckCircle size={64} className="text-primary" />
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Sparkles size={20} className="text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 
                  className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Payment Successful!
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className="text-muted-foreground">
                    Your premium account has been activated. Enjoy all the pro features!
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="pt-2 flex items-center justify-center gap-2 text-sm text-primary/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <CreditCard size={16} />
                <span>Payment processed securely</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="font-medium px-8 relative overflow-hidden group"
                >
                  <Link href="/resumes">
                    <motion.span
                      className="absolute inset-0 bg-primary/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">
                      Go to my resumes
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
          
          <motion.div
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p>
              A confirmation email has been sent to your registered email address.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
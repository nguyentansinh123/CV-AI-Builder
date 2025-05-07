"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FileText, Star, CheckCircle, FilePlus, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(featureInterval);
  }, []);

  const features = [
    { 
      icon: <FileText className="h-8 w-8 mb-2" />, 
      title: 'Easy to Use', 
      description: 'Intuitive drag-and-drop interface designed for speed and simplicity' 
    },
    { 
      icon: <Star className="h-8 w-8 mb-2" />, 
      title: 'Professional Templates', 
      description: 'Curated designs for every industry and career level' 
    },
    { 
      icon: <CheckCircle className="h-8 w-8 mb-2" />, 
      title: 'ATS Optimized', 
      description: 'Engineered to pass applicant tracking systems with higher success rates' 
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-950 flex flex-col items-center justify-center px-4 text-white relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 w-full"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100 
            }}
            className="mb-10 relative"
          >
            <motion.div
              className="absolute -top-4 -right-4 text-yellow-300"
              animate={{ 
                rotate: [0, 20, 0, -20, 0],
                scale: [1, 1.2, 1, 0.9, 1] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={24} />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-4 text-cyan-300"
              animate={{ 
                rotate: [0, -20, 0, 20, 0],
                scale: [1, 0.9, 1, 1.2, 1] 
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <Sparkles size={24} />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-pink-300">
              CV Builder Pro
            </h1>
            <Badge variant="outline" className="text-md bg-white/10 backdrop-blur-sm px-3 py-1 font-medium text-cyan-100">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Built for Career Success
              </motion.span>
            </Badge>
            <p className="text-xl md:text-2xl text-gray-200 mt-4">Create professional resumes in minutes</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-200 mb-8">
              Craft stunning, ATS-friendly resumes that stand out to employers. 
              Our intuitive tools make building your professional story simple and effective.
            </p>

            <div className="relative h-64 mb-4">
              <AnimatePresence mode="wait">
                {features.map((feature, i) => (
                  activeFeature === i && (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="h-full flex flex-col items-center justify-center p-6 bg-black/30 backdrop-blur-md border-white/10 text-white">
                        <motion.div 
                          className="text-cyan-300"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold mt-2 mb-2">{feature.title}</h3>
                        <p className="text-gray-300 text-center">{feature.description}</p>
                      </Card>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-2 h-2 rounded-full ${activeFeature === i ? 'bg-cyan-400 w-6' : 'bg-gray-600'}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/resumes">
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-6 flex items-center gap-2 text-lg"
                >
                  <FilePlus className="h-5 w-5" />
                  Create Resume
                </motion.div>
              </Button>
            </Link>
            
            <Link href="/templates">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-6 flex items-center gap-2 text-lg"
                >
                  <Star className="h-5 w-5" />
                  Browse Templates
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>
          
          {/* Animated orbs */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-screen"
              style={{
                background: `radial-gradient(circle, ${
                  ['rgba(56,189,248,0.2)', 'rgba(192,132,252,0.2)', 'rgba(236,72,153,0.2)'][i % 3]
                } 0%, rgba(0,0,0,0) 70%)`,
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
              }}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [1, 1.2, 1, 0.9, 1],
              }}
              transition={{
                duration: Math.random() * 25 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}
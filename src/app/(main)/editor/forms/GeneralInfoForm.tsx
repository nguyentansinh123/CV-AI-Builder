import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { LayoutGrid, BookText, FileEdit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="mx-auto max-w-2xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="mb-10 relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-10 top-10 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm">
              <FileEdit className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Project Details</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Give your resume a name and describe your career objectives or key qualifications
          </p>
        </div>
      </motion.div>

      <Form {...form}>
        <form className="space-y-6">
          <motion.div 
            className={cn(
              "rounded-xl border p-6 transition-all",
              activeField === "title" ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card/30 hover:bg-card/50"
            )}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <LayoutGrid className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold">Resume Title</h3>
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground font-normal">
                    Give your resume a memorable name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g., Senior Developer Resume" 
                      className="text-lg font-medium border-primary/10 focus-visible:ring-primary/20"
                      onFocus={() => setActiveField("title")}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormDescription>
                    This name is only visible to you and helps you organize your resumes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div 
            className={cn(
              "rounded-xl border p-6 transition-all",
              activeField === "description" ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card/30 hover:bg-card/50"
            )}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BookText className="h-4 w-4 text-blue-500" />
              </div>
              <h3 className="font-semibold">Career Summary</h3>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground font-normal">
                    Describe your professional background and objectives
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="e.g., Experienced software developer with 7+ years specializing in frontend technologies..."
                      className="resize-none border-primary/10 focus-visible:ring-primary/20"
                      onFocus={() => setActiveField("description")}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center gap-1.5 mt-3">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>This brief summary will help shape your resume's professional tone</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div 
            className="text-center text-sm text-muted-foreground mt-4 italic" 
            variants={itemVariants}
          >
            All changes are automatically saved as you type
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default GeneralInfoForm;
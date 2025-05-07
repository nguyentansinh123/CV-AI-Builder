import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { Sparkles, WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "@/actions/AiAction";
import { ButtonLoading } from "../buttonloading/buttonLoading";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../global/tooltip/myToolTips";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      
      toast({
        title: "AI Summary",
        description: "Generating your professional summary...",
      });
      
      const aiResponse = await generateSummary(resumeData);
      
      onSummaryGenerated(aiResponse);
      
      toast({
        title: "Success!",
        description: "Generated Successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "We couldn't generate. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ButtonLoading
            variant="outline"
            type="button"
            onClick={handleClick}
            loading={loading}
            loadingText="Generating"
            className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950 dark:to-indigo-950 dark:hover:from-blue-900 dark:hover:to-indigo-900 transition-all"
          >
            <AnimatePresence mode="wait">
              {!loading && (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <WandSparklesIcon className="size-4" />
                  <span>Generate with AI</span>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="size-2 rounded-full bg-indigo-500" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </ButtonLoading>
        </TooltipTrigger>
        <TooltipContent>
          <p>Generate with AI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
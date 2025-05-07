import GenerateSummaryButton from "@/components/global/generateSummary/GenerateSummaryButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FileText, Sparkles, MessageSquareQuote, FileSearch, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });
  
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [summaryType, setSummaryType] = useState<'conversational' | 'formal' | 'achievements'>('conversational');

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
      
      const words = values.summary?.trim() ? values.summary.trim().split(/\s+/).length : 0;
      setWordCount(words);
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const summaryTypes = [
    {
      id: 'conversational',
      name: 'Conversational',
      description: '=',
      icon: <MessageSquareQuote className="h-4 w-4" />,
    },
    {
      id: 'formal',
      name: 'Professional',
      description: '',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 'achievements',
      name: 'Achievement-focused',
      description: '',
      icon: <FileSearch className="h-4 w-4" />,
    }
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative mb-10">
        <div className="absolute -z-10 -left-40 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -z-10 -right-40 top-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        
        <div className="text-center space-y-4 relative pt-6 mb-8">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Professional Summary</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create a compelling introduction that captures attention and highlights your value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 max-w-lg mx-auto">
          {summaryTypes.map(type => (
            <Button
              key={type.id}
              type="button"
              variant={summaryType === type.id ? "default" : "outline"}
              className={cn(
                "h-auto flex-col px-3 py-2 space-y-1 hover:bg-primary/5 transition-all",
                summaryType === type.id ? 
                  "bg-primary/10 border-primary/30 text-primary hover:bg-primary/15" : 
                  "hover:border-primary/20"
              )}
              onClick={() => setSummaryType(type.id as any)}
            >
              <div className="flex items-center justify-center gap-1.5">
                {type.icon}
                <span className="font-medium">{type.name}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {type.description}
              </p>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FormLabel className="text-base font-medium mb-0">Your professional summary</FormLabel>
                    <div className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full transition-colors",
                      wordCount === 0 ? "bg-muted text-muted-foreground" :
                      wordCount < 30 ? "bg-amber-100 text-amber-700" :
                      wordCount > 100 ? "bg-red-100 text-red-700" :
                      "bg-green-100 text-green-700"
                    )}>
                      {wordCount} words
                    </div>
                  </div>
                  
                  <FormControl>
                    <div className={cn(
                      "relative rounded-lg transition-all duration-200",
                      isFocused ? "ring-2 ring-primary/20" : ""
                    )}>
                      <Textarea
                        {...field}
                        rows={6}
                        placeholder={
                          summaryType === 'conversational' ? 
                            "I'm a passionate software developer with 5+ years of experience creating responsive web applications..." :
                          summaryType === 'formal' ?
                            "Results-oriented software engineer with comprehensive experience developing enterprise-level applications..." :
                            "Increased deployment efficiency by 35% through implementation of CI/CD pipelines and automated testing..."
                        }
                        className={cn(
                          "resize-none min-h-[200px] text-base border-muted-foreground/20 transition-all",
                          isFocused ? "border-primary" : ""
                        )}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      
                      {!field.value && (
                        <div className="absolute bottom-3 right-3 text-sm text-muted-foreground opacity-70 italic pointer-events-none">
                          Start typing or use AI generation...
                        </div>
                      )}
                    </div>
                  </FormControl>
                  
                  <div className="flex items-center justify-between mt-2">
                    <FormDescription className="text-xs flex-grow">
                      {wordCount === 0 ? (
                        <span>Write a brief overview of your professional background</span>
                      ) : wordCount < 30 ? (
                        <span>Consider adding more details about your expertise</span>
                      ) : wordCount > 100 ? (
                        <span>Consider making your summary more concise</span>
                      ) : (
                        <span>Good summary length - aim for 50-100 words</span>
                      )}
                    </FormDescription>
                    
                    <div className="flex-shrink-0 mt-2">
                      <GenerateSummaryButton 
                        resumeData={resumeData} 
                        onSummaryGenerated={summary => {
                          form.setValue("summary", summary);
                          form.trigger("summary");
                        }}
                      />
                    </div>
                  </div>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Example summaries</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              type="button"
            >
              More examples
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          
          <div className="border rounded-lg bg-muted/30 divide-y">
            <div className="p-3 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-primary/10 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
                <h4 className="text-sm font-medium">Marketing Professional</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                "Creative marketing professional with 7+ years of experience developing integrated campaigns that drive engagement and conversion. Proven track record of increasing social media engagement by 45% and developing content strategies that align with brand objectives."
              </p>
            </div>
            
            <div className="p-3 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-blue-500/10 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-blue-500" />
                </div>
                <h4 className="text-sm font-medium">Software Developer</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                "Full-stack developer specializing in React, Node.js, and cloud architecture with 5+ years building scalable applications. Passionate about clean code, performance optimization, and creating intuitive user experiences that solve real business problems."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { X, Sparkles, Code, Brush, BarChart, Target, Wrench, Database, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
{
  name: "Technical",
  icon: <Code className="h-4 w-4" />,
  color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  skills: ["React.js", "TypeScript", "Node.js", "AWS", "Python", "SQL", "Java", "Docker"]
},
{
  name: "Design",
  icon: <Brush className="h-4 w-4" />,
  color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  skills: ["UI/UX", "Figma", "Photoshop", "Illustration", "Typography", "Color Theory"]
},
{
  name: "Analysis",
  icon: <BarChart className="h-4 w-4" />,
  color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  skills: ["Data Analysis", "A/B Testing", "Excel", "Tableau", "Power BI", "Statistics"]
},
{
  name: "Soft Skills",
  icon: <Target className="h-4 w-4" />,
  color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  skills: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management"]
},
];

export default function SkillsForm({
resumeData,
setResumeData,
}: EditorFormProps) {
const form = useForm<SkillsValues>({
  resolver: zodResolver(skillsSchema),
  defaultValues: {
    skills: resumeData.skills || [],
  },
});

const [newSkill, setNewSkill] = useState("");
const [activeCategory, setActiveCategory] = useState<string | null>(null);
const [skillAnimation, setSkillAnimation] = useState<string | null>(null);
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  const { unsubscribe } = form.watch(async (values) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setResumeData({
      ...resumeData,
      skills:
        values.skills
          ?.filter((skill) => skill !== undefined)
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "") || [],
    });
  });
  return unsubscribe;
}, [form, resumeData, setResumeData]);

const addSkill = () => {
  if (!newSkill.trim()) return;
  
  const skills = form.getValues().skills || [];
  const trimmedSkill = newSkill.trim();
  
  // Don't add duplicate skills
  if (!skills.includes(trimmedSkill)) {
    form.setValue("skills", [...skills, trimmedSkill]);
    setSkillAnimation(trimmedSkill);
    setTimeout(() => setSkillAnimation(null), 500);
  }
  
  setNewSkill("");
  inputRef.current?.focus();
};

const removeSkill = (skillToRemove: string) => {
  const skills = form.getValues().skills || [];
  form.setValue(
    "skills",
    skills.filter((skill) => skill !== skillToRemove)
  );
};

const addCategorySkill = (skill: string) => {
  const skills = form.getValues().skills || [];
  if (!skills.includes(skill)) {
    form.setValue("skills", [...skills, skill]);
    setSkillAnimation(skill);
    setTimeout(() => setSkillAnimation(null), 500);
  }
};

return (
  <div className="mx-auto max-w-3xl">
    {/* Header with decorative elements */}
    <div className="relative mb-8">
      <div className="absolute -z-10 -left-40 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -z-10 -right-40 top-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>
      
      <div className="text-center space-y-3 relative pt-4">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm mb-2">
          <Wrench className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Professional Skills</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Highlight your expertise and showcase what makes you stand out to employers
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-5">
        {/* Active skills tags */}
        <div className="bg-card/40 border rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Database className="h-5 w-5 text-primary mr-2" />
            Your Skills
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({form.watch("skills")?.length || 0})
            </span>
          </h3>
          
          <div className="min-h-[120px] p-4 bg-muted/40 rounded-lg border mb-4">
            {form.watch("skills")?.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <p className="text-muted-foreground text-sm">
                  No skills added yet. Add skills using the input below or select from suggested skills.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {form.watch("skills")?.map((skill, index) => (
                  <Badge 
                    key={`${skill}-${index}`}
                    className={cn(
                      "bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1 cursor-default transition-all",
                      skillAnimation === skill && "animate-bounce-small"
                    )}
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => removeSkill(skill)}
                      className="ml-1.5 rounded-full hover:bg-primary/20 p-0.5"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel>Add skills</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                            if (e.key === "," && newSkill.trim()) {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                          ref={inputRef}
                          placeholder="Type a skill and press Enter..."
                          className="flex-1"
                        />
                      </FormControl>
                      <Button 
                        type="button" 
                        onClick={addSkill}
                        disabled={!newSkill.trim()}
                        className="shrink-0"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    <FormDescription>
                      Press Enter or comma to add multiple skills quickly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        
        <div className="bg-card/40 border rounded-xl p-5">
          <div className="flex items-start mb-4">
            <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center mr-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">Tips for showcasing skills</h4>
              <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                <li>• Include both technical and soft skills</li>
                <li>• Be specific about technical skills (e.g., "React.js" instead of just "JavaScript")</li>
                <li>• Match skills to the job requirements you're applying for</li>
                <li>• List your strongest and most relevant skills first</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Quick add skills from categories */}
        <div className="bg-card/40 border rounded-xl p-5">
          <h3 className="text-base font-medium mb-3">Popular skill categories</h3>
          
          <div className="space-y-3">
            {skillCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  className={cn(
                    "w-full justify-start",
                    activeCategory === category.name ? "bg-muted border-primary/20" : ""
                  )}
                  onClick={() => setActiveCategory(
                    activeCategory === category.name ? null : category.name
                  )}
                >
                  <div className={cn(
                    "mr-2 h-5 w-5 rounded-full flex items-center justify-center",
                    category.color.split(" ")[0]
                  )}>
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </Button>
                
                {activeCategory === category.name && (
                  <div className="grid grid-cols-2 gap-1.5 pl-2 animate-in slide-in-from-top-2 duration-300">
                    {category.skills.map((skill) => (
                      <Button
                        key={skill}
                        size="sm"
                        variant="ghost"
                        type="button"
                        className={cn(
                          "h-auto py-1 px-2 justify-start text-sm",
                          category.color,
                          form.watch("skills")?.includes(skill) && "opacity-50"
                        )}
                        disabled={form.watch("skills")?.includes(skill)}
                        onClick={() => addCategorySkill(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-500/5 text-blue-700 p-3 rounded-lg text-center font-medium">
          {form.watch("skills")?.length} / 30 Skills Added
          <div className="w-full bg-blue-100 rounded-full h-1.5 mt-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, ((form.watch("skills")?.length || 0) / 30) * 100)}%` }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

const styles = `
@keyframes bounce-small {
0%, 100% {
  transform: translateY(0);
}
50% {
  transform: translateY(-3px);
}
}

.animate-bounce-small {
animation: bounce-small 0.5s ease;
}
`;
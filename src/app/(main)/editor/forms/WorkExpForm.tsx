import GenerateWorkExperienceButton from "@/components/global/generateSummary/GenerateWEButton";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  GripHorizontal, 
  Briefcase, 
  Building, 
  CalendarRange, 
  AlignLeft, 
  Plus,
  Sparkles,
  Trash2,
  MoveVertical,
  Calendar,
  CalendarDays
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-background p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl"></div>
        
        <div className="relative z-10 space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 shadow-sm">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Work Experience</h2>
            <p className="mt-2 text-muted-foreground">
              Showcase your professional journey. Drag to reorder your experiences.
            </p>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form className="space-y-5">
          {fields.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-primary/20 bg-primary/5 px-4 py-10 text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No work experience yet</h3>
              <p className="mb-4 mt-1 max-w-sm text-sm text-muted-foreground">
                Add details about your professional background to strengthen your resume
              </p>
              <Button
                type="button"
                onClick={() =>
                  append({
                    position: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add work experience
              </Button>
            </div>
          )}
          
          {fields.length > 0 && (
            <>
              <div className="flex items-center justify-between rounded-md bg-muted/40 p-2">
                <div className="flex items-center space-x-2">
                  <MoveVertical className="ml-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {fields.length} {fields.length === 1 ? 'experience' : 'experiences'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Drag to reorder
                </div>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={fields}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <WorkExperienceItem
                        id={field.id}
                        key={field.id}
                        index={index}
                        form={form}
                        remove={remove}
                        totalItems={fields.length}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-dashed"
                  onClick={() =>
                    append({
                      position: "",
                      company: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add another experience
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
      
      {fields.length > 0 && (
        <div className="mt-8 rounded-lg border bg-card/50 p-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-amber-500/10 p-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">Tips for impactful work experiences</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Use action verbs to begin each bullet point</li>
                <li>• Include measurable achievements (numbers, percentages)</li>
                <li>• Focus on your contributions rather than just job duties</li>
                <li>• Keep descriptions brief and relevant to the job you're applying for</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
  totalItems: number;
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
  totalItems
}: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeField, setActiveField] = useState<string | null>(null);

  const position = form.watch(`workExperiences.${index}.position`);
  const company = form.watch(`workExperiences.${index}.company`);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        isDragging ? 
          "relative z-50 cursor-grabbing shadow-xl border-primary/30 bg-primary/5" : 
          "bg-background hover:border-muted-foreground/20",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div 
        className={cn(
          "flex items-center justify-between rounded-t-xl border-b p-4",
          isDragging && "bg-primary/5"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div 
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white",
              position ? "bg-primary/80" : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="overflow-hidden">
            <h3 className="truncate font-medium">
              {position || `Work experience ${index + 1}`}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {company || "Company name"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="sr-only">
              {isExpanded ? "Collapse" : "Expand"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-transform",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
          
          <div 
            className="flex h-8 w-8 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            {...attributes}
            {...listeners}
          >
            <GripHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="space-y-4 p-4">
          <div className="flex justify-center">
            <GenerateWorkExperienceButton
              onWorkExperienceGenerated={(exp) =>
                form.setValue(`workExperiences.${index}`, exp)
              }
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name={`workExperiences.${index}.position`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <FormLabel>Job title</FormLabel>
                  </div>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g. Senior Developer"
                      autoFocus 
                      className={cn(
                        "transition-all",
                        activeField === `position-${index}` && "border-primary ring-1 ring-primary/20"
                      )}
                      onFocus={() => setActiveField(`position-${index}`)}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={`workExperiences.${index}.company`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <FormLabel>Company</FormLabel>
                  </div>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g. Acme Corporation"
                      className={cn(
                        "transition-all",
                        activeField === `company-${index}` && "border-primary ring-1 ring-primary/20"
                      )}
                      onFocus={() => setActiveField(`company-${index}`)}
                      onBlur={() => setActiveField(null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="mb-0">Employment period</FormLabel>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name={`workExperiences.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <FormLabel className="text-xs">Start date</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={field.value?.slice(0, 10)}
                        className={cn(
                          "transition-all",
                          activeField === `startDate-${index}` && "border-primary ring-1 ring-primary/20"
                        )}
                        onFocus={() => setActiveField(`startDate-${index}`)}
                        onBlur={() => setActiveField(null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`workExperiences.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                        <FormLabel className="text-xs">End date</FormLabel>
                      </div>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={field.value?.slice(0, 10)}
                        className={cn(
                          "transition-all",
                          activeField === `endDate-${index}` && "border-primary ring-1 ring-primary/20"
                        )}
                        onFocus={() => setActiveField(`endDate-${index}`)}
                        onBlur={() => setActiveField(null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormDescription className="text-xs mt-1.5">
              Leave <span className="font-semibold">end date</span> empty if you are
              currently working here.
            </FormDescription>
          </div>
          
          <FormField
            control={form.control}
            name={`workExperiences.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <AlignLeft className="h-4 w-4 text-muted-foreground" />
                  <FormLabel>Description</FormLabel>
                </div>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                    className={cn(
                      "resize-y min-h-[100px] transition-all",
                      activeField === `description-${index}` && "border-primary ring-1 ring-primary/20"
                    )}
                    onFocus={() => setActiveField(`description-${index}`)}
                    onBlur={() => setActiveField(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end pt-1">
            <Button 
              variant="destructive" 
              size="sm"
              type="button" 
              onClick={() => remove(index)}
              className={cn(
                "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700",
                totalItems === 1 && "opacity-50 pointer-events-none"
              )}
              disabled={totalItems === 1}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Remove experience
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
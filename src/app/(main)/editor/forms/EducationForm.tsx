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
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { educationSchema, EducationValues } from "@/lib/validation";
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
  GraduationCap, 
  School, 
  CalendarRange, 
  Plus, 
  Trash2,
  PenTool,
  Calendar,
  CalendarDays,
  BookOpen,
  LightbulbIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "educations",
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
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-background p-6 text-center">
        <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl"></div>
        <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 shadow-sm mb-3">
            <GraduationCap className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Education & Qualifications</h2>
          <p className="text-muted-foreground mx-auto max-w-md">
            Showcase your academic achievements and educational background to impress potential employers.
          </p>
        </div>
      </div>
      
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-blue-500/20 bg-blue-500/5 px-4 py-10 text-center">
              <div className="mb-3 rounded-full bg-blue-500/10 p-3">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">No education entries yet</h3>
              <p className="mb-4 mt-1 max-w-sm text-sm text-muted-foreground">
                Add details about your educational background to enhance your resume
              </p>
              <Button
                type="button"
                onClick={() => append({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add education
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-md bg-muted/40 p-2">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="ml-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {fields.length} {fields.length === 1 ? 'education entry' : 'education entries'}
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
                  <div className="space-y-5">
                    {fields.map((field, index) => (
                      <EducationItem
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
                  onClick={() => append({
                    degree: "",
                    school: "",
                    startDate: "",
                    endDate: "",
                  })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add another education
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
      
      {fields.length > 0 && (
        <div className="mt-6 rounded-lg border bg-card/50 p-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-amber-500/10 p-1.5">
              <LightbulbIcon className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-medium">Tips for educational entries</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• List your most recent or relevant education first</li>
                <li>• Include special achievements, honors, or relevant coursework</li>
                <li>• For recent graduates, education should be featured prominently</li>
                <li>• For older entries, focus on degrees rather than dates</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
  totalItems: number;
}

function EducationItem({ id, form, index, remove, totalItems }: EducationItemProps) {
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
  
  const degree = form.watch(`educations.${index}.degree`);
  const school = form.watch(`educations.${index}.school`);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        isDragging ? 
          "relative z-50 cursor-grabbing shadow-xl border-blue-500/30 bg-blue-500/5" : 
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
          isDragging && "bg-blue-500/5"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div 
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              degree ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="overflow-hidden">
            <h3 className="truncate font-medium">
              {degree || `Education ${index + 1}`}
            </h3>
            <p className="truncate text-xs text-muted-foreground">
              {school || "School/University name"}
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
          <FormField
            control={form.control}
            name={`educations.${index}.degree`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-muted-foreground" />
                  <FormLabel>Degree or qualification</FormLabel>
                </div>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    autoFocus 
                    className={cn(
                      "transition-all",
                      activeField === `degree-${index}` && "border-blue-500 ring-1 ring-blue-500/20"
                    )}
                    onFocus={() => setActiveField(`degree-${index}`)}
                    onBlur={() => setActiveField(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`educations.${index}.school`}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <FormLabel>School or university</FormLabel>
                </div>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g. Harvard University"
                    className={cn(
                      "transition-all",
                      activeField === `school-${index}` && "border-blue-500 ring-1 ring-blue-500/20"
                    )}
                    onFocus={() => setActiveField(`school-${index}`)}
                    onBlur={() => setActiveField(null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="rounded-lg bg-muted/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="mb-0">Study period</FormLabel>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name={`educations.${index}.startDate`}
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
                          activeField === `startDate-${index}` && "border-blue-500 ring-1 ring-blue-500/20"
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
                name={`educations.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                      <FormLabel className="text-xs">End date</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={field.value?.slice(0, 10)}
                        className={cn(
                          "transition-all",
                          activeField === `endDate-${index}` && "border-blue-500 ring-1 ring-blue-500/20"
                        )}
                        onFocus={() => setActiveField(`endDate-${index}`)}
                        onBlur={() => setActiveField(null)}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-xs mt-1">
                      Leave empty if currently studying
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
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
              Remove education
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
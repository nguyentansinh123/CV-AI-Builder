import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditorFormProps } from '@/lib/types';
import { personalInfoSchema, PersonalInfoValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, MapPin, Briefcase, Phone, Mail, Image, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PersonalDetailsForm = ({resumeData, setResumeData}: EditorFormProps) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: resumeData.firstName || "",
            lastName: resumeData.lastName || "",
            jobTitle: resumeData.jobTitle || "",
            city: resumeData.city || "",
            country: resumeData.country || "",
            phone: resumeData.phone || "",
            email: resumeData.email || "",
        },
    });

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
          const isValid = await form.trigger();
          if (!isValid) return;

          setResumeData({...resumeData, ...values})
        });
        return unsubscribe;
    }, [form, resumeData, setResumeData]);

    const photoInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="mx-auto max-w-xl">
            {/* Decorative background elements */}
            <div className="relative">
                <div className="absolute -z-10 -left-32 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
                <div className="absolute -z-10 -right-32 top-40 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl"></div>
            </div>

            <div className="space-y-1.5 text-center mb-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm mb-4">
                    <User className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Personal Details</h2>
                <p className="text-muted-foreground max-w-md mx-auto mt-2">
                    Tell employers who you are and how they can contact you.
                </p>
            </div>

            <Form {...form}>
                <form className="space-y-5">
                    {/* Photo upload section */}
                    <div className={cn(
                        "border rounded-xl p-5 transition-all",
                        activeSection === "photo" ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card/30 hover:bg-card/50"
                    )}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                                <Image className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-semibold">Profile Photo</h3>
                        </div>
                        
                        <FormField
                            control={form.control}
                            name="photo"
                            render={({ field: { value, ...fieldValues } }) => (
                                <FormItem>
                                    <FormLabel>Your profile picture</FormLabel>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Upload a professional headshot to make your resume stand out.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-start gap-3">
                                        <FormControl>
                                            <div className="relative w-full">
                                                <Input
                                                    {...fieldValues}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        fieldValues.onChange(file);
                                                    }}
                                                    ref={photoInputRef}
                                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer text-sm"
                                                    onFocus={() => setActiveSection("photo")}
                                                    onBlur={() => setActiveSection(null)}
                                                />
                                            </div>
                                        </FormControl>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            type="button"
                                            onClick={() => {
                                                fieldValues.onChange(null);
                                                if (photoInputRef.current) {
                                                    photoInputRef.current.value = "";
                                                }
                                            }}
                                            className="w-full sm:w-auto"
                                        >
                                            <Trash2 className="mr-1 h-4 w-4" />
                                            Remove
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Name fields */}
                    <div className={cn(
                        "border rounded-xl p-5 transition-all",
                        activeSection === "firstName" || activeSection === "lastName" 
                            ? "bg-primary/5 border-primary/20 shadow-sm" 
                            : "bg-card/30 hover:bg-card/50"
                    )}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <h3 className="font-semibold">Full Name</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="John"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "firstName" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("firstName")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="Doe"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "lastName" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("lastName")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Job title */}
                    <div className={cn(
                        "border rounded-xl p-5 transition-all",
                        activeSection === "jobTitle" ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card/30 hover:bg-card/50"
                    )}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Briefcase className="h-4 w-4 text-blue-500" />
                            </div>
                            <h3 className="font-semibold">Professional Title</h3>
                        </div>
                        
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="Senior Software Developer"
                                            className={cn(
                                                "transition-all",
                                                activeSection === "jobTitle" && "border-primary ring-1 ring-primary/20"
                                            )}
                                            onFocus={() => setActiveSection("jobTitle")}
                                            onBlur={() => setActiveSection(null)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Location */}
                    <div className={cn(
                        "border rounded-xl p-5 transition-all",
                        activeSection === "city" || activeSection === "country" 
                            ? "bg-primary/5 border-primary/20 shadow-sm" 
                            : "bg-card/30 hover:bg-card/50"
                    )}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-amber-500" />
                            </div>
                            <h3 className="font-semibold">Location</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="San Francisco"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "city" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("city")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="United States"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "country" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("country")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Contact details */}
                    <div className={cn(
                        "border rounded-xl p-5 transition-all",
                        activeSection === "phone" || activeSection === "email" 
                            ? "bg-primary/5 border-primary/20 shadow-sm" 
                            : "bg-card/30 hover:bg-card/50"
                    )}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-7 w-7 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Mail className="h-4 w-4 text-green-500" />
                            </div>
                            <h3 className="font-semibold">Contact Information</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Phone</FormLabel>
                                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                        </div>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="tel" 
                                                placeholder="+1 (555) 123-4567"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "phone" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("phone")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Email</FormLabel>
                                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                        </div>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="email" 
                                                placeholder="you@example.com"
                                                className={cn(
                                                    "transition-all",
                                                    activeSection === "email" && "border-primary ring-1 ring-primary/20"
                                                )}
                                                onFocus={() => setActiveSection("email")}
                                                onBlur={() => setActiveSection(null)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground italic mt-3">
                        Your changes are automatically saved
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PersonalDetailsForm;
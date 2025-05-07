import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeItem from "./ResumeItem";
import CreateResumeButton from "@/components/global/createResume/CreateResumeButton";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/rights";
import { Layers, Search, SlidersHorizontal, Clock, Calendar, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  const {userId} = await auth();
  const view = searchParams.view || "grid";

  if(!userId){
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId),
  ]);

  const canCreate = canCreateResume(subscriptionLevel, totalCount);
  
  // Group resumes by month for timeline view
  interface MonthGroup {
    name: string;
    resumes: typeof resumes;
  }

  interface MonthGroups {
    [key: string]: MonthGroup;
  }

  const resumesByMonth = resumes.reduce<MonthGroups>((acc, resume) => {
    const date = new Date(resume.updatedAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = { name: monthName, resumes: [] };
    }
    
    acc[monthKey].resumes.push(resume);
    return acc;
  }, {});

  // Calculate resume stats
  const totalWorkExperiences = resumes.reduce(
    (total, resume) => total + (resume.workExperiences?.length || 0), 0
  );
  
  const totalEducations = resumes.reduce(
    (total, resume) => total + (resume.educations?.length || 0), 0
  );

  return (
    <div className="relative min-h-screen pb-10">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.08),transparent_40%)]"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header area with stats */}
        <div className="py-8 border-b mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Resume Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage and organize your professional story in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CreateResumeButton canCreate={canCreate} />
              
              <div className="hidden md:flex items-center gap-2 bg-muted/40 p-2 px-3 rounded-md">
                <Layers className="h-5 w-5 text-primary" />
                <div>
                  <span className="text-2xl font-semibold">{totalCount}</span>
                  <span className="ml-1.5 text-muted-foreground text-sm">resume{totalCount !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Total Resumes</p>
                    <p className="text-2xl font-bold">{totalCount}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-500/5 border-amber-500/10">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Work Experiences</p>
                    <p className="text-2xl font-bold">{totalWorkExperiences}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <SlidersHorizontal className="h-5 w-5 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyan-500/5 border-cyan-500/10">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Education Entries</p>
                    <p className="text-2xl font-bold">{totalEducations}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-cyan-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500/5 border-green-500/10">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Subscription</p>
                    <p className="text-2xl font-bold capitalize">{subscriptionLevel}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                      {subscriptionLevel === "free" ? "Free" : "Premium"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main content with segmented controls */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex p-1 border rounded-lg bg-muted/20">
              <Link href="?view=grid" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
                  view === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Grid View</span>
              </Link>
              <Link href="?view=timeline" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
                  view === "timeline" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Timeline</span>
              </Link>
              <Link href="?view=list" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
                  view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                <span>List View</span>
              </Link>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search resumes..." 
                  className="w-full pl-9 bg-background border"
                />
              </div>
            </div>
          </div>

          {/* Dynamic content based on view */}
          {resumes.length === 0 ? (
            <Card className="border-dashed border-primary/20">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No resumes yet</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  Create your first resume to get started with your job search.
                </p>
                <CreateResumeButton canCreate={canCreate} />
              </CardContent>
            </Card>
          ) : (
            <>
              {view === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {resumes.map((resume) => (
                    <ResumeItem key={resume.id} resume={resume} />
                  ))}
                </div>
              )}

              {view === "timeline" && (
                <div className="relative border-l border-border pl-6 ml-3 space-y-6">
                  {Object.entries(resumesByMonth).map(([monthKey, data]) => (
                    <div key={monthKey} className="mb-8">
                      <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border border-background bg-primary/20 flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{data.name}</h3>
                      <div className="space-y-3">
                        {data.resumes.map((resume) => (
                          <Card key={resume.id} className="bg-card/30">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-base">
                                    {resume.title || "Untitled Resume"}
                                  </CardTitle>
                                  <CardDescription className="text-xs">
                                    {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                                  </CardDescription>
                                </div>
                                <Badge variant="outline" 
                                  className={`${
                                    resume.skills.length > 0 ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                                  }`}
                                >
                                  {resume.skills.length > 0 ? `${resume.skills.length} Skills` : "No Skills"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground truncate max-w-[70%]">
                                  {resume.jobTitle || "No job title specified"}
                                </p>
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={`/resumes/${resume.id}`}>
                                    Edit
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {view === "list" && (
                <div className="space-y-2">
                  <div className="hidden md:grid grid-cols-12 gap-4 py-2 px-3 text-xs uppercase tracking-wider text-muted-foreground font-medium border-b">
                    <div className="col-span-4">Resume</div>
                    <div className="col-span-2">Job Title</div>
                    <div className="col-span-2">Skills</div>
                    <div className="col-span-2">Modified</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  
                  {resumes.map((resume) => (
                    <Card key={resume.id} className="overflow-hidden bg-card/40 hover:bg-card/70 transition-colors">
                      <div className="md:grid md:grid-cols-12 md:gap-4 px-4 py-3 items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md flex items-center justify-center bg-primary/10 text-primary">
                            <span className="uppercase font-bold text-sm">
                              {resume.firstName?.[0] || 'R'}{resume.lastName?.[0] || ''}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{resume.title || "Untitled Resume"}</h3>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {resume.jobTitle || "No position specified"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="col-span-2 hidden md:block text-muted-foreground">
                          <span className="truncate">{resume.jobTitle || "—"}</span>
                        </div>
                        
                        <div className="col-span-2 hidden md:block">
                          {resume.skills.length > 0 ? (
                            <Badge variant="outline" className="bg-primary/5">
                              {resume.skills.length} Skills
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">No skills</span>
                          )}
                        </div>
                        
                        <div className="col-span-2 hidden md:block text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                        </div>
                        
                        <div className="col-span-2 flex justify-end md:justify-start gap-2 mt-2 md:mt-0">
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/resumes/${resume.id}`}>Edit</a>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <a href={`/resumes/${resume.id}/preview`}>Preview</a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
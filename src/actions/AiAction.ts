"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/rights";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export const generateSummary = async (input: GenerateSummaryInput) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `YYou are an AI assistant specialized in writing professional CV summaries. 
    Your task is to generate a compelling, concise, and personalized summary based on the user's input data, which includes job title, work experiences, education, and skills. 
    The summary should highlight the user's strengths, career goals, and suitability for roles related to their background. 
    Use a confident and enthusiastic tone, suitable for modern professional resumes. 
    Do not include bullet points or redundant phrases—keep it natural, focused, and tailored. 
    Only return the summary and do not include any other information in the response and keep it short and concise `;

  const userMessage = `
    Please generate a good, short resume summary from these data:
    Job title: ${jobTitle || "Not available"}
    Work Experiences: ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "Not available"} 
        Company: ${exp.company || "Not available"}
        Start Date: ${exp.startDate || "Not available"}
        End Date: ${exp.endDate || "Present"}
        Description: ${exp.description || "Not available"}
    `,
      )
      .join("\n\n")}

          Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "Not available"} 
        School: ${edu.school || "Not available"} 
        Start Date: ${edu.startDate || "Not available"}
        End Date: ${edu.endDate || "Not available"}
        `,
      )
      .join("\n\n")}

    Skills:${skills}
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
};

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
    You are an expert CV enhancement AI designed to craft professional work experience entries. Your goal is to transform simple job descriptions into polished, achievement-focused resume content.
    
    Please format your response using the following structure exactly, with no additional fields:
    
    Job title: <concise professional title>
    Company: <organization name>
    Start date: <YYYY-MM-DD format if available>
    End date: <YYYY-MM-DD format or "Present" if applicable>
    Description: <3-5 bullet points highlighting accomplishments, using action verbs and quantifiable results where possible>
    
    Each bullet point should follow the PAR method (Problem-Action-Result) when possible, and begin with a strong action verb. Focus on achievements rather than responsibilities.
    `;

  const userMessage = `
    I need a professionally formatted work experience entry for my resume based on this information:
    ${description}
    Please optimize it to showcase my skills and achievements in the best possible light.
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}

import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalDetailsForm";
import WorkExpForm from "./forms/WorkExpForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillForm";
import SummaryForm from "./forms/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  { title: "Work experience", component: WorkExpForm, key: "work-experience" },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skill" },
  { title: "Summary", component: SummaryForm, key: "summary" },
];

import { HeroSection } from "@/components/sections/hero"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { CareerSection } from "@/components/sections/career"
import { getProfile, getCareers } from "@/app/admin/profile/actions"
import { getSkills } from "@/app/admin/skills/actions"
import { getProjects } from "@/app/admin/projects/actions"

export default async function Page() {
  const [profile, careers, skills, projects] = await Promise.all([
    getProfile(),
    getCareers(),
    getSkills(),
    getProjects(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <CareerSection careers={careers} />
    </div>
  )
}

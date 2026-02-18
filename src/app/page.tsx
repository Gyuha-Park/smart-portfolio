import { HeroSection } from "@/components/sections/hero"
import { SkillsSection } from "@/components/sections/skills"
import { ProjectsSection } from "@/components/sections/projects"
import { CareerSection } from "@/components/sections/career"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <CareerSection />
    </div>
  )
}

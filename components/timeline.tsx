import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

interface TimelineProps {
  experiences: Experience[]
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="space-y-8">
      {experiences.map((experience, index) => (
        <div
          key={index}
          className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-border"
        >
          <div className="absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border bg-background">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                  {experience.period}
                </Badge>
              </div>
              <p className="text-muted-foreground font-medium mb-4">{experience.company}</p>
              <p className="mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

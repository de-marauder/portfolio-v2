import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="text-sm py-1 px-3">
      {name}
    </Badge>
  )
}

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { Badge } from "../components/ui/badge";

interface ExperienceNodeProps {
  /** Main label for the node (e.g. company/program name) */
  label: string;
  /** Secondary text below the label (e.g. role/degree) */
  subtitle: string;
  /** Duration string (e.g. "2015–2019") */
  duration: string;
  /** Highlight bullet points (HTML allowed) */
  highlights: string[];
  /** Badges or tags shown below title */
  badges?: string[];
  /** Accent color for neon glow (Tailwind name, e.g. "purple") */
  color: string;
}

export default function ExperienceNode({
  label,
  subtitle,
  duration,
  highlights,
  badges = [],
  color,
}: ExperienceNodeProps) {
  // compute neon styles
  const borderColor = `border-${color}-400`;
  const glowColor   = `shadow-[0_0_12px_rgba(var(--tw-${color}-400),0.7)]`;

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div
          className={`cursor-pointer ${borderColor} ${glowColor} border-2 rounded-lg px-4 py-2 bg-black/80 text-white font-semibold text-base transition-transform hover:scale-105`}
        >
          {label}
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="center"
        className="w-[85vw] max-w-md rounded-xl bg-white text-gray-900 border border-gray-200 shadow-lg p-6 space-y-4"
      >
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{duration}</p>
          <h3 className="text-lg font-bold leading-tight">{label}</h3>
          <p className="text-sm text-gray-700">{subtitle}</p>
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs py-1 px-2 uppercase"
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-800">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <span className="text-base leading-tight">•</span>
              <p className="leading-snug" dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
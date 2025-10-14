import { cn } from "@/lib/utils"

type CornerFrameProps = {
  className?: string
  color?: "foreground" | "primary" | "accent"
  size?: number
  thickness?: number
  /** Per-corner color override */
  corners?: Partial<Record<'tl' | 'tr' | 'bl' | 'br', 'foreground' | 'primary' | 'accent'>>
  /** Negative or positive inset in px to push corners outside/inside */
  offset?: number
}

export function CornerFrame({ className, color = "foreground", size = 12, thickness = 2, corners, offset = 0 }: CornerFrameProps) {
  const style = {
    ['--corner-size' as any]: `${size}px`,
    ['--corner-thickness' as any]: `${thickness}px`,
    ...(offset !== 0 ? ({ inset: `${-offset}px` } as any) : {}),
  }
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0",
        color === "primary" && "corner-color-primary",
        color === "accent" && "corner-color-accent",
        color === "foreground" && "corner-color-foreground",
        className,
      )}
      style={style}
    >
      <span className={cn("corner tl", corners?.tl === 'primary' && 'corner-color-primary', corners?.tl === 'accent' && 'corner-color-accent', corners?.tl === 'foreground' && 'corner-color-foreground')} />
      <span className={cn("corner tr", corners?.tr === 'primary' && 'corner-color-primary', corners?.tr === 'accent' && 'corner-color-accent', corners?.tr === 'foreground' && 'corner-color-foreground')} />
      <span className={cn("corner bl", corners?.bl === 'primary' && 'corner-color-primary', corners?.bl === 'accent' && 'corner-color-accent', corners?.bl === 'foreground' && 'corner-color-foreground')} />
      <span className={cn("corner br", corners?.br === 'primary' && 'corner-color-primary', corners?.br === 'accent' && 'corner-color-accent', corners?.br === 'foreground' && 'corner-color-foreground')} />
    </span>
  )
}

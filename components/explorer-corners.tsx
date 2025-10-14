import { cn } from "@/lib/utils"

type ExplorerCornersProps = {
  className?: string
  offset?: number
  size?: number
  thickness?: number
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  topColor?: string
  bottomColor?: string
  /** If your parent uses group/cta, keep scoped=true to use group-hover/cta */
  scoped?: boolean
  /** Animation style */
  animation?: 'fade' | 'scale' | 'slide' | 'glow'
  /** Show corners always, not just on hover */
  alwaysVisible?: boolean
  /** Custom delay for staggered animations */
  delay?: number
}

export function ExplorerCorners({
  className,
  offset = 12,
  size = 56,
  thickness = 2,
  radius = 'xl',
  topColor = 'rgba(59,130,246,0.35)',
  bottomColor = 'rgba(168,85,247,0.35)',
  scoped = true,
  animation = 'fade',
  alwaysVisible = false,
  delay = 0,
}: ExplorerCornersProps) {
  const base = cn(
    'pointer-events-none absolute transition-all',
    animation === 'fade' && 'duration-300',
    animation === 'scale' && 'duration-500 scale-0',
    animation === 'slide' && 'duration-500',
    animation === 'glow' && 'duration-700',
    !alwaysVisible && 'opacity-0',
    alwaysVisible && 'opacity-100',
    !alwaysVisible && scoped && 'group-hover/cta:opacity-100 group-focus-within/cta:opacity-100',
    !alwaysVisible && !scoped && 'group-hover:opacity-100 group-focus-within:opacity-100',
    animation === 'scale' && !alwaysVisible && scoped && 'group-hover/cta:scale-100 group-focus-within/cta:scale-100',
    animation === 'scale' && !alwaysVisible && !scoped && 'group-hover:scale-100 group-focus-within:scale-100',
  )

  const radiusMap = {
    'sm': 'rounded-[0.25rem]',
    'md': 'rounded-[0.375rem]',
    'lg': 'rounded-[0.5rem]',
    'xl': 'rounded-[0.75rem]',
    '2xl': 'rounded-[1rem]',
  }
  const radiusClass = radiusMap[radius]

  const commonStyle: React.CSSProperties = {
    width: size,
    height: size,
    transitionDelay: `${delay}ms`,
  }

  // Add glow effect styles
  const glowStyle = animation === 'glow' ? {
    filter: 'drop-shadow(0 0 6px currentColor)',
  } : {}

  // Slide animation offsets
  const slideOffsets = animation === 'slide' ? {
    tl: { transform: 'translate(-8px, -8px)' },
    tr: { transform: 'translate(8px, -8px)' },
    bl: { transform: 'translate(-8px, 8px)' },
    br: { transform: 'translate(8px, 8px)' },
  } : {}

  return (
    <>
      {/* Top Left Corner */}
      <div
        className={cn(base, radiusClass, className, animation === 'slide' && '-translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0')}
        style={{
          ...commonStyle,
          ...glowStyle,
          top: -offset,
          left: -offset,
          borderTopWidth: thickness,
          borderLeftWidth: thickness,
          borderColor: topColor,
        }}
      />
      {/* Top Right Corner */}
      <div
        className={cn(base, radiusClass, className, animation === 'slide' && 'translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0')}
        style={{
          ...commonStyle,
          ...glowStyle,
          top: -offset,
          right: -offset,
          borderTopWidth: thickness,
          borderRightWidth: thickness,
          borderColor: topColor,
          transitionDelay: `${delay + 50}ms`,
        }}
      />
      {/* Bottom Left Corner */}
      <div
        className={cn(base, radiusClass, className, animation === 'slide' && '-translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0')}
        style={{
          ...commonStyle,
          ...glowStyle,
          bottom: -offset,
          left: -offset,
          borderBottomWidth: thickness,
          borderLeftWidth: thickness,
          borderColor: bottomColor,
          transitionDelay: `${delay + 100}ms`,
        }}
      />
      {/* Bottom Right Corner */}
      <div
        className={cn(base, radiusClass, className, animation === 'slide' && 'translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0')}
        style={{
          ...commonStyle,
          ...glowStyle,
          bottom: -offset,
          right: -offset,
          borderBottomWidth: thickness,
          borderRightWidth: thickness,
          borderColor: bottomColor,
          transitionDelay: `${delay + 150}ms`,
        }}
      />
    </>
  )
}


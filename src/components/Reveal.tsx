import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Scroll-driven fade-up. One ScrollTrigger per instance (created top-to-bottom as the
// page renders); cleaned up automatically by useGSAP. Honors prefers-reduced-motion.
export function Reveal({
  children,
  y = 26,
  delay = 0,
  className,
}: {
  children: ReactNode
  y?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from(ref.current, {
      opacity: 0,
      y,
      duration: 0.7,
      delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

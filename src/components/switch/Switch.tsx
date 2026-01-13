import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { switchVariants, thumbConfig } from './SwitchVariants'
import type { SwitchProps } from './SwitchVariants'
const MotionThumb = motion(SwitchPrimitive.Thumb)


const SunIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#fffff"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="4" fill="#ffffff" />
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

// Moon icon component
const MoonIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Star icon component
const StarIcon: React.FC<{ size?: number }> = ({ size = 8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant = 'default', size = 'md', fullWidth, checked, ...props }, ref) => {
  const [checkedState, setCheckedState] = React.useState(checked ?? false)
  const [shouldAnimate, setShouldAnimate] = React.useState(false)

  const currentSize = size
  const currentVariant = variant
  const config = thumbConfig[currentSize ?? 'md']
  const iconSize = currentSize === 'sm' ? 10 : currentSize === 'md' ? 12 : 14
  const starSize = currentSize === 'sm' ? 6 : currentSize === 'md' ? 8 : 10

  React.useEffect(() => {
    if (checked !== undefined) {
      setCheckedState(checked)
    }
  }, [checked])

  const handleCheckedChange = (newChecked: boolean) => {
    if (newChecked === true && checkedState === false) {
      setShouldAnimate(true)
      setTimeout(() => setShouldAnimate(false), 300)
    }

    setCheckedState(newChecked)
    props.onCheckedChange?.(newChecked)
  }

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        switchVariants({
          variant: currentVariant,
          size: currentSize,
          fullWidth,
        }),
        className,
      )}
      checked={checkedState}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      {/* Show icons only for theme variant */}
      {currentVariant === 'theme' && (
        <AnimatePresence mode="wait">
          {!checkedState ? (
            // Sun for OFF state (day mode)
            <motion.div
              key="sun"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-amber-500 z-0"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <SunIcon size={iconSize} />
            </motion.div>
          ) : (
            // Moon and stars for ON state (night mode)
            <>
              <motion.div
                key="moon"
                className="absolute left-1 top-1/2 -translate-y-1/2 text-white/80 z-0"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 90 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              >
                <MoonIcon size={iconSize} />
              </motion.div>

              <motion.div
                key="star1"
                className="absolute right-3 top-1 text-white/60 z-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
              >
                <StarIcon size={starSize} />
              </motion.div>

              <motion.div
                key="star2"
                className="absolute right-2 bottom-1 text-white/40 z-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.2,
                  ease: 'easeOut',
                }}
              >
                <StarIcon size={starSize - 2} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      <MotionThumb
        data-slot="switch-thumb"
        className={cn(
          config.size,
          'block rounded-full bg-(--atom-bg) shadow-lg relative z-10',
        )}
        animate={{
          x: checkedState ? config.translateX : 0,
          scaleX: shouldAnimate ? [1, 1.3, 1] : 1,
          scaleY: shouldAnimate ? [1, 0.9, 1] : 1,
        }}
        transition={{
          x: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
          },
          scaleX: {
            duration: 0.3,
            ease: 'easeInOut',
          },
          scaleY: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        }}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = 'Switch'

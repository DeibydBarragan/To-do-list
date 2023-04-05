/**
 * @fileoverview Task component animations variants
 */
export const taskVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.5 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 }
  },
  tap: {
    scale: 1
  }
}

export const btnVariants = {
  hidden: {
    y: 50,
    scale: 0
  },
  show: {
    y: 0,
    scale: 1,
    transition: { duration: 0.1, ease: 'linear' }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 }
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: 50,
    transition: { duration: 0.1, ease: 'linear' }
  }
}

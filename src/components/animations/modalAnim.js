export const modalVariants = {
  key: 'box',
  hidden: {
    y: 30
  },
  visible: {
    y: 0,
    transition: { type: 'spring', duration: 0.1, stiffness: 300, damping: 18 }
  },
  exit: {
    y: 30
  }
}

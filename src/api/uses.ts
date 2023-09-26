const useSlotsText = () => {
  const slots = useSlots()
  const text = ref('')

  if (slots && typeof slots.default === 'function') {
    text.value = slots.default()[0].children?.toString() || ''
  }

  return { text }
}

export { useSlotsText }

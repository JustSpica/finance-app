function mask(event: React.ChangeEvent<HTMLInputElement>) {
  let cleanValue = event.target.value.replace(/\D/g, '')

  if (cleanValue.length === 13) {
    cleanValue = cleanValue.slice(0, -1)
  }

  if (!/^\d+$/.test(cleanValue)) {
    return cleanValue.slice(0, -1)
  }

  const parsedValue = (parseInt(cleanValue) / 100).toFixed(2)

  return parsedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function unmask(value: string) {
  return parseInt(value.replace('.', '').replace(',', '')) || null
}

export const currency = { mask, unmask }

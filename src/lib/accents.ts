export type AccentKey = 'eeg' | 'gsr' | 'emg' | 'model' | 'img'

export const accentHex: Record<AccentKey, string> = {
  eeg: '#5eead4',
  gsr: '#f0b429',
  emg: '#fb7185',
  model: '#a78bfa',
  img: '#60a5fa',
}

export const accentText: Record<AccentKey, string> = {
  eeg: 'text-signal-eeg',
  gsr: 'text-signal-gsr',
  emg: 'text-signal-emg',
  model: 'text-signal-model',
  img: 'text-signal-img',
}

export const accentBorder: Record<AccentKey, string> = {
  eeg: 'border-signal-eeg/45',
  gsr: 'border-signal-gsr/45',
  emg: 'border-signal-emg/45',
  model: 'border-signal-model/45',
  img: 'border-signal-img/45',
}

export const accentBg: Record<AccentKey, string> = {
  eeg: 'bg-signal-eeg',
  gsr: 'bg-signal-gsr',
  emg: 'bg-signal-emg',
  model: 'bg-signal-model',
  img: 'bg-signal-img',
}

export const rgba = (key: AccentKey, alpha: number) => {
  const hex = accentHex[key].replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

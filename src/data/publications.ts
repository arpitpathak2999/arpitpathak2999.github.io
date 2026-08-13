/**
 * Publications exactly as listed in the resume.
 * `url` values were extracted from the resume PDF's own hyperlinks.
 * No DOIs, venues, authors or links are invented. Where the resume has no
 * link, `url` is undefined and the UI shows no link.
 */

export type PubKind = 'conference' | 'chapter' | 'submitted'

export interface Publication {
  id: string
  title: string
  authors: string[]
  /** Index of "A. Pathak" in `authors`, for highlighting */
  venue: string
  venueShort: string
  year: string
  kind: PubKind
  status?: string
  area: string
  topics: string[]
  accent: 'eeg' | 'gsr' | 'emg' | 'model' | 'img'
  url?: string
  urlLabel?: string
  note?: string
}

export const publications: Publication[] = [
  {
    id: 'icngn-riemannian-gcn',
    title:
      'Scale-Specific Riemannian Features with Graph Convolutional Network for Motor Imagery EEG Classification',
    authors: ['Balendra', 'A. Pathak', 'N. Sharma', 'S. Sharma'],
    venue: '4th International Conference on Intelligent Computing and Next Generation Networks (ICNGN), Singapore',
    venueShort: 'ICNGN 2025 · Singapore',
    year: '2025',
    kind: 'conference',
    area: 'Computational Neuroscience · EEG',
    topics: ['Motor Imagery EEG', 'Riemannian geometry', 'Graph Convolutional Network', 'Multiscale features'],
    accent: 'eeg',
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qpJL0UwAAAAJ&citation_for_view=qpJL0UwAAAAJ:qxL8FJ1GzNcC',
    urlLabel: 'Google Scholar',
  },
  {
    id: 'bigdia-hadamard-riemannian',
    title: 'Fusion of Hadamard and Riemannian Space Features for Motor Imagery EEG Classification',
    authors: ['Balendra', 'A. Pathak', 'N. Sharma', 'S. Sharma'],
    venue:
      '11th International Conference on Big Data and Information Analytics (BigDIA), Nha Trang, Vietnam',
    venueShort: 'BigDIA 2025 · Vietnam',
    year: '2025',
    kind: 'conference',
    area: 'Computational Neuroscience · EEG',
    topics: ['Motor Imagery EEG', 'Hadamard space', 'Riemannian features', 'Feature fusion'],
    accent: 'eeg',
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qpJL0UwAAAAJ&citation_for_view=qpJL0UwAAAAJ:M3ejUd6NZC8C',
    urlLabel: 'Google Scholar',
  },
  {
    id: 'eaic-dehazing',
    title: 'Efficient Image Dehazing Using an Encoder–Decoder Network with Residual Learning',
    authors: ['A. Pathak', 'O. P. Singh', 'S. Purkayastha', 'U. Biswas'],
    venue: 'International Conference on Electronics, AI and Computing (EAIC)',
    venueShort: 'EAIC 2025',
    year: '2025',
    kind: 'conference',
    area: 'Deep Learning · Image Restoration',
    topics: ['Encoder–decoder network', 'Residual learning', 'Image restoration'],
    accent: 'img',
    url: 'https://ieeexplore.ieee.org/abstract/document/11101309',
    urlLabel: 'IEEE Xplore',
  },
  {
    id: 'cicn-glaucoma',
    title:
      'Attention-Based Dual-Branch Hybrid Network with Grad-CAM Interpretability for Glaucoma Detection',
    authors: ['A. Pathak', 'O. P. Singh', 'S. Purkayastha', 'U. Biswas'],
    venue:
      'IEEE 17th International Conference on Computational Intelligence and Communication Networks (CICN)',
    venueShort: 'IEEE CICN 2025',
    year: '2025',
    kind: 'conference',
    area: 'Biomedical Imaging · Interpretable AI',
    topics: ['Attention mechanisms', 'Dual-branch network', 'Grad-CAM', 'Glaucoma detection'],
    accent: 'model',
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qpJL0UwAAAAJ&citation_for_view=qpJL0UwAAAAJ:ULOm3_A8WrAC',
    urlLabel: 'Google Scholar',
  },
  {
    id: 'cicn-quantum-brain-tumor',
    title:
      'Quantum-Enhanced Brain Tumor Classification Using Deep Feature Extraction and ANN-Based Compression',
    authors: ['O. P. Singh', 'A. Pathak', 'S. Purkayastha', 'U. Biswas'],
    venue:
      'IEEE 17th International Conference on Computational Intelligence and Communication Networks (CICN)',
    venueShort: 'IEEE CICN 2025',
    year: '2025',
    kind: 'conference',
    area: 'Quantum ML · Biomedical Imaging',
    topics: ['Quantum-enhanced ML', 'Deep feature extraction', 'ANN-based compression', 'Brain tumor classification'],
    accent: 'model',
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qpJL0UwAAAAJ&citation_for_view=qpJL0UwAAAAJ:Zph67rFs4hoC',
    urlLabel: 'Google Scholar',
  },
  {
    id: 'guwahati-dfu-dwt',
    title: 'A Frequency-Aware Multi-Stream CNN Based on DWT for Diabetic Foot Ulcer Detection',
    authors: ['O. P. Singh', 'A. Pathak', 'S. Purkayastha'],
    venue: 'International Conference of the IEEE Guwahati Sub-Section',
    venueShort: 'IEEE Guwahati Sub-Section 2026',
    year: '2026',
    kind: 'conference',
    area: 'Biomedical Imaging · Multi-scale Learning',
    topics: ['Discrete Wavelet Transform', 'Multi-stream CNN', 'Frequency-aware learning', 'Diabetic foot ulcer'],
    accent: 'img',
  },
  {
    id: 'chapter-cognitive-state',
    title:
      'Nonlinear Hybrid Feature-Fusion Based on Deep Metric-Learning for Analysis of Cognitive State and Behavior Prediction',
    authors: ['A. Pathak', 'B. Priya'],
    venue: 'Endophytic Fungi, Nova Science Publishers',
    venueShort: 'Book chapter · Nova Science Publishers',
    year: '2026',
    kind: 'chapter',
    status: 'Accepted for publication',
    area: 'Cognitive State · Representation Learning',
    topics: ['Deep metric learning', 'Nonlinear feature fusion', 'Cognitive state analysis', 'Behavior prediction'],
    accent: 'gsr',
  },
]

/** Work under review — stated exactly as the resume reports it. */
export const underReview = [
  {
    title: 'EMG-based prosthetic hand control — ensemble ML–DL framework with Gray Wolf Optimization',
    venue: 'Biomedical Signal Processing (Elsevier)',
    year: '2025',
    status: 'Submitted',
  },
] as const

export const pubStats = {
  conference: publications.filter((p) => p.kind === 'conference').length,
  chapters: publications.filter((p) => p.kind === 'chapter').length,
  submitted: underReview.length,
}

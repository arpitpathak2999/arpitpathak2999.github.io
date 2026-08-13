/**
 * SINGLE SOURCE OF TRUTH — derived strictly from Arpit Pathak's resume.
 * Do not add degrees, employers, metrics, publications, or links that are
 * not present in the resume. Links below were extracted from the resume PDF.
 */

export const profile = {
  name: 'Arpit Pathak',
  tagline: 'AI × Neuroscience × Biomedical Intelligence',
  positioning:
    'I build intelligent systems that connect machine learning with biological signals — from neural activity and physiological sensing to medical imaging.',
  heroSupport:
    'Exploring how artificial intelligence can decode biological signals, understand neural and physiological states, and transform biomedical data into meaningful intelligence.',
  arc: ['Signals', 'Biology', 'Representation', 'Intelligence'],
  role: 'B.Tech in Computer Science and Engineering',
  institute: 'Indian Institute of Information Technology Bhagalpur',
  instituteShort: 'IIIT Bhagalpur',
  currentRole: 'Research Intern in Computational Neuroscience',
  currentOrg: 'Temple Private Limited',
  email: 'arpitpathak2999@gmail.com',
  researchInterests: [
    'Biomedical Image & Signal Processing',
    'Interpretable AI',
    'Quantum Machine Learning',
  ],
} as const

/** Only URLs that exist in the resume, or that the site owner supplied directly. */
export const links = {
  email: 'mailto:arpitpathak2999@gmail.com',
  // Extracted from resume PDF hyperlinks
  linkedin: 'https://www.linkedin.com/in/arpitpathak2999/',
  scholar: 'https://scholar.google.com/citations?user=qpJL0UwAAAAJ&hl=en',
  // Supplied by the site owner as their GitHub handle
  github: 'https://github.com/arpitpathak2999',
} as const

export const site = {
  /** Set in .env — see VITE_SITE_URL. Never hardcode the URL elsewhere. */
  url: (import.meta.env.VITE_SITE_URL || 'https://arpitpathak2999.github.io').replace(/\/+$/, ''),
  title: 'Arpit Pathak — AI × Neuroscience × Biomedical Intelligence',
  description:
    'Arpit Pathak — Computer Science researcher working across computational neuroscience, EEG and physiological signal processing, biomedical imaging and interpretable AI.',
} as const

export const education = [
  {
    institution: 'Indian Institute of Information Technology Bhagalpur',
    credential: 'Bachelor of Technology in Computer Science and Engineering',
    period: 'July 2023 – May 2027',
    metric: 'CGPA 8.15',
  },
  {
    institution: 'Universal Public School, Baburi, Chandauli',
    credential: 'Class XII — CBSE',
    period: '2021',
    metric: '80.80%',
  },
  {
    institution: 'Glenhill School, Manduadih, Varanasi',
    credential: 'Class X — CBSE',
    period: '2019',
    metric: '91%',
  },
] as const

export const experience = [
  {
    org: 'Temple Private Limited',
    role: 'Research Intern in Computational Neuroscience',
    location: 'Gurgaon, Haryana, India',
    period: 'June 2026 – Present',
    current: true,
    points: [
      'Conduct synchronized EEG and GSR/EDA experiments for automated sleep-stage assessment, with emphasis on sensor placement, recording protocols, signal quality, and multimodal physiological data acquisition.',
      'Develop end-to-end sleep signal processing pipelines including synchronization, artifact removal, filtering, epoch segmentation, normalization, and preparation of multimodal EEG–GSR datasets for sleep staging.',
      'Analyze EEG and GSR/EDA dynamics across Wake, N1, N2, N3, and REM sleep stages, engineering temporal, spectral, autonomic, and signal-variability features for stage-specific characterization.',
      'Develop and evaluate machine learning and deep learning models for automated sleep-stage classification, investigating EEG–GSR fusion, GSR-derived sleep biomarkers, and subject-level generalization.',
    ],
  },
  {
    org: 'Indian Institute of Technology (IIT) BHU',
    role: 'Research Intern in Biomedical Signal Processing',
    supervisor: 'Under Prof. Shiru Sharma',
    location: 'Varanasi, India',
    period: 'May 2025 – July 2025',
    points: [
      'Designed deep learning pipelines integrating Riemannian manifold learning and Graph Convolutional Networks for Motor Imagery EEG classification.',
      'Developed an ANN–BiLSTM hybrid architecture for FMG signal classification using Continuous Wavelet Transform (CWT)-based image representations.',
      'Implemented preprocessing techniques including artifact removal, band-pass filtering, and normalization to enhance classification performance.',
    ],
  },
  {
    org: 'Punjab University, UIET',
    role: 'Research Intern in Biomedical Signal Processing',
    supervisor: 'Under Prof. Mamta Juneja',
    location: 'Chandigarh, India',
    period: 'Dec 2024 – Jan 2025',
    points: [
      'Conducted EMG signal analysis for prosthetic hand control applications.',
      'Applied band-pass filtering and noise suppression for improved signal quality.',
      'Extracted statistical and temporal features (RMS, MAV, waveform length, kurtosis, skewness, AR coefficients).',
      'Optimized feature selection using Gray Wolf Optimization and developed an ensemble ML–DL framework achieving 98.41% classification accuracy.',
      'Research submitted to Biomedical Signal Processing (Elsevier), 2025.',
    ],
  },
  {
    org: 'Ganpat University (GUNI-WSRIP)',
    role: 'Research Intern in Biomedical Image Processing (Hybrid)',
    location: 'Gujarat, India',
    period: 'Jan 2026 – Mar 2026',
    points: [
      'Developed a hybrid AI-based breast cancer detection system using mammogram and ultrasound images.',
      'Built deep learning models for tumor segmentation, ROI extraction, and benign/malignant classification.',
      'Worked on multimodal feature fusion and quantum-enhanced classification for improving diagnostic accuracy.',
    ],
  },
] as const

export const skills = [
  { group: 'Languages', items: ['Python', 'C++'] },
  { group: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'Scikit-learn'] },
  {
    group: 'Research Interests',
    items: ['Biomedical Image & Signal Processing', 'Interpretable AI', 'Quantum Machine Learning'],
  },
] as const

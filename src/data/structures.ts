import type { Accent } from './research'

/* ─────────────── Interactive research pipeline ─────────────── */

export interface PipelineStage {
  id: string
  ordinal: string
  name: string
  accent: Accent
  summary: string
  groups: { label: string; items: string[] }[]
  /** short technical annotation shown in the rail */
  annotation: string
}

export const pipelineStages: PipelineStage[] = [
  {
    id: 'biological-system',
    ordinal: '01',
    name: 'Biological System',
    accent: 'gsr',
    annotation: 'brain · body',
    summary:
      'Everything starts with a living system. The human brain and the physiological systems around it generate activity continuously — the question is what we can measure without disturbing it.',
    groups: [
      { label: 'Systems', items: ['Human brain', 'Autonomic nervous system', 'Neuromuscular system', 'Tissue and anatomy'] },
      { label: 'States of interest', items: ['Sleep', 'Cognitive state', 'Motor intent', 'Pathology'] },
    ],
  },
  {
    id: 'physiological-signal',
    ordinal: '02',
    name: 'Physiological Signal',
    accent: 'eeg',
    annotation: 'acquisition',
    summary:
      'Measurement is a research problem in itself. Sensor placement, recording protocol and signal quality decide the ceiling on everything downstream — no model recovers information that was never acquired.',
    groups: [
      { label: 'Signals', items: ['EEG', 'GSR / EDA', 'EMG', 'FMG', 'Biomedical images'] },
      { label: 'Acquisition concerns', items: ['Sensor placement', 'Recording protocols', 'Signal quality', 'Multimodal synchronization'] },
    ],
  },
  {
    id: 'signal-processing',
    ordinal: '03',
    name: 'Signal Processing',
    accent: 'eeg',
    annotation: 'clean · align',
    summary:
      'Physiological recordings arrive contaminated. Movement, electrodes, power line, other physiology. This stage makes the signal comparable across time, channels, modalities and subjects.',
    groups: [
      { label: 'Operations', items: ['Filtering', 'Artifact removal', 'Segmentation', 'Normalization'] },
      { label: 'Transforms', items: ['Wavelets (CWT / DWT)', 'Spectral analysis', 'Cross-modal synchronization'] },
    ],
  },
  {
    id: 'representation',
    ordinal: '04',
    name: 'Feature / Representation',
    accent: 'model',
    annotation: 'geometry',
    summary:
      'The representation is where most of the research actually happens. A signal described in the right space is nearly classified already — including spaces that are curved rather than flat.',
    groups: [
      { label: 'Classical', items: ['Time-domain features', 'Frequency-domain features', 'Time–frequency representations'] },
      { label: 'Geometric & learned', items: ['Riemannian representations', 'Hadamard space features', 'Graph representations', 'Learned deep features'] },
    ],
  },
  {
    id: 'ai-model',
    ordinal: '05',
    name: 'AI Model',
    accent: 'model',
    annotation: 'learn',
    summary:
      'Architecture follows the structure of the data: convolutions for locality, recurrence for time, graphs for related channels, fusion when modalities carry complementary evidence.',
    groups: [
      { label: 'Architectures', items: ['CNN', 'BiLSTM', 'Graph Convolutional Network', 'ANN', 'Attention / dual-branch'] },
      { label: 'Strategies', items: ['Ensemble learning', 'Multimodal fusion', 'Interpretable AI', 'Quantum-enhanced ML'] },
    ],
  },
  {
    id: 'interpretation',
    ordinal: '06',
    name: 'Biological Interpretation',
    accent: 'gsr',
    annotation: 'meaning',
    summary:
      'A prediction is only useful if it maps back onto biology. This is the stage that decides whether the whole pipeline produced understanding or just a number.',
    groups: [
      { label: 'Read-outs', items: ['Sleep stages (Wake · N1 · N2 · N3 · REM)', 'Cognitive state', 'Motor imagery', 'Physiological state'] },
      { label: 'Clinical context', items: ['Disease-related patterns', 'Grad-CAM saliency', 'Biomarker candidates', 'Subject-level generalization'] },
    ],
  },
]

/* ─────────────── Research map ─────────────── */

export interface MapNode {
  id: string
  label: string
  branch: string | null
  accent: Accent
  detail: string
}

export const mapBranches: { id: string; label: string; accent: Accent; blurb: string; children: { id: string; label: string; detail: string }[] }[] = [
  {
    id: 'neuroscience',
    label: 'Neuroscience',
    accent: 'eeg',
    blurb: 'Reading cortical activity to infer state and intent.',
    children: [
      { id: 'eeg', label: 'EEG', detail: 'Scalp electrophysiology — the core signal across my sleep and motor imagery work.' },
      { id: 'sleep-staging', label: 'Sleep staging', detail: 'Wake / N1 / N2 / N3 / REM assessment from synchronized EEG and GSR/EDA.' },
      { id: 'motor-imagery', label: 'Motor imagery', detail: 'Decoding imagined movement from sensorimotor rhythms.' },
      { id: 'cognitive-state', label: 'Cognitive state', detail: 'Deep metric learning for cognitive state analysis and behavior prediction.' },
    ],
  },
  {
    id: 'physiological',
    label: 'Physiological Signals',
    accent: 'gsr',
    blurb: 'The body outside the skull, carrying its own information.',
    children: [
      { id: 'gsr', label: 'GSR / EDA', detail: 'Electrodermal activity as an autonomic window onto arousal and sleep depth.' },
      { id: 'emg', label: 'EMG', detail: 'Surface electromyography for prosthetic hand control.' },
      { id: 'fmg', label: 'FMG', detail: 'Forcemyography classified from CWT-based image representations.' },
      { id: 'multimodal-sensing', label: 'Multimodal sensing', detail: 'Synchronized acquisition across modalities, treated as a design problem.' },
    ],
  },
  {
    id: 'biomedical-ai',
    label: 'Biomedical AI',
    accent: 'img',
    blurb: 'Images and clinical data, handled with interpretability in mind.',
    children: [
      { id: 'imaging', label: 'Medical imaging', detail: 'Mammogram, ultrasound, retinal and MRI-based work.' },
      { id: 'segmentation', label: 'Segmentation', detail: 'Tumor segmentation and ROI extraction ahead of classification.' },
      { id: 'classification', label: 'Classification', detail: 'Benign/malignant and pathology detection tasks.' },
      { id: 'fusion', label: 'Multimodal fusion', detail: 'Combining complementary imaging evidence rather than trusting one stream.' },
    ],
  },
  {
    id: 'machine-intelligence',
    label: 'Machine Intelligence',
    accent: 'model',
    blurb: 'The methods layer — and where the geometry lives.',
    children: [
      { id: 'deep-learning', label: 'Deep learning', detail: 'CNN, BiLSTM and hybrid architectures in PyTorch and TensorFlow.' },
      { id: 'gnn', label: 'Graph neural networks', detail: 'GCNs over electrode topology for EEG decoding.' },
      { id: 'riemannian', label: 'Riemannian learning', detail: 'Manifold-aware handling of covariance descriptors.' },
      { id: 'interpretable', label: 'Interpretable AI', detail: 'Grad-CAM and attention, so predictions can be interrogated.' },
      { id: 'quantum', label: 'Quantum ML', detail: 'Quantum-enhanced classification with ANN-based feature compression.' },
    ],
  },
]

/* ─────────────── Timeline ─────────────── */

export interface TimelineEntry {
  year: string
  title: string
  org: string
  accent: Accent
  items: string[]
  stage: string
}

export const timeline: TimelineEntry[] = [
  {
    year: '2024',
    title: 'EMG & Biomedical Signal Processing',
    org: 'Punjab University, UIET',
    accent: 'emg',
    stage: 'Signal Processing → Machine Learning',
    items: [
      'Surface EMG analysis for prosthetic hand control',
      'Statistical and temporal feature extraction',
      'Gray Wolf Optimization for feature selection',
      'Ensemble ML–DL framework — 98.41% classification accuracy',
    ],
  },
  {
    year: '2025',
    title: 'EEG, Riemannian Geometry & Graph Learning',
    org: 'IIT (BHU), Varanasi',
    accent: 'model',
    stage: 'Machine Learning → Deep Learning',
    items: [
      'Riemannian manifold learning for Motor Imagery EEG',
      'Graph Convolutional Networks over electrode topology',
      'ANN–BiLSTM hybrid for CWT-based FMG classification',
      'Two conference papers: ICNGN (Singapore) and BigDIA (Vietnam)',
      'Four further publications across imaging, interpretability and quantum ML',
    ],
  },
  {
    year: '2026',
    title: 'Biomedical Imaging & Computational Neuroscience',
    org: 'Ganpat University → Temple Private Limited',
    accent: 'eeg',
    stage: 'Biomedical AI → Neuroscience → AI + Biology',
    items: [
      'Hybrid multimodal breast cancer detection (mammogram + ultrasound)',
      'Quantum-enhanced classification and multimodal feature fusion',
      'Synchronized EEG + GSR/EDA acquisition for sleep-stage assessment',
      'EEG–GSR fusion, GSR-derived biomarkers, subject-level generalization',
    ],
  },
]

export const progression = [
  'Signal Processing',
  'Machine Learning',
  'Deep Learning',
  'Biomedical AI',
  'Neuroscience',
  'AI + Biology',
]

/* ─────────────── How I think ─────────────── */

export const philosophy: { step: string; title: string; body: string; accent: Accent }[] = [
  {
    step: 'I',
    title: 'Measure',
    body: 'Acquire biological signals carefully. Sensor placement, protocol and signal quality set the ceiling for everything that follows.',
    accent: 'gsr',
  },
  {
    step: 'II',
    title: 'Process',
    body: 'Remove noise and artifacts. Physiological recordings are contaminated by default; cleaning is not preprocessing overhead, it is part of the method.',
    accent: 'eeg',
  },
  {
    step: 'III',
    title: 'Represent',
    body: 'Find meaningful signal representations — time, frequency, time–frequency, manifold, graph. The right space does most of the work.',
    accent: 'model',
  },
  {
    step: 'IV',
    title: 'Learn',
    body: 'Apply machine learning and deep learning, choosing architecture to match the structure of the data rather than the fashion of the month.',
    accent: 'model',
  },
  {
    step: 'V',
    title: 'Interpret',
    body: 'Understand what the model is learning. Saliency and attention exist so a prediction can be argued with.',
    accent: 'img',
  },
  {
    step: 'VI',
    title: 'Validate',
    body: 'Evaluate generalization and biological relevance. Subject-level performance matters more than a favourable split.',
    accent: 'emg',
  },
]

/* ─────────────── Technical constellation ─────────────── */

export const stackGroups: { id: string; label: string; accent: Accent; items: string[] }[] = [
  { id: 'programming', label: 'Programming', accent: 'model', items: ['Python', 'C++'] },
  { id: 'mldl', label: 'ML / DL', accent: 'img', items: ['PyTorch', 'TensorFlow', 'Scikit-learn'] },
  { id: 'signals', label: 'Biomedical Signals', accent: 'eeg', items: ['EEG', 'GSR / EDA', 'EMG', 'FMG'] },
  {
    id: 'methods',
    label: 'AI Methods',
    accent: 'gsr',
    items: [
      'CNN',
      'BiLSTM',
      'GCN',
      'Riemannian learning',
      'Multimodal fusion',
      'Interpretable AI',
      'Quantum ML',
      'Ensemble learning',
    ],
  },
]

/* ─────────────── Sleep stages (conceptual descriptions) ─────────────── */

export const sleepStages: { id: string; label: string; accent: string; character: string }[] = [
  {
    id: 'W',
    label: 'Wake',
    accent: '#f0b429',
    character:
      'Low-amplitude, higher-frequency EEG activity with the highest behavioural arousal. Electrodermal activity is typically responsive and variable.',
  },
  {
    id: 'N1',
    label: 'N1',
    accent: '#5eead4',
    character:
      'The transition into sleep. Wake rhythms drop away and the EEG slows; the stage is brief and easily fragmented.',
  },
  {
    id: 'N2',
    label: 'N2',
    accent: '#38bdf8',
    character:
      'Established light sleep, conventionally characterised by transient EEG events such as spindles and K-complexes. Usually the largest share of the night.',
  },
  {
    id: 'N3',
    label: 'N3',
    accent: '#a78bfa',
    character:
      'Deep, slow-wave sleep — high-amplitude, low-frequency EEG activity. Autonomic tone is generally at its quietest.',
  },
  {
    id: 'REM',
    label: 'REM',
    accent: '#fb7185',
    character:
      'Rapid eye movement sleep. EEG resembles lighter stages while muscle tone is suppressed, and autonomic activity becomes noticeably more variable.',
  },
]

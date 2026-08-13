/**
 * Research case studies. Every factual claim traces back to the resume.
 * Sections marked `limitations` describe honest scope, not disclaimers of
 * invented results. No accuracy figures appear unless the resume reports them.
 */

export type Accent = 'eeg' | 'gsr' | 'emg' | 'model' | 'img'

export interface CaseStudy {
  slug: string
  index: string
  title: string
  shortTitle: string
  subtitle: string
  accent: Accent
  affiliation: string
  period: string
  status: string
  question: string
  data: string[]
  methodology: string[]
  ai: string[]
  outcome: { label: string; value: string; caption: string } | null
  pipeline: string[]
  /** Signal glyph rendered on the card */
  glyph: 'eeg-gsr' | 'manifold' | 'burst' | 'image'
  tech: string[]
  publicationIds: string[]
  detail: {
    problem: string
    biological: string
    dataset: string
    preprocessing: string[]
    model: string[]
    results: string[]
    limitations: string[]
    significance: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sleep-staging',
    index: '01',
    title: 'Automated Sleep-Stage Assessment Using EEG + GSR/EDA',
    shortTitle: 'Sleep Staging',
    subtitle: 'Can peripheral physiological signals complement neural signals for understanding sleep?',
    accent: 'eeg',
    affiliation: 'Temple Private Limited · Gurgaon, Haryana, India',
    period: 'June 2026 – Present',
    status: 'Ongoing research',
    question:
      'Sleep is scored almost entirely from cortical activity. But sleep is also an autonomic phenomenon — skin conductance shifts with arousal, sympathetic tone and micro-awakenings. Does peripheral physiology carry stage-relevant information that EEG alone does not expose?',
    data: [
      'Synchronized EEG recordings',
      'GSR / EDA (electrodermal activity)',
      'Multimodal physiological acquisition with controlled sensor placement and recording protocols',
    ],
    methodology: [
      'Cross-modal synchronization of EEG and GSR/EDA streams',
      'Artifact removal and band-limited filtering',
      'Epoch segmentation into stage-scored windows',
      'Normalization and multimodal dataset construction',
      'Signal-quality assessment as a first-class step',
    ],
    ai: [
      'Temporal, spectral, autonomic and signal-variability feature engineering',
      'Machine learning and deep learning models for automated stage classification',
      'EEG–GSR fusion strategies',
      'GSR-derived sleep biomarkers',
      'Subject-level generalization evaluation',
    ],
    outcome: null,
    pipeline: [
      'EEG + GSR/EDA',
      'Synchronization',
      'Artifact removal',
      'Filtering',
      'Epoch segmentation',
      'Feature engineering',
      'EEG / GSR dynamics',
      'ML / DL models',
      'Wake · N1 · N2 · N3 · REM',
    ],
    glyph: 'eeg-gsr',
    tech: ['Python', 'PyTorch', 'Scikit-learn', 'EEG', 'GSR/EDA', 'Multimodal fusion'],
    publicationIds: [],
    detail: {
      problem:
        'Automated sleep staging is usually framed as a cortical problem: read the EEG, assign Wake, N1, N2, N3 or REM. That framing ignores a second, cheaper and far more wearable-friendly channel — the autonomic nervous system. This research builds synchronized EEG + GSR/EDA recordings and asks how much stage-relevant structure the peripheral channel actually contributes, and whether it survives across subjects.',
      biological:
        'Sleep stages differ not only in cortical rhythms but in autonomic tone. Electrodermal activity reflects sympathetic sudomotor drive, which varies across NREM depth, REM and transient arousals. Treating EEG and EDA together frames sleep as a whole-system state rather than a purely cortical one.',
      dataset:
        'Synchronized EEG and GSR/EDA experiments conducted in-house, with emphasis on sensor placement, recording protocols, signal quality and multimodal physiological data acquisition. Data collection and curation are part of the research work itself, not a downloaded benchmark.',
      preprocessing: [
        'Temporal synchronization of the EEG and GSR/EDA streams so that features from both modalities describe the same epoch.',
        'Artifact removal targeting movement, electrode and physiological contamination.',
        'Band-limited filtering appropriate to each modality — EEG rhythms occupy a very different band from slow electrodermal drift.',
        'Epoch segmentation into stage-scored windows.',
        'Per-subject normalization to reduce inter-individual amplitude differences.',
      ],
      model: [
        'Temporal features describing how each signal evolves within and across epochs.',
        'Spectral features capturing EEG rhythm distribution.',
        'Autonomic features derived from GSR/EDA dynamics.',
        'Signal-variability features for stage-specific characterization.',
        'Machine learning and deep learning classifiers trained for five-stage assignment, with explicit comparison of EEG-only against EEG–GSR fusion.',
      ],
      results: [
        'This is ongoing research. No performance figures are reported here, because none are established in the source record yet.',
        'Current work concentrates on pipeline reliability, signal quality, GSR-derived sleep biomarkers, and honest subject-level generalization rather than single-split accuracy.',
      ],
      limitations: [
        'Research prototype: the pipeline is an experimental research system, not a clinical or diagnostic tool.',
        'Subject-level generalization is an open question and the reason it is evaluated explicitly rather than assumed.',
        'Electrodermal activity is sensitive to ambient temperature, humidity and electrode contact, so signal-quality control constrains how much data is usable.',
      ],
      significance:
        'If autonomic signals carry recoverable stage information, sleep assessment becomes possible with far lighter sensing than full polysomnography — and, more interestingly, sleep becomes legible as a coordinated brain–body state rather than a cortical readout.',
    },
  },
  {
    slug: 'motor-imagery-eeg',
    index: '02',
    title: 'Scale-Specific Riemannian Features and Graph Learning for Motor Imagery EEG',
    shortTitle: 'Motor Imagery EEG',
    subtitle: 'Geometry-aware representations of neural covariance, decoded with graph neural networks.',
    accent: 'model',
    affiliation: 'IIT (BHU), Varanasi · Under Prof. Shiru Sharma',
    period: 'May 2025 – July 2025',
    status: 'Published — two conference papers',
    question:
      'EEG covariance matrices do not live in a flat Euclidean space — they live on a curved manifold of symmetric positive-definite matrices. What happens when you respect that geometry, and then treat the electrode array as a graph rather than a vector?',
    data: ['Motor imagery EEG', 'FMG (forcemyography) signals — parallel work in the same lab'],
    methodology: [
      'Artifact removal',
      'Band-pass filtering',
      'Normalization',
      'Scale-specific decomposition of the signal',
      'Covariance estimation and Riemannian manifold representation',
      'Continuous Wavelet Transform image representations (FMG work)',
    ],
    ai: [
      'Riemannian manifold learning',
      'Graph Convolutional Networks over electrode topology',
      'Hadamard and Riemannian space feature fusion',
      'ANN–BiLSTM hybrid architecture for CWT-based FMG classification',
    ],
    outcome: null,
    pipeline: [
      'EEG',
      'Preprocessing',
      'Signal representation',
      'Riemannian manifold learning',
      'Graph representation',
      'Graph Convolutional Network',
      'Motor imagery classification',
    ],
    glyph: 'manifold',
    tech: ['Python', 'PyTorch', 'Riemannian geometry', 'GCN', 'BiLSTM', 'CWT'],
    publicationIds: ['icngn-riemannian-gcn', 'bigdia-hadamard-riemannian'],
    detail: {
      problem:
        'Motor imagery decoding — recognising an imagined movement from scalp EEG — is limited by how the signal is represented before any classifier sees it. Spatial covariance is the natural descriptor, but covariance matrices are symmetric positive-definite: the space they occupy is curved, and treating it as flat discards information. This work builds representations that respect that geometry at multiple scales, then models the electrode array as a graph so that spatial relationships are learned rather than flattened away.',
      biological:
        'Imagining a movement modulates sensorimotor rhythms over the corresponding cortical region. The information is therefore both spectral and spatial — which electrodes co-vary, and in which band. A representation that keeps spatial structure intact is closer to the underlying neurophysiology than a flat feature vector.',
      dataset:
        'Motor imagery EEG, studied during a research internship in biomedical signal processing at IIT (BHU) under Prof. Shiru Sharma. A parallel strand of the same internship worked on FMG signal classification.',
      preprocessing: [
        'Artifact removal to suppress ocular, muscular and electrode-related contamination.',
        'Band-pass filtering to isolate the sensorimotor bands relevant to motor imagery.',
        'Normalization to stabilise amplitude scale across trials and subjects.',
        'Scale-specific decomposition, so that covariance is estimated per scale instead of once over the whole band.',
      ],
      model: [
        'Scale-specific Riemannian features: covariance descriptors computed per scale and handled with manifold-aware operations rather than naive Euclidean ones.',
        'Graph construction over the electrode array, turning spatial relationships into an explicit adjacency structure.',
        'Graph Convolutional Network for classification over that structure.',
        'A second study fuses Hadamard-space and Riemannian-space features, combining two complementary geometric views of the same signal.',
        'Separately, an ANN–BiLSTM hybrid was developed for FMG classification from Continuous Wavelet Transform image representations.',
      ],
      results: [
        'Two peer-reviewed conference papers came out of this work: one at ICNGN 2025 (Singapore) on scale-specific Riemannian features with a GCN, and one at BigDIA 2025 (Vietnam) on Hadamard and Riemannian space feature fusion.',
        'Numerical results are reported in the papers themselves and are deliberately not restated here.',
      ],
      limitations: [
        'Motor imagery decoding remains highly subject-dependent; cross-subject transfer is a known open problem in the field.',
        'Geometry-aware pipelines add computational cost relative to plain Euclidean feature extraction.',
        'Work was conducted as research, not as a deployed brain–computer interface.',
      ],
      significance:
        'Respecting the geometry of neural covariance, and the topology of the sensor array, is a general lesson — it applies well beyond motor imagery to any multichannel physiological signal where channels are related rather than independent.',
    },
  },
  {
    slug: 'emg-prosthetics',
    index: '03',
    title: 'EMG → Prosthetic Intelligence',
    shortTitle: 'EMG Prosthetics',
    subtitle: 'Optimized feature selection and an ensemble ML–DL framework for prosthetic hand control.',
    accent: 'emg',
    affiliation: 'Punjab University, UIET · Under Prof. Mamta Juneja',
    period: 'Dec 2024 – Jan 2025',
    status: 'Submitted to Biomedical Signal Processing (Elsevier), 2025',
    question:
      'Surface EMG carries the intent to move, buried in noise. Which features actually matter for distinguishing intended hand actions — and can a search algorithm find them better than hand-picking?',
    data: ['Surface EMG signals for prosthetic hand control applications'],
    methodology: [
      'Band-pass filtering',
      'Noise suppression for improved signal quality',
      'Statistical and temporal feature extraction: RMS, MAV, waveform length, kurtosis, skewness, AR coefficients',
      'Feature selection via Gray Wolf Optimization',
    ],
    ai: ['Ensemble machine learning + deep learning framework for movement classification'],
    outcome: {
      label: 'Classification accuracy',
      value: '98.41%',
      caption: 'Reported for the ensemble ML–DL framework with Gray Wolf Optimization feature selection.',
    },
    pipeline: [
      'EMG',
      'Filtering',
      'Feature extraction',
      'Feature optimization',
      'ML + DL ensemble',
      'Prosthetic hand control',
    ],
    glyph: 'burst',
    tech: ['Python', 'Scikit-learn', 'Gray Wolf Optimization', 'Ensemble learning', 'EMG'],
    publicationIds: [],
    detail: {
      problem:
        'A myoelectric prosthesis has to infer intended movement from surface EMG in real time. The bottleneck is rarely the classifier — it is the feature set. Too few features and classes collapse together; too many and the model overfits noise. This work treats feature selection as an explicit optimization problem instead of a design choice.',
      biological:
        'Surface EMG measures the summed electrical activity of motor units beneath the electrode. Different intended hand actions recruit different muscle groups with different timing, so the discriminative information is distributed across amplitude, waveform shape and short-term temporal structure.',
      dataset:
        'EMG signal analysis for prosthetic hand control applications, conducted during a research internship in biomedical signal processing at Punjab University, UIET, under Prof. Mamta Juneja.',
      preprocessing: [
        'Band-pass filtering to retain the physiological EMG band.',
        'Noise suppression to improve signal quality before any feature is computed.',
      ],
      model: [
        'Statistical and temporal features: RMS, MAV, waveform length, kurtosis, skewness and AR coefficients.',
        'Gray Wolf Optimization applied to select the feature subset, replacing manual feature curation with a metaheuristic search.',
        'An ensemble framework combining machine learning and deep learning classifiers over the optimized feature set.',
      ],
      results: [
        '98.41% classification accuracy reported for the ensemble ML–DL framework with Gray Wolf Optimization feature selection.',
        'The research was submitted to Biomedical Signal Processing (Elsevier) in 2025.',
      ],
      limitations: [
        'Offline classification accuracy is not the same thing as usable real-time prosthetic control; latency, electrode shift and user adaptation all matter in deployment.',
        'This is a research framework, not a certified assistive device.',
        'Metaheuristic feature selection results depend on the search configuration and should be validated across sessions and users.',
      ],
      significance:
        'Feature optimization is a cheap lever with a large effect. Getting the representation right before the model gets complicated is a recurring theme across all of this research.',
    },
  },
  {
    slug: 'biomedical-imaging',
    index: '04',
    title: 'AI for Medical Imaging',
    shortTitle: 'Biomedical Imaging',
    subtitle: 'Hybrid multimodal breast cancer detection, interpretable diagnosis, and quantum-enhanced classification.',
    accent: 'img',
    affiliation: 'Ganpat University (GUNI-WSRIP) · Gujarat, India',
    period: 'Jan 2026 – Mar 2026',
    status: 'Research prototype · related work published',
    question:
      'A mammogram and an ultrasound of the same tissue disagree in useful ways. Can multimodal fusion — and interpretability on top of it — produce decisions a clinician could actually interrogate?',
    data: ['Mammogram images', 'Ultrasound images', 'Retinal images (glaucoma work)', 'Brain MRI (quantum-enhanced classification work)'],
    methodology: [
      'Image preprocessing',
      'Tumor segmentation and ROI extraction',
      'Deep feature representation',
      'Multimodal feature fusion',
      'Grad-CAM interpretability (glaucoma work)',
      'Discrete Wavelet Transform frequency decomposition (diabetic foot ulcer work)',
    ],
    ai: [
      'Deep learning models for segmentation and benign/malignant classification',
      'Attention-based dual-branch hybrid networks',
      'Quantum-enhanced classification with ANN-based feature compression',
      'Frequency-aware multi-stream CNNs',
    ],
    outcome: null,
    pipeline: [
      'Medical image',
      'Preprocessing',
      'ROI / tumor segmentation',
      'Feature representation',
      'Multimodal fusion',
      'Classification',
      'Clinical decision support',
    ],
    glyph: 'image',
    tech: ['Python', 'PyTorch', 'TensorFlow', 'Grad-CAM', 'DWT', 'Quantum-enhanced ML'],
    publicationIds: ['cicn-glaucoma', 'cicn-quantum-brain-tumor', 'guwahati-dfu-dwt', 'eaic-dehazing'],
    detail: {
      problem:
        'Medical image classification is easy to do badly: a network reaches high accuracy, nobody can say what it looked at, and it fails on the next scanner. This strand of work pairs multimodal fusion — combining mammogram and ultrasound evidence — with interpretability methods, so that a prediction comes with a spatial account of itself.',
      biological:
        'Different imaging modalities expose different tissue properties. Mammography captures density and calcification; ultrasound captures echogenicity and margin structure. A lesion ambiguous under one modality is often clearer under the other, which is precisely the argument for fusion rather than a single-stream model.',
      dataset:
        'Mammogram and ultrasound images for the breast cancer detection system (Ganpat University, GUNI-WSRIP). Related published work covers retinal images for glaucoma detection, brain tumor classification, and diabetic foot ulcer detection.',
      preprocessing: [
        'Image preprocessing to normalise appearance across sources.',
        'Tumor segmentation and ROI extraction, so downstream classification operates on tissue rather than on background.',
        'Discrete Wavelet Transform decomposition in the frequency-aware multi-stream work, separating an image into scale-specific streams.',
      ],
      model: [
        'Deep learning models for tumor segmentation, ROI extraction and benign/malignant classification.',
        'Multimodal feature fusion across mammogram and ultrasound representations.',
        'Quantum-enhanced classification explored as a route to improved diagnostic accuracy, including deep feature extraction with ANN-based compression before a quantum-enhanced classifier.',
        'An attention-based dual-branch hybrid network with Grad-CAM interpretability, published for glaucoma detection.',
        'A frequency-aware multi-stream CNN based on DWT, published for diabetic foot ulcer detection.',
      ],
      results: [
        'Three peer-reviewed publications came out of this strand: attention-based dual-branch glaucoma detection with Grad-CAM (IEEE CICN 2025), quantum-enhanced brain tumor classification (IEEE CICN 2025), and a DWT-based frequency-aware multi-stream CNN for diabetic foot ulcer detection (IEEE Guwahati Sub-Section, 2026).',
        'The breast cancer detection system is a research prototype; no diagnostic performance figures are claimed for it here.',
      ],
      limitations: [
        'Research prototype only — none of this is a clinical decision system, and no clinical validation is claimed.',
        'Multimodal fusion assumes paired imaging is available, which is not always true in practice.',
        'Quantum-enhanced classification is at the exploratory stage; the practical advantage over classical baselines is exactly what remains to be established.',
      ],
      significance:
        'Interpretability is not decoration in medical imaging — it is the difference between a number and a decision someone can act on. Combining fusion with saliency is a step toward models whose reasoning is inspectable.',
    },
  },
]

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug)

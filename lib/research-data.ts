export interface ResearchPaper {
  slug: string;
  title: string;
  shortTitle: string;
  authors: string[];
  year: string;
  date: string;
  venue: string;
  venueShort: string;
  status: 'published' | 'preprint' | 'report';
  abstract: string;
  keywords: string[];
  pages?: string;
  publisher?: string;
  link?: string;
  arxiv?: string;
  github?: string;
  bibtex?: string;
}

export const RESEARCH: ResearchPaper[] = [
  {
    slug: 'youtube-misinformation-detection',
    title: 'Coordinated Amplification and Misinformation Detection in Global YouTube Conflict Narratives',
    shortTitle: 'YouTube Misinformation Detection',
    authors: ['Archit Rathod', 'Srinath Ganesh', 'Vishaal Dayashanker', 'Harsh Shelke', 'Vignesh Pathak'],
    year: '2025',
    date: '2025-12-09',
    venue: 'CS 418 · UIC Fall 2025',
    venueShort: 'Course Project',
    status: 'report',
    abstract:
      'YouTube serves as a major conduit for viral, multilingual political narratives, particularly during global conflicts. This project investigates coordinated amplification patterns and misinformation detection in YouTube content related to the Russia-Ukraine conflict. We analyzed approximately 5.9 million comments across 440,772 videos from 1,561 channels using a multi-method approach combining network science, anomaly detection, and natural language processing. Our findings validate three core hypotheses: (1) misinformation is amplified by highly interconnected channel and commenter clusters, (2) periods of intense real-world conflict correlate with statistically significant engagement anomalies, and (3) narratives evolve predictably over time in alignment with external war events. The project demonstrates the effectiveness of combining PageRank centrality analysis, Isolation Forest anomaly detection, and BERTopic modeling for detecting coordinated information campaigns at scale.',
    keywords: ['Misinformation Detection', 'YouTube', 'Network Science', 'PageRank', 'BERTopic', 'Anomaly Detection', 'NLP', 'Russia-Ukraine Conflict'],
  },
  {
    slug: 'responsible-ai-galaxy-morphology',
    title: 'Responsible AI for Scientific Discovery: Evaluating Explainability Methods for Galaxy Morphology Classification across Multiple Architectures and Datasets',
    shortTitle: 'Galaxy Morphology XAI',
    authors: ['Gargi Sathe', 'Archit Rathod'],
    year: '2026',
    date: '2026-05-01',
    venue: 'Technical Report · UIC 2026',
    venueShort: 'Technical Report',
    status: 'report',
    abstract:
      'Deep learning classifiers are now standard tools for automated galaxy morphology classification at the scale demanded by next-generation astronomical surveys. Their black-box nature, however, undermines scientific trust. We present a comparative study of four post-hoc explainability methods — Grad-CAM, LIME, Integrated Gradients, and GradientSHAP — applied to four convolutional architectures (ResNet-18, VGG-16, EfficientNet-B0, and a lightweight Custom CNN) on the Galaxy10 DECaLS dataset, with a secondary case study on the Galaxy Zoo Evo tiny subset. The secondary GZ Evo experiment surfaces a key lesson: under strict vote-fraction filtering and small-sample conditions, XAI evaluation can become unstable in ways that practitioners must report honestly. Together the experiments argue that XAI faithfulness rankings depend on both architecture and dataset conditions, and that no single explainer dominates universally.',
    keywords: ['Galaxy Morphology', 'Explainability', 'XAI', 'Grad-CAM', 'LIME', 'Integrated Gradients', 'GradientSHAP', 'CNN', 'ResNet', 'Astronomy', 'Rubin LSST'],
  },
  {
    slug: 'llm-toxicity-dexperts-replication',
    title: 'Measuring and Mitigating Toxicity in Large Language Models: A Comprehensive Replication Study',
    shortTitle: 'LLM Toxicity Mitigation',
    authors: ['Mokshit Surana', 'Archit Rathod', 'Akshaj Kurra Satishkumar'],
    year: '2025',
    date: '2025-12-01',
    venue: 'Technical Report · UIC 2025',
    venueShort: 'Technical Report',
    status: 'report',
    abstract:
      'Large Language Models (LLMs), when trained on web-scale corpora, inherently absorb toxic patterns from their training data. This leads to "toxic degeneration" where even innocuous prompts can trigger harmful outputs. This phenomenon poses significant risks for real-world deployments, necessitating effective mitigation strategies that maintain model utility while ensuring safety. In this comprehensive replication study, we evaluate the efficacy of DExperts (Decoding-time Experts), an inference-time mitigation technique that steers generation without requiring model retraining. We structured our research into three systematic phases: (1) establishing baseline toxicity measurements using RealToxicityPrompts on standard GPT-2 models; (2) implementing and evaluating DExperts to mitigate explicit toxicity; and (3) stress-testing the method against implicit hate speech using the adversarial ToxiGen dataset. Our empirical results confirm that while DExperts achieves near-perfect safety rates (100%) on explicit toxicity benchmarks, it exhibits brittleness against adversarial, implicit hate speech, with safety rates dropping to 98.5%. Furthermore, we quantify a critical trade-off: the method introduces a ~10x latency penalty (from 0.2s to 2.0s per generation), posing challenges for real-time deployment scenarios.',
    keywords: ['LLM Safety', 'Toxicity Mitigation', 'DExperts', 'GPT-2', 'ToxiGen', 'RealToxicityPrompts', 'AI Safety', 'Responsible AI'],
  },
  {
    slug: 'hte-benchmarking-networks',
    title: 'Benchmarking Algorithms for Heterogeneous Treatment Effect Estimation in Networks',
    shortTitle: 'HTE Benchmarking',
    authors: ['Archit Rathod', 'Mokshit Surana', 'Gargi Sathe'],
    year: '2024',
    date: '2024-12-01',
    venue: 'Technical Report · UIC 2024',
    venueShort: 'Technical Report',
    status: 'report',
    abstract:
      'This research focuses on benchmarking heterogeneous treatment effect (HTE) estimation algorithms in networked environments to enhance our understanding of causal relationships. By evaluating models such as X-Learner, T-Learner, and Causal Forest across synthetic, semi-synthetic, and real-world datasets, this work addresses the challenges posed by confounding, mediation, and interference in social networks. Through rigorous dataset generation, model tuning, and performance evaluation using metrics like ATE error and PEHE, the study highlights the strengths and limitations of these algorithms. Key findings demonstrate the variability in model performance under different conditions and underscore the need for context-aware model selection. This comprehensive benchmarking framework aims to inform future developments in causal inference methodologies, advancing robust and scalable solutions for complex network environments.',
    keywords: ['Causal Inference', 'Heterogeneous Treatment Effects', 'X-Learner', 'T-Learner', 'Causal Forest', 'Social Networks', 'PEHE', 'ATE'],
  },
  {
    slug: 'ascend-ai-interview-preparation',
    title: 'Ascend.AI — Building Confidence Through Technology: A Technical Exploration of Facial Expression, Tone, and Pitch Analysis with Chatbot Guidance',
    shortTitle: 'Ascend.AI',
    authors: ['Archit Rathod', 'Gargi Sathe', 'Siddh Shah', 'Kumkum Saxena'],
    year: '2024',
    date: '2024-07-17',
    venue: 'ICDSA 2024 · Springer Nature',
    venueShort: 'ICDSA 2024',
    status: 'published',
    publisher: 'Springer Nature Singapore',
    pages: '63–77',
    abstract:
      'The proposed approach embarks on an intricate and comprehensive exploration of advanced and innovative technologies to enhance interview skills. Leveraging the power of OpenCV and Xception, the paper delves into the nuances of facial expression analysis, unraveling the intricacies of emotion recognition. The system analyzes tone and pitch with the aid of tools like LIBROSA to extract vocal features in order to understand the intensity of emotions, and has developed a 1D-CNN model for classification using RAVDESS, TESS, SAVEE, and CREMA-D datasets. The system includes a chatbot using vector database Qdrant and an open-source LLM Mixtral 8x7b, offering personalized interview guidance derived from scraping 30 diverse websites for interview-related questions. This technical exploration extends from conventional interview preparation to introducing an innovative framework that intertwines machine learning models with real-time analysis.',
    keywords: ['Interview Preparation', 'Facial Expression Analysis', 'Tone Analysis', 'Pitch Analysis', 'OpenCV', 'Xception', 'LIBROSA', '1D-CNN', 'LLM', 'Qdrant', 'Chatbot'],
    bibtex: `@inproceedings{rathod2024ascend,
  title     = {Ascend.{AI} --- Building Confidence Through Technology: A Technical Exploration of Facial Expression, Tone, and Pitch Analysis with Chatbot Guidance},
  author    = {Rathod, Archit and Sathe, Gargi and Shah, Siddh and Saxena, Kumkum},
  booktitle = {International Conference on Data Science and Applications},
  pages     = {63--77},
  year      = {2024},
  publisher = {Springer Nature Singapore}
}`,
  },
  {
    slug: 'cnn-disaster-classification',
    title: 'Leveraging CNNs and Ensemble Learning for Automated Disaster Image Classification',
    shortTitle: 'CNN Disaster Classification',
    authors: ['Archit Rathod', 'Veer Pariawala', 'Mokshit Surana', 'Kumkum Saxena'],
    year: '2023',
    date: '2023-10-21',
    venue: 'ICSISCET 2023 · Springer Nature',
    venueShort: 'ICSISCET 2023',
    status: 'published',
    publisher: 'Springer Nature Singapore',
    pages: '311–326',
    abstract:
      'Natural disasters act as a serious threat globally, requiring effective and efficient disaster management and recovery. This paper focuses on classifying natural disaster images using Convolutional Neural Networks (CNNs). Multiple CNN architectures were built and trained on a dataset containing images of earthquakes, floods, wildfires, and volcanoes. A stacked CNN ensemble approach proved to be the most effective, achieving 95% accuracy and an F1 score going up to 0.96 for individual classes. Tuning hyperparameters of individual models for optimization was critical to maximize the models\' performance. The stacking of CNNs with XGBoost acting as the meta-model utilizes the strengths of the CNN and ResNet models to improve the overall accuracy of the classification. Results obtained from the models illustrated the potency of CNN-based models for automated disaster image classification. This lays the foundation for expanding these techniques to build robust systems for disaster response, damage assessment, and recovery management.',
    keywords: ['Disaster Classification', 'CNN', 'Ensemble Learning', 'XGBoost', 'ResNet', 'Computer Vision', 'Image Classification', 'Disaster Response'],
    bibtex: `@inproceedings{rathod2023cnn,
  title     = {Leveraging {CNN}s and Ensemble Learning for Automated Disaster Image Classification},
  author    = {Rathod, Archit and Pariawala, Veer and Surana, Mokshit and Saxena, Kumkum},
  booktitle = {International Conference on Sustainable and Innovative Solutions for Current Challenges in Engineering \\& Technology},
  pages     = {311--326},
  year      = {2023},
  publisher = {Springer Nature Singapore}
}`,
  },
  {
    slug: 'multiagent-simulators-social-networks',
    title: 'Multiagent Simulators for Social Networks',
    shortTitle: 'Multiagent Social Simulators',
    authors: ['Aditya Surve', 'Archit Rathod', 'Mokshit Surana', 'Gautam Malpani', 'Aneesh Shamraj', 'Sainath Reddy Sankepally', 'Raghav Jain', 'Swapneel S Mehta'],
    year: '2023',
    date: '2023-11-16',
    venue: 'NeurIPS 2023 · MASec Workshop',
    venueShort: 'NeurIPS 2023',
    status: 'published',
    abstract:
      'Multiagent social network simulations are an avenue that can bridge the communication gap between the public and private platforms in order to develop solutions to a complex array of issues relating to online safety. While there are significant challenges relating to the scale of multiagent simulations, efficient learning from observational and interventional data to accurately model micro and macro-level emergent effects, there are equally promising opportunities — not least with the advent of large language models that provide an expressive approximation of user behavior. In this position paper, we review prior art relating to social network simulation, highlighting challenges and opportunities for future work exploring multiagent security using agent-based models of social networks.',
    keywords: ['Multiagent Systems', 'Social Network Simulation', 'LLMs', 'Online Safety', 'Agent-Based Models', 'Emergent Behavior', 'Network Security'],
    arxiv: 'https://arxiv.org/abs/2311.14712',
    bibtex: `@article{surve2023multiagent,
  title   = {Multiagent Simulators for Social Networks},
  author  = {Surve, Aditya and Rathod, Archit and Surana, Mokshit and Malpani, Gautam and Shamraj, Aneesh and Sankepally, Sainath Reddy and Jain, Raghav and Mehta, Swapneel S},
  journal = {arXiv preprint arXiv:2311.14712},
  year    = {2023}
}`,
  },
];

export const RESEARCH_BY_SLUG: Record<string, ResearchPaper> = Object.fromEntries(
  RESEARCH.map((r) => [r.slug, r])
);

export const PUBLISHED = RESEARCH.filter((r) => r.status === 'published');
export const REPORTS = RESEARCH.filter((r) => r.status !== 'published');

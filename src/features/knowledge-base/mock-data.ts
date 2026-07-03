import {
  KnowledgeBase,
  KnowledgeDocument,
  KnowledgeEntry,
  KnowledgeChunk
} from './types';

export const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: 'kb_1',
    name: 'Customer Support KB',
    description: 'Main support documentation for customers',
    status: 'active',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-10'
  },
  {
    id: 'kb_2',
    name: 'Product Documentation',
    description: 'Internal product knowledge base',
    status: 'inactive',
    createdAt: '2026-01-05',
    updatedAt: '2026-01-12'
  }
];

export const mockDocuments: KnowledgeDocument[] = [
  {
    id: 'doc_1',
    title: 'Getting Started Guide',
    type: 'pdf',
    status: 'processed',
    createdAt: '2026-01-10'
  },
  {
    id: 'doc_2',
    title: 'FAQ Sheet',
    type: 'text',
    status: 'pending',
    createdAt: '2026-01-12'
  }
];

export const mockEntries: KnowledgeEntry[] = [
  {
    id: 'faq_1',
    question: 'How do I reset my password?',
    answer: 'Click on settings and choose reset password option.',
    createdAt: '2026-01-11'
  }
];

export const mockChunks: KnowledgeChunk[] = [
  {
    id: 'chunk_1',
    content: 'Reset password steps include email verification...',
    source: 'Getting Started Guide',
    status: 'ready'
  }
];

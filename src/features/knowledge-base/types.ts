export type KnowledgeBaseStatus = 'active' | 'inactive';

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  status: KnowledgeBaseStatus;
  createdAt: string;
  updatedAt: string;
}

export type DocumentStatus = 'pending' | 'processed' | 'failed';

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'url';
  status: DocumentStatus;
  createdAt: string;
}

export interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface KnowledgeChunk {
  id: string;
  content: string;
  source: string;
  status: 'pending' | 'ready';
}

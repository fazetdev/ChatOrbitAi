import {
  mockKnowledgeBases,
  mockDocuments,
  mockEntries,
  mockChunks
} from './mock-data';

import { KnowledgeBase, KnowledgeDocument } from './types';

/**
 * Simulated API delay helper
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Knowledge Base Services (Mock API Layer)
 */
export const knowledgeBaseService = {
  // Get all knowledge bases
  async getKnowledgeBases(): Promise<KnowledgeBase[]> {
    await delay(300);
    return mockKnowledgeBases;
  },

  // Get single knowledge base
  async getKnowledgeBaseById(id: string): Promise<KnowledgeBase | undefined> {
    await delay(200);
    return mockKnowledgeBases.find(kb => kb.id === id);
  },

  // Get documents
  async getDocuments(): Promise<KnowledgeDocument[]> {
    await delay(300);
    return mockDocuments;
  },

  // Get FAQ entries
  async getEntries() {
    await delay(200);
    return mockEntries;
  },

  // Get RAG chunks preview
  async getChunks() {
    await delay(200);
    return mockChunks;
  }
};

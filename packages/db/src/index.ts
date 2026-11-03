export type {
  JobQueue,
  KnowledgeRepository,
  SourceRepository,
} from '@monolith/contracts';
export type { EvidenceLinkedClaim, KnowledgeRelation, SourceOriginal } from '@monolith/core';

/** Persistence adapters and migrations are intentionally not implemented in this foundation package. */
export interface DatabaseAdapterInfo {
  dialect: 'postgresql';
  vectorExtension: 'pgvector';
}

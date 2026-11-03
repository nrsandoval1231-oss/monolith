import type { EvidenceLinkedClaim, Id, KnowledgeRelation, SourceOriginal } from '@monolith/core';

/** Persisted job states are explicit; queued/running do not imply successful work. */
export type JobStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export interface KnowledgeJob {
  id: Id;
  ownerId: Id;
  sourceId: Id;
  kind: 'extract' | 'index' | 'embed';
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  errorCode?: string;
}

export interface ExtractedKnowledge {
  claims: readonly EvidenceLinkedClaim[];
  relations: readonly KnowledgeRelation[];
}

export interface CaptureSourceInput {
  ownerId: Id;
  mediaType: string;
  /** Opaque reference to bytes already accepted by the configured storage adapter. */
  storageKey: string;
  contentHash: string;
  provenance: SourceOriginal['provenance'];
}

/** Boundary contracts only. Implementations must use configured durable services. */
export interface SourceRepository {
  getById(ownerId: Id, sourceId: Id): Promise<SourceOriginal | null>;
  createImmutable(input: CaptureSourceInput): Promise<SourceOriginal>;
}

export interface KnowledgeRepository {
  saveExtraction(sourceId: Id, result: ExtractedKnowledge): Promise<void>;
}

export interface JobQueue {
  enqueue(job: Omit<KnowledgeJob, 'status' | 'createdAt' | 'updatedAt'>): Promise<KnowledgeJob>;
}

export interface ExtractorProvider {
  readonly name: string;
  extract(source: SourceOriginal): Promise<ExtractedKnowledge>;
}

export interface EmbeddingProvider {
  readonly name: string;
  embed(texts: readonly string[]): Promise<readonly (readonly number[])[]>;
}

export interface SearchRequest {
  ownerId: Id;
  query: string;
  limit: number;
}

export interface SearchHit {
  claim: EvidenceLinkedClaim;
  evidence: EvidenceLinkedClaim['evidence'];
  score: number;
}

export interface KnowledgeSearch {
  search(request: SearchRequest): Promise<readonly SearchHit[]>;
}

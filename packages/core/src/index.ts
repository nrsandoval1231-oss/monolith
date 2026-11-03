/** Stable identifiers used across Monolith domain records. */
export type Id = string;
export type ISODateTime = string;

/** A captured original is retained as supplied; normalization belongs in derived records. */
export interface SourceOriginal {
  id: Id;
  ownerId: Id;
  mediaType: string;
  contentHash: string;
  capturedAt: ISODateTime;
  storageKey: string;
  provenance: SourceProvenance;
}

export interface SourceProvenance {
  origin: 'user_upload' | 'connector' | 'manual_entry';
  externalId?: string;
  sourceUri?: string;
  capturedBy: Id;
}

/** A claim is only useful when it can be traced to evidence spans. */
export interface EvidenceSpan {
  id: Id;
  sourceId: Id;
  startOffset?: number;
  endOffset?: number;
  locator?: string;
  excerptHash?: string;
}

export interface EvidenceLinkedClaim {
  id: Id;
  ownerId: Id;
  subject: string;
  predicate: string;
  object: string;
  evidence: readonly EvidenceSpan[];
  createdAt: ISODateTime;
  confidence?: number;
}

export interface KnowledgeRelation {
  id: Id;
  fromId: Id;
  kind: string;
  toId: Id;
  evidence: readonly EvidenceSpan[];
}

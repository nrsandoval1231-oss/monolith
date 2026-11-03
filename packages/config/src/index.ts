/** Runtime configuration is supplied by the application environment, never synthesized here. */
export interface RuntimeConfig {
  databaseUrl: string;
  originalStorage: { endpoint: string; bucket: string };
  providers: {
    extractor: string;
    embeddings: string;
  };
}

export function readRuntimeConfig(env: Readonly<Record<string, string | undefined>>): RuntimeConfig {
  const required = (key: string): string => {
    const value = env[key];
    if (!value) throw new Error(`Missing required configuration: ${key}`);
    return value;
  };
  return {
    databaseUrl: required('DATABASE_URL'),
    originalStorage: {
      endpoint: required('ORIGINAL_STORAGE_ENDPOINT'),
      bucket: required('ORIGINAL_STORAGE_BUCKET'),
    },
    providers: {
      extractor: required('EXTRACTOR_PROVIDER'),
      embeddings: required('EMBEDDING_PROVIDER'),
    },
  };
}

export interface ProcessedDocument {
  metadata: {
    documentType: string;
    creationDate?: string;
    author?: string;
    department?: string;
    classification: string;
    confidence: number;
  };
  content: {
    title: string;
    summary: string;
    sections: Array<{
      title: string;
      content: string;
      entities: Array<{
        type: string;
        value: string;
        context: string;
      }>;
    }>;
    keyMetrics: Array<{
      name: string;
      value: any;
      unit: string;
    }>;
  };
  relationships: Array<{
    source: string;
    target: string;
    type: string;
  }>;
  tags: string[];
}
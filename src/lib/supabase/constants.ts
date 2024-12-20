export const STORAGE_BUCKET = 'documents';

export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/csv': ['.csv'],
  'application/json': ['.json'],
  'text/markdown': ['.md'],
  'text/plain': ['.txt']
} as const;
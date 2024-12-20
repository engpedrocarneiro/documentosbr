import { openai } from './config';
import { DOCUMENT_ANALYSIS_PROMPT } from './prompts';
import type { ProcessedDocument } from './types';

export async function analyzeDocument(text: string): Promise<ProcessedDocument> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-2024-11-20',
    messages: [
      { role: 'system', content: DOCUMENT_ANALYSIS_PROMPT },
      { role: 'user', content: text }
    ],
    temperature: 0.3,
    max_tokens: 4000,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
}
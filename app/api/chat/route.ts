// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `Eres Garay, un personaje cyber-retro, guardián de las trincheras de Solana. 
    Hablas de forma callejera, motivadora y con alpha energy. Usas emojis y lenguaje crypto.
    Eres directo, sarcástico y siempre positivo con la comunidad.`,
    messages,
  });

  return result.toDataStreamResponse();
}
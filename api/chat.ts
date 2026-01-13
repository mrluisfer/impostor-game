import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <- SOLO server-side
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, type } = (req.body ?? {}) as { message?: string; type?: string };
    if (!message) return res.status(400).json({ error: 'Missing message' });

    // Si es una solicitud para generar palabra basada en categoría
    if (type === 'generate_word') {
      const prompt = `Eres un generador de palabras para un juego de "El Impostor". 
El usuario te dará una categoría y debes responder ÚNICAMENTE con un JSON válido (sin markdown, sin explicaciones).

Categoría del usuario: "${message}"

Responde con este formato JSON exacto:
{
  "category": "nombre de la categoría normalizado",
  "word": "una palabra o frase específica de esa categoría",
  "clues": ["pista 1 sobre la palabra", "pista 2 sobre la palabra", "pista 3 sobre la palabra"]
}

Reglas:
- La palabra debe ser específica y conocida dentro de esa categoría
- Las pistas deben ayudar a describir la palabra sin revelarla directamente
- Las pistas y palabra deben estar en el mismo idioma que la categoría proporcionada
- Las pistas y palabra deben estar relacionadas con la categoría y contexto similar
- Las pistas deben ser cortas (máximo 6-8 palabras cada una)
- Responde SOLO con el JSON, nada más`;

      const response = await openai.responses.create({
        model: 'gpt-4.1-mini',
        input: prompt,
      });

      const outputText = response.output_text ?? '';

      try {
        // Intentar parsear el JSON de la respuesta
        const jsonMatch = outputText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.status(200).json({
            category: parsed.category || message,
            word: parsed.word,
            clues: parsed.clues || [],
          });
        }
        throw new Error('No valid JSON found in response');
      } catch {
        return res.status(500).json({ error: 'Failed to parse AI response' });
      }
    }

    // Solicitud genérica (comportamiento original)
    const response = await openai.responses.create({
      model: 'gpt-4.1',
      input: message,
    });

    return res.status(200).json({ text: response.output_text ?? '' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: errorMessage });
  }
}

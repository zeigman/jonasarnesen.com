// Cloudflare Worker for Jonas Chatbot
// Denne filen deployes til Cloudflare Workers

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { systemPrompt, messages } = await request.json();

      // Build messages array for Claude API
      const claudeMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call Claude API
      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 500,
          system: systemPrompt,
          messages: claudeMessages,
        }),
      });

      if (!claudeResponse.ok) {
        const error = await claudeResponse.text();
        console.error('Claude API error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to get response from AI' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const data = await claudeResponse.json();
      const responseText = data.content[0]?.text || 'Ingen respons';

      return new Response(
        JSON.stringify({ response: responseText }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};

// Cloudflare Pages Function for Telegram alerts
interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

interface EventContext<TEnv = Env> {
  request: Request;
  env: TEnv;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}

interface AlertPayload {
  name: string;
  phone: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string | number;
  requests?: string;
  source?: string;
}

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  try {
    const { request, env } = context;
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    const data: AlertPayload = await request.json();

    if (!data.name || !data.phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If Telegram tokens are configured, dispatch alert
    if (botToken && chatId) {
      const message =
        `👑 *New Reservation Inquiry - The Monarch's Mug*\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📞 *Phone:* ${data.phone}\n` +
        (data.email ? `✉️ *Email:* ${data.email}\n` : '') +
        (data.date ? `📅 *Date:* ${data.date}\n` : '') +
        (data.time ? `⏰ *Time:* ${data.time}\n` : '') +
        (data.guests ? `👥 *Guests:* ${data.guests}\n` : '') +
        (data.requests ? `📝 *Special Notes:* ${data.requests}\n` : '');

      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const tgRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!tgRes.ok) {
        console.error('Telegram API error:', await tgRes.text());
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'Alert queued successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

import { Resend } from 'resend';

export const config = { runtime: 'edge' };

const FROM_ADDRESS = 'JOSHUA <hello@joshua.site>';
const NOTIFY_TO = 'joshproductletter@gmail.com';
const CALENDLY_URL = 'https://calendly.com/tuemarz/coffeechat-with-josh-kim';

const SITE_URL = 'https://joshua.site';
const LOGO_URL = `${SITE_URL}/JOSHUA.png`;

const AUTO_REPLY_SUBJECT = '[JOSHUA] 문의 주셔서 감사합니다';

const AUTO_REPLY_TEXT = `안녕하세요, JOSHUA의 Josh Kim입니다.

보내주신 문의 잘 받았습니다. JOSHUA에 관심 가져주셔서 감사합니다.

AI 전환(AX)에 대해 더 깊이 이야기 나누고 싶으시다면,
아래 링크에서 편하신 시간에 30분 커피챗을 잡아주세요.
줌 또는 구글밋으로 진행됩니다.

${CALENDLY_URL}

간단한 질문이시라면 이 메일에 그대로 답장 주셔도 됩니다.
확인하는 대로 직접 회신드리겠습니다.

감사합니다.
Josh Kim
JOSHUA AX Consultancy
joshua.site
`;

const AUTO_REPLY_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>JOSHUA</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Pretendard','Apple SD Gothic Neo','Segoe UI',Roboto,sans-serif;color:#18181b;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;max-width:600px;border:1px solid #e4e4e7;overflow:hidden;">
          <tr>
            <td style="padding:40px 48px 24px 48px;border-bottom:1px solid #f4f4f5;">
              <img src="${LOGO_URL}" alt="JOSHUA" width="96" style="display:block;width:96px;height:auto;border:0;outline:none;text-decoration:none;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px 48px 8px 48px;">
              <h1 style="margin:0 0 28px 0;font-size:24px;line-height:1.4;font-weight:700;color:#18181b;letter-spacing:-0.02em;">
                문의 주셔서 감사합니다
              </h1>
              <p style="margin:0 0 20px 0;font-size:16px;line-height:1.75;color:#3f3f46;">
                안녕하세요, JOSHUA의 Josh Kim입니다.
              </p>
              <p style="margin:0 0 20px 0;font-size:16px;line-height:1.75;color:#3f3f46;">
                보내주신 문의 잘 받았습니다. JOSHUA에 관심 가져주셔서 감사합니다.
              </p>
              <p style="margin:0 0 32px 0;font-size:16px;line-height:1.75;color:#3f3f46;">
                AI 전환(AX)에 대해 더 깊이 이야기 나누고 싶으시다면, 아래 버튼으로 편하신 시간에 30분 커피챗을 잡아주세요. 줌 또는 구글밋으로 진행됩니다.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px 0;">
                <tr>
                  <td style="border-radius:999px;background:#18181b;">
                    <a href="${CALENDLY_URL}" target="_blank" rel="noopener" style="display:inline-block;padding:16px 32px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Pretendard','Apple SD Gothic Neo','Segoe UI',Roboto,sans-serif;">
                      커피챗 예약하기 &nbsp;→
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px 0;font-size:14px;line-height:1.75;color:#71717a;">
                간단한 질문이시라면 이 메일에 그대로 답장 주셔도 됩니다. 확인하는 대로 직접 회신드리겠습니다.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 48px 40px 48px;border-top:1px solid #f4f4f5;">
              <p style="margin:0 0 4px 0;font-size:15px;font-weight:700;color:#18181b;letter-spacing:-0.01em;">Josh Kim</p>
              <p style="margin:0 0 12px 0;font-size:13px;color:#71717a;">JOSHUA AX Consultancy</p>
              <a href="${SITE_URL}" style="font-size:13px;color:#52525b;text-decoration:none;">joshua.site</a>
            </td>
          </tr>
        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
          <tr>
            <td style="padding:24px 48px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#a1a1aa;line-height:1.6;">
                © 2025 JOSHUA AX Consultancy. All rights reserved.<br>
                이 메일은 joshua.site 문의 폼을 통해 자동 발송되었습니다.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonError('Server email not configured', 500);
  }

  let name = '';
  let email = '';
  let message = '';

  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = (await req.json()) as Record<string, unknown>;
      name = String(body.name ?? '').trim();
      email = String(body.email ?? '').trim();
      message = String(body.message ?? '').trim();
    } else {
      const formData = await req.formData();
      name = String(formData.get('name') ?? '').trim();
      email = String(formData.get('email') ?? '').trim();
      message = String(formData.get('message') ?? '').trim();
    }
  } catch {
    return jsonError('Invalid request body', 400);
  }

  if (!name || !email || !message) {
    return jsonError('이름, 이메일, 메시지를 모두 입력해주세요.', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError('이메일 형식이 올바르지 않습니다.', 400);
  }

  const resend = new Resend(apiKey);

  const notify = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_TO,
    replyTo: email,
    subject: `[joshua.site 문의] ${name}`,
    text: `이름/회사: ${name}\n이메일: ${email}\n\n메시지\n──────────\n${message}\n`,
  });

  if (notify.error) {
    console.error('notify failed', notify.error);
    return jsonError('알림 발송 실패', 502);
  }

  const autoReply = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: AUTO_REPLY_SUBJECT,
    text: AUTO_REPLY_TEXT,
    html: AUTO_REPLY_HTML,
  });

  if (autoReply.error) {
    console.error('auto-reply failed', autoReply.error);
    return jsonError('자동 회신 발송 실패', 502);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

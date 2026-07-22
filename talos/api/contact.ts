import { Resend } from 'resend';

export const config = { runtime: 'edge' };

// joshua-site api/contact.ts와 동일한 Resend 파이프라인 — 알림은 hello@joshua.site로 수신
const FROM_ADDRESS = 'TALOS by Joshua & Company <hello@joshua.site>';
const NOTIFY_TO = 'hello@joshua.site';

const AUTO_REPLY_SUBJECT = '[TALOS] 무료 AX 진단 신청이 접수되었습니다';

const AUTO_REPLY_TEXT = `안녕하세요, TALOS by Joshua & Company입니다.

무료 AX 진단 신청이 정상 접수되었습니다.
영업일 1일 내에 담당 컨설턴트가 연락드리겠습니다.

진행 순서는 다음과 같습니다.
1. 30분 화상 미팅 — 현황과 목표를 듣습니다
2. 현장 워크숍 — 데이터 현황을 함께 진단합니다
3. 진단 리포트 — 유스케이스 우선순위를 제안드립니다

궁금하신 점은 이 메일에 그대로 답장 주시면 됩니다.

감사합니다.
TALOS by Joshua & Company
hello@joshua.site
`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonError('Server email not configured', 500);
  }

  let company = '';
  let name = '';
  let title = '';
  let phone = '';
  let email = '';
  let painPoint = '';
  let source = '';
  let consent = false;
  let website = '';
  let utm: Record<string, string> = {};

  try {
    const body = (await req.json()) as Record<string, unknown>;
    company = String(body.company ?? '').trim();
    name = String(body.name ?? '').trim();
    title = String(body.title ?? '').trim();
    phone = String(body.phone ?? '').trim();
    email = String(body.email ?? '').trim();
    painPoint = String(body.pain_point ?? '').trim();
    source = String(body.source ?? 'talos-landing').trim();
    consent = body.consent === true;
    website = String(body.website ?? '');
    if (body.utm && typeof body.utm === 'object') {
      utm = body.utm as Record<string, string>;
    }
  } catch {
    return jsonError('Invalid request body', 400);
  }

  // honeypot — 봇 제출은 성공한 척 무시
  if (website) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (!company || !name || !phone || !email) {
    return jsonError('모든 필수 항목을 입력해주세요.', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError('이메일 형식이 올바르지 않습니다.', 400);
  }
  if (!/^[0-9]{9,11}$/.test(phone)) {
    return jsonError('휴대폰 번호는 하이픈 없이 숫자만 입력해주세요.', 400);
  }
  if (!consent) {
    return jsonError('개인정보 수집·이용에 동의해주세요.', 400);
  }

  const resend = new Resend(apiKey);

  const utmLine = Object.keys(utm).length
    ? Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(', ')
    : '(직접 유입)';

  const notifyText = [
    `회사명: ${company}`,
    `성함: ${name}`,
    `직함: ${title || '(미입력)'}`,
    `휴대폰: ${phone}`,
    `이메일: ${email}`,
    `유입: ${source} · ${utmLine}`,
    '',
    '해결하고 싶은 공정 문제',
    '──────────',
    painPoint || '(미입력)',
    '',
  ].join('\n');

  const notify = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_TO,
    replyTo: email,
    subject: `[TALOS 진단 신청] ${name} (${company})`,
    text: notifyText,
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
  });

  if (autoReply.error) {
    // 자동 회신 실패는 접수 자체를 막지 않는다 (알림은 이미 발송됨)
    console.error('auto-reply failed', autoReply.error);
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

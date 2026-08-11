import { Resend } from 'resend';
import { SITE } from '@/lib/data';

// 기존 joshua-site api/contact.ts(Resend) 파이프라인 이식 — 문의 유형에 솔루션, 유입 경로에 AI 검색 추가
export const runtime = 'edge';

const FROM_ADDRESS = 'JOSHUA <hello@joshua.site>';
const NOTIFY_TO = 'hello@joshua.site';

const AUTO_REPLY_SUBJECT = '[JOSHUA] 문의 주셔서 감사합니다';
const AUTO_REPLY_TEXT = `안녕하세요, JOSHUA의 Josh Kim입니다.

보내주신 문의 잘 받았습니다. JOSHUA에 관심 가져주셔서 감사합니다.

AI 전환(AX)에 대해 더 깊이 이야기 나누고 싶으시다면,
아래 링크에서 편하신 시간에 30분 커피챗을 잡아주세요.
줌 또는 구글밋으로 진행됩니다.

${SITE.calendly}

간단한 질문이시라면 이 메일에 그대로 답장 주셔도 됩니다.
확인하는 대로 직접 회신드리겠습니다.

감사합니다.
Josh Kim
JOSHUA AX Consultancy
joshua.site
`;

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return jsonError('Server email not configured', 500);

  let name = '', company = '', email = '', phone = '', category = '', message = '', source = '';
  let consent = false;

  try {
    const body = (await req.json()) as Record<string, unknown>;
    name = String(body.name ?? '').trim();
    company = String(body.company ?? '').trim();
    email = String(body.email ?? '').trim();
    phone = String(body.phone ?? '').trim();
    category = String(body.category ?? '').trim();
    message = String(body.message ?? '').trim();
    source = String(body.source ?? '').trim();
    consent = body.consent === true || body.consent === 'on';
  } catch {
    return jsonError('Invalid request body', 400);
  }

  if (!name || !company || !email || !phone || !category || !message || !source) {
    return jsonError('모든 필수 항목을 입력해주세요.', 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError('이메일 형식이 올바르지 않습니다.', 400);
  }
  if (!/^[0-9]+$/.test(phone)) {
    return jsonError('연락처는 하이픈 없이 숫자만 입력해주세요.', 400);
  }
  if (!consent) {
    return jsonError('개인정보 수집·이용에 동의해주세요.', 400);
  }

  const resend = new Resend(apiKey);

  const notifyText = [
    `이름: ${name}`,
    `회사: ${company}`,
    `이메일: ${email}`,
    `연락처: ${phone}`,
    `문의 유형: ${category}`,
    `유입 경로: ${source}`,
    '',
    '문의 내용',
    '──────────',
    message,
    '',
  ].join('\n');

  const notify = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_TO,
    replyTo: email,
    subject: `[joshua.site 문의] ${category} - ${name} (${company})`,
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
    console.error('auto-reply failed', autoReply.error);
  }

  return Response.json({ ok: true });
}

function jsonError(message: string, status: number): Response {
  return Response.json({ ok: false, error: message }, { status });
}

/**
 * 株式会社SmartThanks お問い合わせ送信 Lambda関数
 *
 * 役割:
 * 1. API Gatewayからお問い合わせ内容を受け取る
 * 2. 入力内容のバリデーション
 * 3. Slack Webhookを介してSlackチャンネルに通知
 */

const https = require('https');

const ALLOWED_ORIGINS = [
  'https://smartthanks.world',
  'https://www.smartthanks.world',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 254,
  item: 200,
  message: 5000,
};

exports.handler = async (event) => {
  console.log('Request:', event.httpMethod, event.path);

  const origin = event.headers?.origin ?? '';
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  const headers = {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Vary': 'Origin',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, item, message } = data;

    // 必須項目チェック
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: '必須項目が不足しています。' })
      };
    }

    // メール形式チェック
    if (!EMAIL_REGEX.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'メールアドレスの形式が正しくありません。' })
      };
    }

    // 入力長チェック
    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      (item && item.length > LIMITS.item) ||
      message.length > LIMITS.message
    ) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: '入力内容が長すぎます。' })
      };
    }

    const slackMessage = {
      text: `🔔 *新しいお問い合わせが届きました (smartthanks.world)*`,
      attachments: [
        {
          color: '#F59E0B',
          fields: [
            { title: 'お名前', value: name, short: true },
            { title: 'メールアドレス', value: email, short: true },
            { title: 'お問い合わせ項目', value: item ?? '（未選択）', short: false },
            { title: 'メッセージ', value: message, short: false }
          ],
          footer: 'SmartThanks Contact Bot',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

    if (!SLACK_WEBHOOK_URL) {
      throw new Error('SLACK_WEBHOOK_URL is not set');
    }

    await postToSlack(SLACK_WEBHOOK_URL, slackMessage);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: '送信に成功しました。' })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'サーバーエラーが発生しました。' })
    };
  }
};

function postToSlack(url, message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(message);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(url, options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        if (res.statusCode < 400) {
          resolve(responseBody);
        } else {
          reject(new Error(`Slack request failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

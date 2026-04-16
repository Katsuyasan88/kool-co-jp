/**
 * 株式会社SmartThanks お問い合わせ送信 Lambda関数
 * 
 * 役割: 
 * 1. API Gatewayからお問い合わせ内容を受け取る
 * 2. 入力内容のバリデーション
 * 3. Slack Webhookを介してSlackチャンネルに通知
 */

const https = require('https');

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event));

  // CORS設定（Preflight/POST用）
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  };

  // Preflight (OPTIONS) リクエストへの対応
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, item, message } = data;

    // バリデーション
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: '必須項目が不足しています。' })
      };
    }

    // Slackへのメッセージ組み立て
    const slackMessage = {
      text: `🔔 *新しいお問い合わせが届きました (smartthanks.world)*`,
      attachments: [
        {
          color: "#F59E0B", // SmartThanks Orange
          fields: [
            { title: "お名前", value: name, short: true },
            { title: "メールアドレス", value: email, short: true },
            { title: "お問い合わせ項目", value: item, short: false },
            { title: "メッセージ", value: message, short: false }
          ],
          footer: "SmartThanks Contact Bot",
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    console.log('Sending to Slack:', JSON.stringify(slackMessage));

    // Slack Webhook URL (環境変数から取得することを推奨)
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      throw new Error('SLACK_WEBHOOK_URL is not set');
    }

    const slackResponse = await postToSlack(SLACK_WEBHOOK_URL, slackMessage);
    console.log('Slack Response:', slackResponse);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: '送信に成功しました。' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'サーバーエラーが発生しました。', error: error.message })
    };
  }
};

/**
 * SlackへPOSTリクエストを送信するヘルパー関数
 */
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
          reject(new Error(`Slack request failed with status ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

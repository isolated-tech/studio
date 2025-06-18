export async function onRequestGet(context) {
  const { env } = context;
  
  // Test sending a simple email via MailChannels
  try {
    const testEmail = {
      personalizations: [
        {
          to: [{ email: env.TO_EMAIL || 'support@isolated.tech' }],
        },
      ],
      from: {
        email: 'noreply@isolated.tech',
        name: 'Isolated Tech Test',
      },
      subject: 'Test Email from Cloudflare Pages',
      content: [
        {
          type: 'text/plain',
          value: 'This is a test email to verify MailChannels is working.',
        },
      ],
    };

    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(testEmail),
    });

    const responseText = await response.text();
    
    return new Response(JSON.stringify({
      status: response.status,
      statusText: response.statusText,
      response: responseText,
      expectedStatus: 202,
      success: response.status === 202,
      timestamp: new Date().toISOString(),
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
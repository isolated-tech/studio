export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.json();
    const { name, email, company, phone, message, budget } = formData;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Budget: ${budget || 'Not specified'}

Message:
${message}
    `.trim();

    const sendRequest = new Request('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: env.TO_EMAIL || 'support@isolated.tech' }],
          },
        ],
        from: {
          email: env.FROM_EMAIL || 'noreply@isolated.tech',
          name: 'Isolated Tech',
        },
        reply_to: {
          email: email,
          name: name,
        },
        subject: `New Contact Form Submission from ${name}`,
        content: [
          {
            type: 'text/plain',
            value: emailBody,
          },
        ],
      }),
    });

    console.log('Sending email to:', env.TO_EMAIL || 'support@isolated.tech');
    console.log('From:', env.FROM_EMAIL || 'noreply@isolated.tech');
    
    const response = await fetch(sendRequest);
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('MailChannels API error:', response.status, responseText);
      throw new Error(`MailChannels error: ${response.status}`);
    }
    
    console.log('Email sent successfully');

    return new Response(JSON.stringify({ success: true, message: 'Thank you for your message. We\'ll get back to you soon!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process your request. Please try again later.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
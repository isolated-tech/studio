export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.json();
    const { name, email, company, phone, message, budget } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Prepare email content
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

    // Updated MailChannels configuration for Cloudflare Pages
    const emailData = {
      from: {
        email: env.FROM_EMAIL || 'noreply@isolated.tech',
        name: 'Isolated Tech',
      },
      to: [env.TO_EMAIL || 'support@isolated.tech'],
      subject: `New Contact Form Submission from ${name}`,
      content: emailBody,
      reply: email,
    };

    console.log('Attempting to send email:', JSON.stringify(emailData, null, 2));

    // Use the Pages Plugin binding for MailChannels
    try {
      await env.MAILCHANNELS.send(emailData);
      console.log('Email sent successfully via MailChannels plugin');
    } catch (mailError) {
      console.error('MailChannels plugin error:', mailError);
      
      // Fallback to API method
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

      const response = await fetch(sendRequest);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('MailChannels API error:', response.status, errorText);
        throw new Error(`Failed to send email: ${response.status}`);
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your message. We\'ll get back to you soon!' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Contact form error:', error.message || error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your request. Please try again later.' 
    }), {
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
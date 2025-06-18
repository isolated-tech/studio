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

    // Create a proper MailChannels request for Cloudflare
    const emailData = {
      personalizations: [
        {
          to: [{ email: env.TO_EMAIL || 'support@isolated.tech', name: 'Isolated Tech Support' }],
        },
      ],
      from: {
        email: 'noreply@isolated.tech',
        name: 'Isolated Tech Contact Form',
      },
      subject: `New Contact Form Submission from ${name}`,
      content: [
        {
          type: 'text/plain',
          value: `New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Budget: ${budget || 'Not specified'}

Message:
${message}

---
This email was sent from the contact form at isolated.tech`,
        },
      ],
    };

    // Add reply-to header
    if (email) {
      emailData.reply_to = { email, name };
    }

    console.log('Attempting to send email via MailChannels');

    // The correct endpoint for Cloudflare Pages
    const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.status === 202) {
      // 202 Accepted is success for MailChannels
      console.log('Email queued successfully');
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
    }

    // If not 202, there was an error
    const errorText = await response.text();
    console.error('MailChannels error:', response.status, errorText);
    
    // Check if it's a domain verification issue
    if (response.status === 403 || errorText.includes('domain')) {
      return new Response(JSON.stringify({ 
        error: 'Email service configuration error. Please contact support directly at support@isolated.tech' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    throw new Error(`Email service error: ${response.status}`);
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send message. Please try again or email us directly at support@isolated.tech' 
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
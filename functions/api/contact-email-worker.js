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

    // Create the email request for Cloudflare Email Worker
    const emailRequest = {
      to: env.TO_EMAIL || 'support@isolated.tech',
      from: env.FROM_EMAIL || 'noreply@isolated.tech',
      subject: `New Contact Form Submission from ${name}`,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Budget: ${budget || 'Not specified'}

Message:
${message}`,
      html: `<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
<p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>`,
      replyTo: email,
    };

    // For Cloudflare Pages without Email Worker, we'll use a different approach
    // Option 1: Use a third-party email service with API key
    // Option 2: Use Cloudflare Email Workers (requires separate worker)
    // Option 3: Use web3forms.com as a free alternative

    // Using web3forms as a free alternative that works well with static sites
    const web3formsRequest = new Request('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_KEY || 'YOUR_ACCESS_KEY', // Get from https://web3forms.com
        subject: emailRequest.subject,
        from_name: name,
        email: email,
        message: emailRequest.text,
        to: emailRequest.to,
      }),
    });

    const response = await fetch(web3formsRequest);
    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Email send failed:', result);
      throw new Error('Failed to send email');
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
    console.error('Contact form error:', error);
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
// Test script for contact form API
// Replace YOUR_SITE_URL with your actual Cloudflare Pages URL

const SITE_URL = 'https://YOUR_SITE.pages.dev'; // UPDATE THIS!

async function testContactForm() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com', // Use a real email you can check
    company: 'Test Company',
    phone: '555-1234',
    message: 'This is a test message sent via API',
    budget: '50'
  };

  console.log('Sending test submission to:', `${SITE_URL}/api/contact`);
  console.log('Test data:', testData);

  try {
    const response = await fetch(`${SITE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Success! Check your email at:', testData.email);
      console.log('Also check the TO_EMAIL address configured in Cloudflare');
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
}

// Run the test
testContactForm();
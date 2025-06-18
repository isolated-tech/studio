export async function onRequestGet(context) {
  const { env } = context;
  
  return new Response(JSON.stringify({
    message: 'Test endpoint working',
    env_vars: {
      TO_EMAIL: env.TO_EMAIL ? 'Set' : 'Not set',
      FROM_EMAIL: env.FROM_EMAIL ? 'Set' : 'Not set',
      MAILCHANNELS: env.MAILCHANNELS ? 'Available' : 'Not available',
    },
    timestamp: new Date().toISOString(),
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
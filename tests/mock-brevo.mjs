const originalFetch = globalThis.fetch;

globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (url.startsWith('https://api.brevo.com/v3/smtp/email')) {
    const payload = JSON.parse(init.body);
    const otp = payload.htmlContent.match(/>(\d{6})<\/span>/)?.[1];
    if (!otp) throw new Error('Test mail payload did not contain a verification code.');
    process.send?.({type: 'test-otp-issued', email: payload.to[0].email, otp});
    return new Response(null, {status: 201});
  }
  return originalFetch(input, init);
};

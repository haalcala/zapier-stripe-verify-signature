const verifySignature = (z, bundle) => {
  const crypto = require('crypto');

  const {raw_data, stripe_header, signing_secret} = bundle.inputData;

  // z.console.log("raw_data:", raw_data, "stripe_header:", stripe_header, "signing_secret:", signing_secret);

  const payload = `${stripe_header.split(',')[0].split('=')[1]}.${raw_data}`;

  // z.console.log('payload:', payload);

  const hash = crypto.createHmac('sha256', signing_secret).update(payload).digest('hex');

  // z.console.log('hash:', hash, hash === stripe_header.split(',')[1].split('=')[1] ? "MATCHED!!!" : "NOT MATCHED!!!!");

  return {verified: hash === stripe_header.split(',')[1].split('=')[1]};
};

module.exports = {
  key: 'verified',
  noun: 'Verified',

  display: {
    label: 'Verify Signature',
    description: 'Verify Stripe data'
  },

  operation: {
    inputFields: [
      {key: 'raw_data', label:'Stripe Raw Data', required: true},
      {key:'stripe_header', label: 'Stripe Header', required: true},
      {key:'signing_secret', label: 'Signing Secret', required: true, type: 'password' },
    ],
    perform: verifySignature,
    sample: {verified: 'True or False'}
  }
};

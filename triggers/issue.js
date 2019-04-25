const sample = require('../samples/sample_issue');

const triggerIssue = (z, bundle) => {
  const responsePromise = z.request({
    method: 'GET',
    url: `https://api.github.com/repos/${bundle.inputData.repo}/issues`,
    params: {
      filter: bundle.inputData.filter,
      state: bundle.inputData.state,
      sort: 'updated',
      direction: 'desc'
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'issue',
  noun: 'Issue',

  display: {
    label: 'Get Issue',
    description: 'Triggers on a new issue.'
  },

  operation: {
    inputFields: [
      {key: 'raw_data', label:'Stripe Raw Data', required: true, dynamic: 'repo.full_name.full_name'},
      {key:'stripe_header', label: 'Stripe Header', required: true, dynamic: '',
      {key:'signing_secret', label: 'Signing Secret', required: true, dynamic: '',
    ],
    perform: triggerIssue,

    sample: sample
  }
};

const axios = require('axios');

const setResponders = (ticketId) => {
  const data = JSON.stringify({
    fields: {
      customfield_10051: [
        {
          ari: 'ari:cloud:opsgenie:0498e0be-9faa-4bae-9707-532ad94dc876:team/104f743e-92a1-4d6f-a049-7acea170a44a',
          name: 'Alpha Squad',
          type: 'team',
        },
      ],
    },
  });

  const config = {
    method: 'put',
    url: `https://vectornet.atlassian.net/rest/api/3/issue/${ticketId}`,
    headers: {
      Authorization: `Basic ${process.env.JIRA}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config).catch(function (error) {
    console.log(error);
  });
};

module.exports = { setResponders };

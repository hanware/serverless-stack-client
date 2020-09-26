const dev = {
  STRIPE_KEY: "pk_test_EmZV7k4Cgusn315QrzofA9Ue00g0mID0HT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "dealership-app-uploads"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://xbg9ahwpq7.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_VNouWhbgF",
    APP_CLIENT_ID: "n4kj6jfadh8n0l9hlonmhlr44",
    IDENTITY_POOL_ID: "us-west-2:8f191bd7-0ef1-43e1-9166-7c93922ad092"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_EmZV7k4Cgusn315QrzofA9Ue00g0mID0HT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-uploads03"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://se5h0ptayk.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_sSegfkqGk",
    APP_CLIENT_ID: "61cb84og277nbeurv2j1c1nmrf",
    IDENTITY_POOL_ID: "us-west-2:fc0ce8c6-20f3-4989-a76d-0000aca26f1d"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
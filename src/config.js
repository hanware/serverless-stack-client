const dev = {
  STRIPE_KEY: "pk_test_EmZV7k4Cgusn315QrzofA9Ue00g0mID0HT",
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-uploads03"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://y2vm0qy8lb.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_SXMOOOIE1",
    APP_CLIENT_ID: "6882lvuhfevt03i9dippbrd80n",
    IDENTITY_POOL_ID: "us-west-2:c6c5ec24-d59c-45a2-a8e9-21e58c50bc33"
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
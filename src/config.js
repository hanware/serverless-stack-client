export default {
  STRIPE_KEY: "pk_test_EmZV7k4Cgusn315QrzofA9Ue00g0mID0HT",
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-uploads03",
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://qndhcjuv8a.execute-api.us-west-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_xkwCpl9NL",
    APP_CLIENT_ID: "5g3gu7r13vh2amngh66fi1org9",
    IDENTITY_POOL_ID: "us-west-2:ed5cc4f6-d0af-4009-a811-b92d975e6d11",
  },
};

# Authentication Setup

To enable real authentication with AWS Cognito, you need to create a `.env.local` file in the root of this project with the following keys:

```
NEXT_PUBLIC_USER_POOL_ID=your_user_pool_id_here
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_client_id_here
```

1.  **User Pool ID**: Found in the AWS Cognito Console under your User Pool > specific pool > User Pool ID.
2.  **Client ID**: Found under App clients.

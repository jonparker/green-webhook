# Create a webhook that runs code on your laptop via ngrok

1. Create a NextJS app by running `npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/api-routes-starter"`
2. Create `pages/api/user.js` with:

```
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
```

1. In a terminal run `npm run dev`
2. Install Ngrok from [https://ngrok.com/](https://ngrok.com/)
3. In a terminal run `ngrok http 3000`
4. Copy the URL output by Ngrok and add `/api/user` to the end
5. Log in to [https://greenwebhook.netlify.app](https://greenwebhook.netlify.app/) and create a new webhook.
6. Paste the URL from step 6 into the destination.
7. Click Save
8. Click on the `Invocation URI` link to trigger the webhook.
9. Confirm that the response is `200` and contains JSON `{ name: "John Doe" }`

Currently the Carbon Aware SDK only supports a limited list of locations but when more locations are supported then we will be able to allow you to put in the location where your computer or laptop is running in order to determine if it is the location with the lowest carbon intensity.

PartyKit is an open source platform for developing multiplayer, real-time applications.

This is a [PartyKit](https://partykit.io) project using [Next.js](https://nextjs.org/) bootstrapped with [`partykit-nextjs-chat-template`](https://github.com/partykit/partykit-nextjs-chat-template).

There's a live hosted demo of this template at [https://partykit-nextjs-chat-template.vercel.app/](https://partykit-nextjs-chat-template.vercel.app/).

## Getting Started

```bash
npm install
npm run dev
```

This will start the PartyKit development server at port **1999**, and a Next.js development server at port **3000**.

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy

### Deploy the PartyKit Server on PartyKit

When you're ready to deploy your application to the internet, run the following command to deploy the PartyKit Server:

```bash
npx partykit deploy
```

### Deploy the website on Vercel

The easiest way to deploy the Next.js frontend for your PartyKit app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

When you deploy the site to Vercel, remember to add the environment variables from your `.env` file in your Vercel project dashboard. 

The `NEXT_PUBLIC_PARTYKIT_HOST` variable should be set to be the domain of your partykit server, e.g. `https://my-project.my-username.partykit.dev`. The domain name will be displayed when you deploy the PartyKit project.


## Learn More

To learn more about PartyKit, take a look at [PartyKit documentation](https://docs.partykit.io).

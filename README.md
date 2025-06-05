# Itadaki 🍽️

**Itadaki** is a [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) for nutrition tracking. Users can search for foods via the OpenFoodFacts API, scan product barcodes using their device camera, and create their own custom food entries. Personalized macro and calorie goals help guide daily intake. Itadaki is optimized for both desktop and mobile and works offline thanks to service workers.

---

## 🔑 Key Features

- 📦 **Search + Log Foods**: Search by name or barcode using OpenFoodFacts.
- ✍️ **Add Custom Foods**: Store your own ingredients and nutritional data.
- 🎯 **Set Nutrition Goals**: Daily calorie, protein, carb, and fat targets.
- 📷 **Barcode Scanner**: Use your phone’s camera to scan food barcodes.
- 📱 **Installable PWA**: Works offline, fast and responsive on any device.
- 🔐 **Secure Auth**: Register and log in with NextAuth.
- 🗃️ **Local State**: Manage UI state cleanly with Zustand.
- 📖 **UI Components with Storybook**: Isolate and document reusable components.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (SSR, SSG, PWA)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **API**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga)
- **Database**: [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **GraphQL Client**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **UI Components**: [React](https://react.dev) + [Storybook](https://storybook.js.org/)
- **Deployment**: [Docker & Docker Compose](https://www.docker.com/)
- **Data Source**: [OpenFoodFacts API](https://world.openfoodfacts.org/)

---

## 📦 Installation

```bash
git clone https://github.com/tomodutch/itadaki.git
cd itadaki
npm install
```

---

## ⚙️ Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Install github auth provider

1. Go to [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers).
2. Click **"New OAuth App"**.
3. Fill in the following details:
   - **Application name**: `Itadaki` (or any name you like)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Make sure to set Email addresses to read only 
4. After creating the app, copy your **Client ID** and **Client Secret**.
5. Add them to your environment variables:
   ```env
   GITHUB_ID=<your client ID>
   GITHUB_SECRET=<your client secret>
6. Migrate the database ˜npx prisma migrate dev˜
---

## 🧪 Storybook

Itadaki uses **Storybook** for developing UI components in isolation.

To start Storybook:

```bash
npm run storybook
```

View it at [http://localhost:6006](http://localhost:6006)

---

## 🤝 Contributing

Pull requests and contributions are welcome! If you’d like to add a feature, fix a bug, or improve the design:

1. Fork the repo
2. Create a new branch (`feat/my-feature`)
3. Commit your changes
4. Open a pull request

### Code Style

- Use TypeScript throughout
- Prefer functional React components
- Write and maintain stories for reusable components
- Write tests when possible
- Keep GraphQL resolvers typed and documented

## 📄 License

[GNU General Public License v3.0](COPYING)
﻿# 📌 PapeBot - Twitch & Discord Moderation Bot 🎮

Welcome to **PapeBot**, a moderation bot designed exclusively for **PapeSan's Twitch channel**. This bot enables moderators to execute Twitch moderation commands directly from **Discord**, along with other useful functionalities!

---

## 🌟 Features

- 🤖 **Discord & Twitch Integration** – Execute moderation commands on Twitch via Discord
- ❌ **Ban, Unban, Timeout Users** – Manage Twitch chat efficiently
- ⚠️ **Warning System** – Send warnings to users
- 📋 **User Info Lookup** – Get user information and moderation history
- 🎬 **Create Clips** – Capture live stream moments instantly
- 📣 **Auto Announcements** – Schedule chat messages at set intervals
- 🌍 **Timezone Configuration** – Set and manage timezones for the bot

---

## 🛠️ Technologies Used

### Backend (Node.js + Discord.js + Twitch API 🚀)
- **Node.js** – JavaScript runtime
- **Discord.js** – Discord bot framework
- **Twitch API** – Handles Twitch moderation commands
- **dotenv** – Secure environment variable management
- **axios** – API requests management

---

## 📂 Project Structure

```
PapeBot/
│
├── backend/
│   ├── commands/
│   │   ├── announce.js
│   │   ├── ban.js
│   │   ├── clips.js
│   │   ├── heure.js
│   │   ├── timeout.js
│   │   ├── unban.js
│   │   ├── untimeout.js
│   │   ├── user.js
│   │   ├── warn.js
│   │
│   ├── utils/
│   │   ├── banUser.js
│   │   ├── createClip.js
│   │   ├── createEmbed.js
│   │   ├── getModeratorId.js
│   │   ├── getTimezone.js
│   │   ├── getUserIdFromTwitch.js
│   │   ├── sendMessage.js
│   │   ├── setTimezone.js
│   │   ├── timeoutUser.js
│   │   ├── unbanUser.js
│   │   ├── warnUser.js
│   │
│   ├── bot.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Project

```sh
git clone https://github.com/notelyoo/PapeBot.git
cd PapeBot
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
DISCORD_TOKEN=your-discord-bot-token
TWITCH_CHANNEL=your-twitch-channel
TWITCH_BOT_USERNAME=your-twitch-bot-username
TWITCH_OAUTH_TOKEN=your-twitch-oauth-token
TWITCH_CLIENT_ID=your-twitch-client-id
TWITCH_CLIENT_SECRET=your-twitch-client-secret
```

️ **Important:** Never commit this `.env` file to GitHub!  
You can use [Twitch Token Generator](https://twitchtokengenerator.com/) to create your token and choose your scopes.

### 4️⃣ Run the Bot

```sh
node bot.js
```

The bot is now running and ready to interact with Twitch and Discord!

---

## 🎮 Command List

| Command | Description |
|----------|------------|
| `/ban <user> <reason>` | Permanently bans a user from Twitch chat. A default reason is applied if none is provided. |
| `/unban <user>` | Unbans a user and allows them to rejoin the chat. |
| `/timeout <user> <time> <reason>` | Temporarily mutes a user for a specified duration. |
| `/untimeout <user>` | Lifts a timeout and allows the user to chat again. |
| `/warn <user> <message>` | Sends an anonymous warning to a user. |

### 🎮 Utilities

| Command | Description |
|----------|------------|
| `/user <user>` | Displays a user’s profile, including chat history and moderation actions. |
| `/annonce <message> <interval>` | Schedules an announcement in Twitch chat. |
| `/clips` | Creates and saves a Twitch clip from the live stream. |
| `/heure <timezone>` | Sets the bot's timezone (e.g., Europe/Paris). |

---

## 📣 Contributing

Contributions are welcome! If you wish to contribute to PapeBot, feel free to fork the project, create a branch, and submit a pull request. All code contributions must comply with the AGPLv3 license.

---

## 📜 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPLv3)**.  
You are free to **use**, **share**, and **modify** this code, as long as your modified version is also published under the same license — including when running it on a public server.  
See the full [`LICENSE`](./LICENSE) file for detailed terms.

For questions or permissions beyond the license scope, contact: **contact@miyeon.fr**

---

## 💬 Contact

- 📧 Email: contact@miyeon.fr  
- 🕊️ Twitter: [@NotElyoo](https://twitter.com/NotElyoo)  
- 📷 Twitch: [@NotElyoo](https://twitch.tv/NotElyoo)  

- 📷 Twitch (channel): [@PapeSan](https://twitch.tv/PapeSan)  

---

## 🎮 Thank you for checking out PapeBot! 💜

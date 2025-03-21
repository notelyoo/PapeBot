# 📌 PapeBot - Twitch & Discord Moderation Bot 🎮

Welcome to **PapeBot**, a moderation bot designed exclusively for **PapeSan's Twitch channel**. This bot enables moderators to execute Twitch moderation commands directly from **Discord**, along with other useful functionalities!

---

## 🌟 Features

- 🤖 **Discord & Twitch Integration** – Execute moderation commands on Twitch via Discord
- 🚫 **Ban, Unban, Timeout Users** – Manage Twitch chat efficiently
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
│   │   ├── announce.js  → Manages scheduled Twitch chat announcements
│   │   ├── ban.js  → Bans a user from Twitch chat
│   │   ├── clips.js  → Creates Twitch clips
│   │   ├── heure.js  → Sets the bot's timezone
│   │   ├── timeout.js  → Places a user in timeout
│   │   ├── unban.js  → Unbans a user from Twitch chat
│   │   ├── untimeout.js  → Removes a user's timeout
│   │   ├── user.js  → Fetches Twitch user details
│   │   ├── warn.js  → Issues a warning to a user
│   │
│   ├── utils/
│   │   ├── banUser.js  → Handles banning logic
│   │   ├── createClip.js  → Handles Twitch clip creation
│   │   ├── createEmbed.js  → Formats messages for Discord
│   │   ├── getModeratorId.js  → Fetches moderator ID from Twitch
│   │   ├── getTimezone.js  → Retrieves bot timezone
│   │   ├── getUserIdFromTwitch.js  → Gets a user ID from Twitch
│   │   ├── sendMessage.js  → Sends messages to Twitch chat
│   │   ├── setTimezone.js  → Sets a new timezone
│   │   ├── timeoutUser.js  → Handles timeout logic
│   │   ├── unbanUser.js  → Unbans a user
│   │   ├── warnUser.js  → Manages user warnings
│   │
│   ├── bot.js  → Main bot entry point
│   ├── .env  → Environment variables (not shared on GitHub)
│   ├── .gitignore  → Files to ignore in Git
│   ├── package.json  → Project dependencies
│   ├── README.md  → This file!
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Project

```sh
git clone git@github.com/notelyoo/PapeBot.git
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

⚠ **Important:** Never commit this `.env` file to GitHub!  
You can use [Twitch Token Generator](https://twitchtokengenerator.com/) to create your token et choose your scopes

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
| `/timeout <user> <time> <reason>` | Temporarily mutes a user for a specified duration (1 to 1,209,600 seconds). |
| `/untimeout <user>` | Lifts a timeout and allows the user to chat again. |
| `/warn <user> <message>` | Sends an anonymous warning to a user. A default message is used if none is provided. |

### 🎮 Utilities

| Command | Description |
|----------|------------|
| `/user <user>` | Displays a user’s profile, including chat history and moderation actions. |
| `/annonce <message> <interval>` | Schedules an announcement in Twitch chat at a specified interval. |
| `/clips` | Creates and saves a Twitch clip from the live stream. |
| `/heure <timezone>` | Sets the bot's timezone (e.g., Europe/Paris). |

---

## 📢 Contributing

🎉 Want to improve the project?

1. Fork the project
2. Create a new branch (`git checkout -b my-feature`)
3. Make your changes and commit (`git commit -m "Added a new feature"`)
4. Push to your branch (`git push origin my-feature`)
5. Submit a pull request 🚀

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💬 Contact

📧 Email: contact@miyeon.fr  
🐦 Twitter: [@NotElyoo](https://twitter.com/NotElyoo)  
📷 Twitch: [@NotElyoo](https://twitch.tv/NotElyoo)  
📷 Twitch: [@PapeSan](https://twitch.tv/PapeSan)  

---

## 🎮 Thank you for using PapeBot! 💜

Feel free to contribute, suggest improvements, or reach out for any questions! 🚀

---

## 📌 Future Improvements (Ideas 💡)

✅ Add a search feature for moderation history  
✅ Implement logging for moderation actions  
✅ Multi-language support  
✅ Enhance security with OAuth token refresh  


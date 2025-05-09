# 📌 PapeBot - Twitch & Discord Moderation Bot 🎮

Welcome to **PapeBot**, a smart moderation bot designed exclusively for **PapeSan's Twitch channel**, with seamless integration between **Discord** and **Twitch**.  
It empowers moderators to manage Twitch chat directly from Discord, trigger automated announcements, and much more!

---

## 🌟 Features

- 🤖 **Discord & Twitch Integration** — Manage Twitch from Discord
- ❌ **Ban, Unban, Timeout, Warn** — Full moderation control from Discord
- ⚠️ **Warning System** — Send alerts to users with `/warn`
- 📋 **User Lookup** — View Twitch user info, status, moderation buttons
- 🎬 **Create Clips** — Capture live moments instantly
- 🔔 **Auto Announcements** — Periodic Twitch messages only when live
- 🌐 **Timezone Setup** — Set local time for Twitch chat
- 📢 **Live Detection** — Sends Discord + Twitch alert when stream starts
- 🔃 **Dynamic Config** — `/config` to change announcement channel
- 📣 **Message Command** — Send a Twitch chat message via official API
- 🛡️ **Blacklist System** — Auto timeout users every 14 days with `/blacklist`
- 🗑️ **Unblacklist Command** — Remove users from auto timeout with `/unblacklist`
- 📜 **List Blacklisted Users** — See all users currently blacklisted with `/liste-blacklist`
- 💬 **Twitch Custom Commands** — Manage custom chat commands directly from Discord

---

## 🛠️ Technologies Used

- **Node.js** — JavaScript backend runtime
- **Discord.js** — Discord bot framework
- **Twitch Helix API** — Official Twitch integration
- **dotenv** — Manage secrets and tokens securely
- **axios** — Handle all API requests
- **tmi.js** — Twitch IRC client (legacy support)
- **moment-timezone** — Handle timezones and formatting

---

## 📂 Project Structure

```
PapeBot/
├── commands/         # Slash commands (ban, timeout, warn, user, blacklist, etc.)
│   ├── announce.js
│   ├── ban.js
│   ├── blacklist.js
│   ├── clips.js
│   ├── config.js
│   ├── heure.js
│   ├── listAnnouncements.js
│   ├── listBlacklist.js
│   ├── listCommands.js
│   ├── message.js
│   ├── timeout.js
│   ├── unban.js
│   ├── unblacklist.js
│   ├── untimeout.js
│   ├── user.js
│   ├── warn.js
├── utils/            # Utility functions (Twitch & Discord integration)
│   ├── banUser.js
│   ├── blacklistManager.js
│   ├── createClip.js
│   ├── createEmbed.js
│   ├── customCommands.js
│   ├── getModeratorId.js
│   ├── getTimezone.js
│   ├── getUserIdFromTwitch.js
│   ├── liveWatcher.js
│   ├── sendChatMessage.js
│   ├── sendMessage.js
│   ├── setTimezone.js
│   ├── timeoutUser.js
│   ├── unbanUser.js
│   ├── warnUser.js
├── blacklistedUsers.json # Stores blacklisted users and their timers
├── customCommands.json # Stores customs commands
├── userTimezones.json     # Stores timezone info
├── config.json            # Discord announce channel config
├── .env                   # Environment variables (not committed)
├── bot.js                 # Main bot entry point
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Project
```bash
git clone https://github.com/notelyoo/PapeBot.git
cd PapeBot
```

### 2️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Configure `.env`
```env
DISCORD_TOKEN=your-discord-bot-token
TWITCH_CHANNEL=your-twitch-channel
TWITCH_BOT_USERNAME=your-twitch-bot-account
TWITCH_OAUTH_TOKEN=your-user-access-token-with-scopes
TWITCH_CLIENT_ID=your-client-id
TWITCH_CLIENT_SECRET=your-client-secret
```
> Required Twitch scopes: `user:write:chat`, `clips:edit`, `moderator:manage:banned_users`
You can use [Twitch Token Generator](https://twitchtokengenerator.com/) to create your token and choose your scopes.

### 4️⃣ Run the Bot
```bash
node bot.js
```

---

## 🎮 Command List

### 🔨 Moderation
| Command | Description |
|:--------|:------------|
| `/ban <user> <reason>` | Ban a Twitch user permanently |
| `/unban <user>` | Unban a previously banned user |
| `/timeout <user> <duration> <reason>` | Timeout user in seconds |
| `/untimeout <user>` | Lift an active timeout |
| `/warn <user> <message>` | Send a warning message |
| `/blacklist <pseudo>` | Blacklist a user (auto timeout every 14 days) |
| `/unblacklist <pseudo>` | Remove a user from the blacklist |

### 💡 Utilities
| Command | Description |
|:--------|:------------|
| `/user <pseudo>` | Show Twitch user profile & mod actions |
| `/clips` | Create a Twitch clip (live only) |
| `/heure <timezone>` | Set the bot's timezone (e.g., Europe/Paris) |
| `/config channel` | Set the Discord channel for live announcements |
| `/liste` | View and stop periodic announcements |
| `/liste-commandes` | View all custom Twitch chat commands |
| `/liste-blacklist` | View blacklisted users |
| `/annonce <message> <interval>` | Schedule a periodic message if live |
| `/message <message>` | Send one message in Twitch chat via API |

---

## 📢 Live Detection
- PapeBot checks Twitch live status every 30 seconds.
- When the live starts:
  - ✉️ Embed sent in the configured Discord channel.
  - 💬 Message in Twitch chat: "Le live vient de commencer. Bienvenue à tous !"
- When the live ends:
  - 🔴 Message: "Le live est terminé. Merci d'avoir été présents 💜"
  - All periodic announcements are paused automatically.

---

## 🔔 Contributing
Contributions are welcome!  
Feel free to fork the project, create a branch, and submit a pull request.  
All contributions must comply with the **AGPLv3 license**.

---

## 📄 License
Licensed under **GNU AGPLv3** — free to use, modify, and share publicly under the same license.  
See [`LICENSE`](./LICENSE) for full details.

---

## 💬 Contact
- 📧 Email: contact@miyeon.fr
- 🕊️ Twitter: [@NotElyoo](https://twitter.com/NotElyoo)
- 📺 Twitch Bot: [@NotElyoo](https://twitch.tv/NotElyoo)
- 📺 Twitch Channel: [@PapeSan](https://twitch.tv/PapeSan)

---

# 🎮 Thanks for checking out **PapeBot**! 💜
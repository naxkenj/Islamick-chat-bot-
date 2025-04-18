// ========== File: modules/commands/pp.js ========== const axios = require("axios"); const fs = require("fs-extra");

module.exports.config = { name: "pp", version: "1.0.0", hasPermssion: 0, credits: "Modified by Kenji", description: "Get profile picture, group photo or cover photo", commandCategory: "utility", usages: "[reply/@mention/box]", cooldowns: 5, };

module.exports.run = async function ({ api, event, args }) { const { threadID, messageID, senderID, messageReply, mentions } = event;

let uid;

if (args[0] === "box") { const threadInfo = await api.getThreadInfo(threadID); if (!threadInfo.imageSrc) return api.sendMessage("This group doesn't have a group photo set!", threadID, messageID); return api.sendMessage({ body: "Group profile picture:", attachment: await global.utils.getStreamFromURL(threadInfo.imageSrc) }, threadID, messageID); }

if (mentions && Object.keys(mentions).length > 0) { uid = Object.keys(mentions)[0]; } else if (messageReply) { uid = messageReply.senderID; } else { uid = senderID; }

const userInfo = await api.getUserInfo(uid); const name = userInfo[uid].name || "User"; const profileUrl = https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32;

return api.sendMessage({ body: ${name}'s profile picture:, attachment: await global.utils.getStreamFromURL(profileUrl) }, threadID, messageID); };

// ========== File: modules/commands/cover.js ========== const axios = require("axios"); const fs = require("fs-extra");

module.exports.config = { name: "cover", version: "1.0.0", hasPermssion: 0, credits: "Modified by Kenji", description: "Get user Facebook cover photo (if public)", commandCategory: "utility", usages: "[reply/@mention]", cooldowns: 5, };

module.exports.run = async function ({ api, event, args }) { const { threadID, messageID, senderID, messageReply, mentions } = event;

let uid;

if (mentions && Object.keys(mentions).length > 0) { uid = Object.keys(mentions)[0]; } else if (messageReply) { uid = messageReply.senderID; } else { uid = senderID; }

try { const res = await axios.get(https://graph.facebook.com/${uid}?fields=cover&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32); const coverUrl = res.data.cover?.source;

if (!coverUrl) return api.sendMessage("Sorry, cover photo not found or it's private.", threadID, messageID);

return api.sendMessage({
  body: "Here is the cover photo:",
  attachment: await global.utils.getStreamFromURL(coverUrl)
}, threadID, messageID);

} catch (e) { return api.sendMessage("Something went wrong while fetching the cover photo!", threadID, messageID); } };

                        

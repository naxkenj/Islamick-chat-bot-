const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");
const moment = require("moment-timezone");

module.exports.config = {
  name: "botinfo",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐖𝐞𝐫𝐢𝐝 𝐤𝐞𝐧𝐣𝐢",
  description: "𝘽𝙊𝙏 𝙄𝙉𝙁𝙊",
  commandCategory: "system",
  cooldowns: 1,
  dependencies: {
    request: "",
    "fs-extra": "",
    axios: ""
  }
};

module.exports.run = async function({ api, event, Threads }) {
  const botUptime = process.uptime();
  const hours = Math.floor(botUptime / 3600);
  const minutes = Math.floor((botUptime % 3600) / 60);
  const seconds = Math.floor(botUptime % 60);

  const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』»»【HH:mm:ss】");

  const imgUrl = "https://i.imgur.com/gSW285Z.gif";
  const imgPath = __dirname + "/cache/wa1.jpg";

  // get current group name
  let threadInfo = await Threads.getData(event.threadID);
  let groupName = threadInfo.threadName || "This Group";

  const msg = `
╭──────•◈•───────╮
𝘼𝙈𝙀☄️ »» 𝙗𝙤𝙩 𝙞𝙣𝙛𝙤
╰──────•◈•───────╯

⚡𝘽𝙊𝙏 𝙄𝙎 𝙍𝙐𝙉𝙉𝙄𝙉𝙂⚡

☄️𝘽𝙊𝙏𝙉𝘼𝙈𝙀: ${global.config.BOTNAME}
🌸𝙋𝙍𝙀𝙁𝙄𝙓🌸: ${global.config.PREFIX}
𝙈𝙀🥳

𝑮𝑹𝑶𝑼𝑷: ${groupName}
𝑫𝑨𝑻𝑬 𝑨𝑵𝑫 𝑻𝑰𝑴𝑬  
${currentTime}

🕛 BOT UPTIME: ${hours}:${minutes}:${seconds}
🕧 BOT OWNER: 𝐖𝐞𝐫𝐢𝐝 𝐤𝐞𝐧𝐣𝐢
`;

  const getImg = () => {
    axios.get(encodeURI(imgUrl), { responseType: 'stream' })
      .then(response => {
        response.data.pipe(fs.createWriteStream(imgPath))
          .on("close", () => {
            api.sendMessage({
              body: msg,
              attachment: fs.createReadStream(imgPath)
            }, event.threadID, () => fs.unlinkSync(imgPath));
          });
      });
  };

  getImg();
};

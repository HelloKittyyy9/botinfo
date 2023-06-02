const { Telegraf } = require("telegraf");
const { DateTime } = require("luxon");

const bot = new Telegraf("");

let users = [
  {
    name: "Vlad",
    userid: 1974806285,
    status: "Болею",
    time: "Нет данных",
  },
  {
    name: "Andrew",
    userid: 1974804285,
    status: "Болею",
    time: "Нет данных",
  },
];
const newId = DateTime.now()
.setZone("UTC+7")

bot.start((ctx) => ctx.reply("Hello, commands:\n /start \n /status \n /info"));

bot.command("status", (ctx) => {
  let id = ctx.from.id;

  if (users.find((item) => item.userid == id)) {
    ctx.reply("Выберите причину отсутствия", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Опаздываю", callback_data: "opaz" },
            { text: "Справка", callback_data: "sprav" },
            { text: "Заболел", callback_data: "boleu" },
          ],
        ],
      },
    });
  } else {
    ctx.reply("You are not registered. Write your name");

    bot.on("message", async (ctx) => {
      let usernik = await ctx.message.text;
      await users.push({
        name: usernik,
        userid: id,
        status: "null",
      });
    });
  }
  console.log(newId)
});

bot.action("opaz", (ctx) => {
  let id = ctx.from.id;
  const dt = DateTime.now()
    .setZone("UTC+7")
    .toLocaleString(DateTime.DATETIME_MED);
  const newUsers = users.find((item) => item.userid == id);
  newUsers.status = "Опаздываю";
  newUsers.time = dt;
  let indexsmall = users.findIndex((users) => users.userid == id);
  users.splice(indexsmall, 1);
  users.unshift(newUsers);

  ctx.reply("Status updated on " + newUsers.status + "\n" + dt);
});

bot.action("sprav", (ctx) => {
  let id = ctx.from.id;
  const dt = DateTime.now()
    .setZone("UTC+7")
    .toLocaleString(DateTime.DATETIME_MED);
  const newUsers = users.find((item) => item.userid == id);
  newUsers.status = "Справка";
  newUsers.time = dt;
  let indexsmall = users.findIndex((users) => users.userid == id);
  users.splice(indexsmall, 1);
  users.unshift(newUsers);
  ctx.reply("Status updated on " + newUsers.status);

  ctx.reply("Status updated on " + newUsers.status + "\n" + dt);
});

bot.action("boleu", (ctx) => {
  let id = ctx.from.id;
  const dt = DateTime.now()
    .setZone("UTC+7")
    .toLocaleString(DateTime.DATETIME_MED);
  const newUsers = users.find((item) => item.userid == id);
  newUsers.status = "Заболел";
  newUsers.time = dt;
  let indexsmall = users.findIndex((users) => users.userid == id);
  users.splice(indexsmall, 1);
  users.unshift(newUsers);

  ctx.reply("Status updated on " + newUsers.status);

  ctx.reply("Status updated on " + newUsers.status + "\n" + dt);
});

bot.command("info", (ctx) => {
  const dt = DateTime.now().setZone("UTC+7");
  const timeFunc = (time) => {
    if (time.day == dt.day) {
      return time;
    } else {
      return dt.toLocaleString(DateTime.DATETIME_MED);
    }
  };

  const neww = users.map(
    (item) => `\n${item.name} Статус: ${item.status} Время: ${item.time}`
  );
  ctx.reply(`${neww}`);
  console.log(newId)
});

bot.launch();

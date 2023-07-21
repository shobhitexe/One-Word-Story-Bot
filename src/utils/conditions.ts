import { Message } from "discord.js";

export const noSpace = (msg: Message) => {
  msg.delete();
  msg.channel
    .send("Dont use space")
    .then((warnMsg) => setTimeout(() => warnMsg.delete(), 2000));
};

export const useSmallWords = (msg: Message) => {
  msg.delete();
  msg.channel
    .send("Use Small words")
    .then((warnMsg) => setTimeout(() => warnMsg.delete(), 2000));
};

export const minimumTwoWords = (msg: Message) => {
  msg.delete();
  msg.channel
    .send("Your letter should be of minimum 2 words")
    .then((warnMsg) => setTimeout(() => warnMsg.delete(), 2000));
};

export const onlyOneWord = (msg: Message) => {
  msg.delete();
  msg.channel
    .send("Its a one word story ,write only one word!")
    .then((warnMsg) => setTimeout(() => warnMsg.delete(), 2000));
};

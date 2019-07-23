import { CallDirection, CallEvent, Config } from "@clinq/bridge";
import { IncomingWebhook } from "@slack/webhook";
import { parsePhoneNumber } from "./utils";

export const handleCallEvent = async ({ apiUrl }: Config, event: CallEvent) => {
  const { channel, user, from, to, direction } = event;
  const contact = parsePhoneNumber(direction === CallDirection.IN ? from : to);

  const webhook = new IncomingWebhook(apiUrl);

  await webhook.send({
    text: `${direction === CallDirection.IN ? ":calling:" : ":iphone:"} New ${
      direction === CallDirection.IN ? "incoming" : "outgoing"
    } call from CLINQ`,
    username: "CLINQ Bot",
    icon_url: "https://www.clinq.app/slack_bot_icon.png",
    attachments: [
      {
        author_name: channel.name,
        author_link: `https://www.clinq.app/channel/${channel.id}`,
        fields: [
          {
            title:
              direction === CallDirection.IN
                ? "Caller's phone number"
                : "Dialed phone number",
            value: contact,
            short: true
          },
          {
            title: "CLINQ User",
            value: `${user.firstName} ${user.lastName}`,
            short: true
          }
        ],
        color: "#00cea6",
        footer: "CLINQ Bot",
        footer_icon: "https://www.clinq.app/slack_bot_icon.png",
        ts: String(event.start / 1000)
      }
    ]
  });
};

export const handleConnectedEvent = async ({ apiUrl }: Config) => {
  const webhook = new IncomingWebhook(apiUrl);

  await webhook.send({
    text: "CLINQ integration successfully added :ok_hand::tada:",
    username: "CLINQ Bot",
    icon_url: "https://www.clinq.app/slack_bot_icon.png",
    attachments: [
      {
        color: "#00cea6",
        footer: "CLINQ Bot",
        footer_icon: "https://www.clinq.app/slack_bot_icon.png",
        ts: String(Date.now() / 1000)
      }
    ]
  });
};

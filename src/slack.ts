import { CallDirection, CallEvent, Config } from "@clinq/bridge";
import { IncomingWebhook } from "@slack/webhook";
import { parsePhoneNumber } from "./utils";

export const handleCallEvent = async ({ apiUrl }: Config, event: CallEvent) => {
  const { channel, user, from, to, direction } = event;
  const contact = parsePhoneNumber(direction === CallDirection.IN ? from : to);

  const webhook = new IncomingWebhook(apiUrl);

  await webhook.send({
    text: `${
      direction === CallDirection.IN ? ":calling:" : ":iphone:"
    } Neuer ${
      direction === CallDirection.IN ? "eingehender" : "ausgehender"
    } Anruf in CLINQ`,
    username: "CLINQ Bot",
    icon_url: "https://www.clinq.app/icon.png",
    attachments: [
      {
        author_name: channel.name,
        author_link: `https://www.clinq.app/channel/${channel.id}`,
        fields: [
          {
            title:
              direction === CallDirection.IN
                ? "Rufnummer des Anrufers"
                : "Gewählte Rufnummer",
            value: contact,
            short: true
          },
          {
            title: "CLINQ Benutzer",
            value: `${user.firstName} ${user.lastName}`,
            short: true
          },
        ],
        color: "#00cea6",
        footer: "CLINQ Bot",
        footer_icon: "https://www.clinq.app/icon.png",
        ts: String(event.start / 1000)
      }
    ]
  });
};

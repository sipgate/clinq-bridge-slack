import { Adapter, CallEvent, Config, start } from "@clinq/bridge";
import { handleCallEvent } from "./slack";

class SlackAdapter implements Adapter {
  public async getContacts(

  ) {
    return [];
  }
  public async handleCallEvent(
    config: Config,
    event: CallEvent
  ): Promise<void> {
    return handleCallEvent(config, event);
  }
}

start(new SlackAdapter());

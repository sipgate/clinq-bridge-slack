import { Adapter, CallEvent, Config, start } from "@clinq/bridge";
import { handleCallEvent, handleConnectedEvent } from "./slack";

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
  public async handleConnectedEvent(
      config: Config,
  ): Promise<void> {
    return handleConnectedEvent(config);
  }
}

start(new SlackAdapter());

export class WebSocketListener<T, P> {
  readonly eventType: T;
  readonly onChange: P;

  constructor(eventType: T, onChange: P) {
    this.eventType = eventType;
    this.onChange = onChange;
  }

  private initialised: boolean = false;

  initialise = async() => {
    if (this.initialised) return;

    this.initialised = true;
  };

  reset = () => {
    this.initialised = false;
  };
}

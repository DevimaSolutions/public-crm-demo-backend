export default class ClientError extends Error {
  constructor(
    public message: string,
    public status = 400,
    public payload: object | null = null,
  ) {
    super();
  }
}

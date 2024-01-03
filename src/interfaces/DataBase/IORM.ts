export default interface IORM {
  connect(url: string, options?: object | undefined): Promise<any>;
}
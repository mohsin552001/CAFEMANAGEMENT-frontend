export class GlobalContants {
  static passwordRegex(passwordRegex: any): any {
    throw new Error('Method not implemented.');
  }
  public static genericError: string =
    'Something went wrong . Please try again later';
  public static unauthorized: string =
    'you are not authorized person to access this page';
  public static nameRegex: string = '[a-zA-Z0-9]*';

  public static emailRegex: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+//.[a-z]{2,3}';

  // @ts-ignore
  public static contactNumberRegex: string = '';

  public static error: string = 'error';
}

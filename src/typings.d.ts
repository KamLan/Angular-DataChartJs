/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module "json!*" {
  let json: any;
  export = json;
}

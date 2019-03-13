import { SPHttpClient } from "@microsoft/sp-http";

export interface IReactWebPartDemoProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}

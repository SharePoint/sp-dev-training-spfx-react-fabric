// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { SPHttpClient } from "@microsoft/sp-http";

export interface IReactWebPartDemoProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}

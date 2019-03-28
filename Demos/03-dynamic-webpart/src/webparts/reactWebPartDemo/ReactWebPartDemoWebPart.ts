import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactWebPartDemoWebPartStrings';
import ReactWebPartDemo from './components/ReactWebPartDemo';
import { IReactWebPartDemoProps } from './components/IReactWebPartDemoProps';

import { IColor } from './IColor';

export interface IReactWebPartDemoWebPartProps {
  description: string;
}

export default class ReactWebPartDemoWebPart extends BaseClientSideWebPart<IReactWebPartDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactWebPartDemoProps > = React.createElement(
      ReactWebPartDemo,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        currentSiteUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

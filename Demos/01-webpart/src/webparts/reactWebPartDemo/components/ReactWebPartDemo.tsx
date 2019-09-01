// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from './ReactWebPartDemo.module.scss';
import { IReactWebPartDemoProps } from './IReactWebPartDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IColor } from "../IColor";
import { ColorList, IColorListProps } from "./ColorList";

export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, {}> {
  private _colors: IColor[] = [
    { id: 1, title: 'red' },
    { id: 2, title: 'blue' },
    { id: 3, title: 'green' }
  ];
  
  public render(): React.ReactElement<IReactWebPartDemoProps> {
    return (
      <div className={ styles.reactWebPartDemo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint + React!</span>
              <ColorList colors={this._colors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

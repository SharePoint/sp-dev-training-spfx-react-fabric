// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { IColor } from '../IColor';

export interface IColorListProps {
    colors: IColor[];
}

export class ColorList extends React.Component<IColorListProps, {}> {
    public render(): React.ReactElement<IColorListProps> {
        return (
            <ul>
                {
                    this.props.colors.map(colorItem => (
                        <li>{colorItem.title}</li>
                    ))
                }
            </ul>
        );
    }
}
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import { IColor } from '../IColor';

import { List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export type RemoveColorCallback = (color: IColor) => void;

export interface IColorListProps {
    colors: IColor[];
    onRemoveColor: RemoveColorCallback;
}

export class ColorList extends React.Component<IColorListProps, {}> {
    public render(): React.ReactElement<IColorListProps> {
        return (
            <div>
                <List items={this.props.colors}
                    onRenderCell={this._onRenderListCell}
                />
            </div>
        );
    }

    private _onRenderListCell = (color: IColor, index: number | undefined): JSX.Element => {
        return (
            <div>
                {color.title}<br />
                <DefaultButton text="delete"
                    data={color.id}
                    onClick={() => this._onButtonClick(color)}
                />
            </div>
        );
    }

    private _onButtonClick(color: IColor): void {
        this.props.onRemoveColor(color);
    }
}
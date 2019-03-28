import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

import { IColor } from '../IColor';

export type RemoveColorCallback = (color: IColor) => void;
export interface IColorListProps {
  colors: IColor[];
  onRemoveColor: RemoveColorCallback;
}

export class ColorList extends React.Component<IColorListProps, {}> {
  public render(): React.ReactElement<IColorListProps> {
    return (
      <div>
        <List items={ this.props.colors } 
              onRenderCell={ this._onRenderListCell } 
        />
      </div>
    );
  }

  private _onRenderListCell = (color: IColor, index: number | undefined): JSX.Element => {
    return (
      <div>
        { color.title }<br />
        <DefaultButton text="delete"
                       data={ color.id }
                       onClick={ () => this._onButtonClick(color) }
        />
      </div>
    );
  }

  private _onButtonClick(color:IColor): void {
    this.props.onRemoveColor(color);
  }

}

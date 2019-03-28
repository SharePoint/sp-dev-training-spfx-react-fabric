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
            <li>{ colorItem.title }</li>
          ))
        }
      </ul>
    );
  }
}

## Dynamic React Components

In this demo, you will update the existing React-based SPFx web part to make it more dynamic by introducing state and data driven from a SharePoint list.

> This project uses the final project from the previous demo as the starting point. A copy of the final project from the previous demo can be found in the **./Demos/02-fabricreact** folder.

1. Create a new SharePoint list within an existing SharePoint site collection. In this lab, it is assumed the list is named **Colors** and has a single **Title** field. Populate this list with some colors as shown in the following figure:

    ![Screenshot of Colors SharePoint list](../../Images/ex03-newList.png)

1. Update the SharePoint Framework web part to provide additional inputs to the React component:
    1. Open the **./src/webparts/reactWebPartDemo/ReactWebPartDemoWebPart.ts** file.
    1. Locate the `render()` method, and update the code that creates an instance of the React element. This code will add two additional properties to the React web part: `spHttpClient` & `currentSiteUrl`.

        ```tsx
        const element: React.ReactElement<IReactWebPartDemoProps > = React.createElement(
          ReactWebPartDemo,
          {
            description: this.properties.description,
            spHttpClient: this.context.spHttpClient,
            currentSiteUrl: this.context.pageContext.web.absoluteUrl
          }
        );
        ```

1. Update the React component's public properties by updating it's interface:
    1. Open the **./src/webparts/reactWebpartDemo/components/IReactWebPartDemoProps.ts**.
    1. Add the following `import` statement to the top of the file:

        ```ts
        import { SPHttpClient } from "@microsoft/sp-http";
        ```

    1. Update the **IReactWebPartDemoProps** interface to add the two new public properties to the component:

        ```ts
        export interface IReactWebPartDemoProps {
          description: string;
          spHttpClient: SPHttpClient;
          currentSiteUrl: string;
        }
        ```

1. Add a new interface to represent the component's state.
    1. Create a new file **IReactWebPartDemoState.ts** in the folder **./src/webparts/reactWebPartDemo/components**.
    1. Add the following code to the file:

        ```ts
        import { IColor } from '../IColor';

        export interface IReactWebPartDemoState {
          colors: IColor[];
        }
        ```

1. Update the **ColorList** React component.
    1. Locate and open the file **./src/webparts/reactWebPartDemo/components/ColorList.tsx**.
    1. Add the following type to the file, after the existing `import` statements. This will define a new callback type that will represent a new event exposed by this component:

        ```ts
        export type RemoveColorCallback = (color: IColor) => void;
        ```

    1. Add a new event as a public property to the component by updating the existing **IColorListProps** interface. Add the following code to the interface:

        ```ts
        onRemoveColor: RemoveColorCallback;
        ```

    1. Locate the existing `_onButtonClick` method. Currently this method just writes to the browser's JavaScript console. Change the contents to raise the new public event, passing in the color that the button represented:

        ```ts
        private _onButtonClick(color:IColor): void {
          this.props.onRemoveColor(color);
        }
        ```

1. Update the **ReactWebPartDemo** React component:
    1. Locate and open the file **./src/webparts/reactWebPartDemo/components/ReactWebPartDemo.tsx**.
    1. Add the following `import` statements to the top of the file:

        ```ts
        import { IReactWebPartDemoState } from './IReactWebPartDemoState';
        import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
        ```

    1. Update the React component to define it's state interface.
        1. Locate the class definition for the **ReactWebPartDemo**. Notice the end of the line contains a `{}` as the second parameter for the `React.Component` base class:

            ```ts
            export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, {}> {
            ```

            This second parameter is how you define the interface for the state of the component. Update this to use the new interface you previously created: `IReactWebPartDemoState`.

            ```ts
            export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, IReactWebPartDemoState> {
            ```

    1. Initialize the state of the component by defining a constructor that sets the default component state:

        ```ts
        constructor(props: IReactWebPartDemoProps) {
          super(props);
          this.state = { colors: [] };
        }
        ```

    1. Add the following method ot the **ReactWebPartDemo** class. This will retrieve an array of items from the previously created SharePoint list using the SharePoint REST API:

        ```ts
        private getColorsFromSpList(): Promise<IColor[]> {
          return new Promise<IColor[]>((resolve, reject) => {
            const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('Colors')/items?$select=Id,Title`;
            this.props.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
              .then((response: SPHttpClientResponse) => {
                return response.json();
              })
              .then((jsonResponse: any) => {
                let spListItemColors: IColor[] = [];
                for (let index = 0; index < jsonResponse.value.length; index++) {
                  spListItemColors.push({
                    id: jsonResponse.value[index].Id,
                    title: jsonResponse.value[index].Title
                  });

                  resolve(spListItemColors);
                }
              });
          });
        }
        ```

    1. Update the React component's lifecycle by retrieving data from the SharePoint list and setting the component's state when the component is loaded on the page. Setting the state will trigger React to re-render the component, displaying the retrieved data.
        1. Add the following method to the **ReactWebPartDemo** class:

            ```ts
            public componentDidMount(): void {
              this.getColorsFromSpList()
                .then((spListItemColors: IColor[]) => {
                  this.setState({ colors: spListItemColors });
                });
            }
            ```

    1. Update the `render()` method in the **ReactWebPartDemo** to do two things: first, change the binding to instead of using the static collection of colors, use the colors from the new state object that is updated by the lifecycle event `componentDidMount()` and then, attach to an event on the custom component created previously. 

        When this event occurs (something you will implement later in this demo), it will run our handler. Do this by updating the `<ColorList>` control reference in the `render()` method:

        ```tsx
        <ColorList colors={ this.state.colors }
                    onRemoveColor={ this._removeColor }/>
        ```

    1. Add the following method ot the **ReactWebPartDemo** class to implement the event handler. This will create a new collection of colors that include all the original colors, except the one included in the `onRemoveColor` callback:

        ```ts
        private _removeColor = (colorToRemove: IColor): void => {
          const newColors = this.state.colors.filter(color => color != colorToRemove);
          this.setState({ colors: newColors });
        }
        ```

1. Test the project:
    1. Start the local web server using the provided gulp **serve** task:

        ```shell
        gulp serve
        ```

    1. The browser will load the local workbench, but you can not use this for testing because there is no SharePoint context in the local workbench. Instead, navigate to the SharePoint Online site where you created the **Colors** list, and load the hosted workbench at **https://[sharepoint-online-site]/_layouts/workbench.aspx**.

    1. Add the web part to the workbench. Notice our list of three colors is rendered up exactly as we would expect.

        ![Screenshot of running React web part](../../Images/ex02-testing-01.png)

    1. Select the **delete** button for one of the colors. Notice the color is removed from the list.

        That is because selecting the button raised an event on the **ColorList** component. The **ReactWebPartDemo** component handles this event by removing the color from the existing collection of colors in the current state and then sets this new collection on the state.

        That action triggers React to re-render the component which results in a list of colors missing the one that was removed.

    1. Close the browser and stop the local web server by pressing <kbd>CTRL</kbd>+<kbd>C</kbd> in the command prompt.
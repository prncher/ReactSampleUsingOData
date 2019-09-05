import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets, createTheme } from 'office-ui-fabric-react/lib/Styling';
import { Product } from '../Models/product';
import { ProductList } from '../Models/productlist';

const classNames = mergeStyleSets({
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    selectionDetails: {
        marginBottom: '20px'
    }
});
const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px'
    }
};

const transparentTheme = createTheme({
    palette: {
      white: '#0',                 // used for default background color
      neutralLighter: '#0',        // used for hover background color
      neutralLight: '#0',          // used for selected background color
      neutralQuaternaryAlt: '#0'   // used for selected hover background color
    }
  });

type ProductsProps = ProductList;

export interface ProductsListState {
    columns: IColumn[];
    items: Product[];
    selectionDetails: string;
}

export class ProductsList extends React.Component<ProductsProps, ProductsListState> {
    private _selection: Selection;
    private _allItems: Product[];

    constructor(props: ProductsProps) {
        super(props);

        const columns: IColumn[] = [
            {
                key: 'column1',
                name: 'ID',
                ariaLabel: 'Column operations for File type, Press to sort on File type',
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'name',
                minWidth: 16,
                maxWidth: 16,
                onColumnClick: this._onColumnClick,
            },
            {
                key: 'column2',
                name: 'Name',
                fieldName: 'Name',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: 'Sorted A to Z',
                sortDescendingAriaLabel: 'Sorted Z to A',
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column3',
                name: 'Description',
                fieldName: 'Description',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                onRender: (item: Product) => {
                    return <span>{item.Description}</span>;
                },
                isPadded: true
            },
            {
                key: 'column4',
                name: 'Release Date',
                fieldName: 'ReleaseDate',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                onRender: (item: Product) => {
                    return <span>{new Date(item.ReleaseDate).toLocaleDateString()}</span>;
                },
                isPadded: true
            },
            {
                key: 'column5',
                name: 'Rating',
                fieldName: 'Rating',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'number',
                onRender: (item: Product) => {
                    return <span>{item.Rating}</span>;
                },
                isPadded: true
            },
            {
                key: 'column6',
                name: 'Price',
                fieldName: 'Price',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'number',
                onRender: (item: Product) => {
                    return <span>{item.Price}</span>;
                },
                isPadded: true
            },
        ];

        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails()
                });
            }
        });

        this.state = {
            items: [],
            columns: columns,
            selectionDetails: this._getSelectionDetails(),
        };
    }

    public render() {
        const { columns, items, selectionDetails } = this.state;
        const { products } = this.props;

        this._allItems = products;

        return (
            <Fabric>
                <div className={classNames.controlWrapper}>
                    <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
                </div>
                <div className={classNames.selectionDetails}>{selectionDetails}</div>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        theme={transparentTheme}
                        items={items && items.length ? items : products}
                        compact={false}
                        columns={columns}
                        selectionMode={SelectionMode.multiple}
                        getKey={this._getKey}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        onItemInvoked={this._onItemInvoked}
                        enterModalSelectionOnTouch={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                    />
                </MarqueeSelection>
            </Fabric>
        );
    }

    private _getKey(item: Product, index?: number): string {
        return '' + item.ID;
    }

    private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        const selections = text ? this._allItems.filter(i => i.Name.toLowerCase().indexOf(text) > -1) : this._allItems;
        this.setState({
            items: selections
        });
    }

    private _onItemInvoked(item: Product): void {
        alert(`Item invoked: ${item.Name}`);
    }

    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0] as Product).Name;
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const { columns, items } = this.state;
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            items: newItems
        });
    }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

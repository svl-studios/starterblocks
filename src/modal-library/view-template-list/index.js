const { Component, useState, useEffect } = wp.element;
const { compose, withState } = wp.compose;
const { withDispatch, withSelect, select } = wp.data;
const { Spinner } = wp.components;

import SingleItem from '../../components/single-item'
import MultipleItem from '../../components/multiple-item'
import Pagination from '../../components/pagination'
import './style.scss'

import { SingleItemProvider } from '../../contexts/SingleItemContext';

import PreviewModal from '../../modal-preview';

const columnMap = {
    'large': 2,
    'medium': 3,
    'small': 4
};

const pageSizeMap = {
    'large': 20,
    'medium': 30,
    'small': 40
};

function TemplateList(props) {
    const { pageData, loading, activeItemType, activeCollection, columns, currentPage } = props;
    const { setActiveCollection} = props;
    const [columnizedData, setColumnizedData] = useState([]);
    const getBackgroundImage = (url) => {
        if (!url) {
            return starterblocks.plugin + 'assets/img/starterblocks-medium.jpg';
        }
        return url;
    }

    const onSelectCollection = (collectionID) => {
        setActiveCollection(collectionID);
    }

    useEffect(() => {
        let newData = [], index = 0;
        let colStr = (columns === '') ? 'medium' : columns;
        const columnsCount = columnMap[colStr];
        const pageSize = pageSizeMap[colStr];
        for (let i = 0; i < columnsCount; i++)
            newData[i] = [];
        if (pageData) {
            const lowerLimit = activeItemType !== 'collection' ? (currentPage * pageSize) + 1 : 1;
            const upperLimit = activeItemType !== 'collection' ? (currentPage + 1) * pageSize : pageData.length;
            for ( index = lowerLimit; index <= upperLimit && index <= pageData.length; index++) {
                newData[(index - 1) % columnsCount].push({...pageData[index - 1], index: index - 1});
            }
        }
        setColumnizedData(newData);
    }, [columns, pageData]);
    let types = starterblocks.mokama === '1' ? 'active' : 'inactive';


    if (!loading)
        return (
            <div id="modalContainer" className="starterblocks-template-list-modal">
                <div className="starterblocks-builder-template-list-container">
                    <div id="collections-sections-list" className={`starterblocks-builder-page-templates ${columns}`}>
                        { columnizedData &&
                            columnizedData.map((columnData, colIndex) => (
                                <div className="starterblocks-pagelist-column" key={colIndex}>
                                    {
                                        columnData &&
                                        columnData.map((data, cellIndex) => (
                                            (activeItemType !== 'collection' || activeCollection !== null) ?
                                                <SingleItemProvider value={{
                                                    data,
                                                    pageData,
                                                    index: data.index,
                                                    activeItemType,
                                                    spinner: false,
                                                    column: columns,
                                                    showDependencyBlock: true
                                                }} key={cellIndex}>
                                                    <SingleItem
                                                        key={cellIndex}
                                                        backgroundImage={(data) => getBackgroundImage(data)}
                                                    />
                                                </SingleItemProvider>
                                                :
                                                <MultipleItem
                                                    key={cellIndex}
                                                    data={data}
                                                    index={data.index}
                                                    types={types}
                                                    itemType={activeItemType}
                                                    spinner={false}
                                                    onSelectCollection={onSelectCollection}
                                                    backgroundImage={getBackgroundImage.bind(data)}
                                                />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    { activeItemType !== 'collection' && <Pagination /> }
                </div>
            </div>
        );
    return (
        <div>
            <div style={{ height: '600px' }}>
                <div className="starterblocks-modal-loader">
                    <Spinner />
                </div>
            </div>
        </div>
    );
}


export default compose([
    withDispatch((dispatch) => {
        const {
            setActiveCollection
        } = dispatch('starterblocks/sectionslist');

        return {
            setActiveCollection
        };
    }),

    withSelect((select, props) => {
        const { getPageData, getLoading, getColumns, getActiveItemType, getActiveCollection, getCurrentPage} = select('starterblocks/sectionslist');
        return { pageData: getPageData(), loading: getLoading(), activeItemType: getActiveItemType(), columns: getColumns(), activeCollection: getActiveCollection(), currentPage: getCurrentPage() };
    })
])(TemplateList);

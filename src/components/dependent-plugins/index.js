import {useContext} from '@wordpress/element';
import {Tooltip} from '@wordpress/components';
import SingleItemContext from '../../contexts/SingleItemContext';
import * as Icons from '~starterblocks/icons'
import './style.scss'

export default function DependentPlugins (props) {
    const {data, showDependencyBlock} = useContext(SingleItemContext);
    const {ID} = data;

    const getDependentBlocks = (data) => {
        return Object.keys(data.blocks).map((block) => {
            const pluginReference = starterblocks.supported_plugins[block];
            return {
                name: pluginReference.name,
                slug: block,
                missingDependency: pluginReference.hasOwnProperty('version') === false
            };
        });
    }

    if (showDependencyBlock)
        return (
            <div className="starterblocks-button-display-dependencies">
                {
                    getDependentBlocks(data).map(block => {
                        const {name, slug, missingDependency} = block;
                        const IconComponent = Icons[slug];

                        if (IconComponent)
                            return (
                                <Tooltip text={name} position="bottom" key={ID +slug}>
                                    <span className={missingDependency ? 'missing-dependency' : ''}>
                                        <IconComponent/>
                                    </span>
                                </Tooltip>
                            );
                    })
                }
            </div>
        );
    return null;
}

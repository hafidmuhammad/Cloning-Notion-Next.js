import PropTypes from 'prop-types';
import SidebarComponet from '../navigation/sidebarcomponent';


const MainLayout = ({children}) => {

    return (
        <SidebarComponet>
            {children}
        </SidebarComponet>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node 
};

export default MainLayout
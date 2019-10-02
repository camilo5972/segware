import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { AppProvider } from '../AppContext';
import EditPost from '../components/EditPost';

const context = { state: {splashscreen: true, posts: [], author: '11' }, updateState: () => {}};

describe('Edit Post', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppProvider value={context}><EditPost visible={true} setVisibleModalNewPost={() => {}} /></AppProvider>);
    });

    it('renders correctly', () => {
        expect(wrapper.find('EditPost')).toHaveLength(1);
    });
    
    it('should verify props', () => {
        expect(wrapper.find('EditPost').prop('visible')).toEqual(true);
    });
    
});

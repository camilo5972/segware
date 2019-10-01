import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { AppProvider } from '../AppContext';
import NewPost from '../components/NewPost';

const context = { state: {splashscreen: true, posts: [], author: '11' }, updateState: () => {}};

describe('Post', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppProvider value={context}><NewPost visible={true} setVisibleModalNewPost={() => {}} /></AppProvider>);
    });

    it('renders correctly', () => {
        expect(wrapper.find('NewPost')).toHaveLength(1);
    });
    
    it('should verify props', () => {
        expect(wrapper.find('NewPost').prop('visible')).toEqual(true);
    });
    
});

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { AppProvider } from '../AppContext';
import ListPosts from '../containers/ListPosts';

const context = { state: {splashscreen: true, posts: [], author: '11' }, updateState: () => {}};

describe('List Posts', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppProvider value={context}><ListPosts /></AppProvider>);
    });

    it('renders correctly', () => {
        expect(wrapper.find('ListPosts')).toHaveLength(1);
    });
    
});

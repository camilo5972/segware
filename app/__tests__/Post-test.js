import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { AppProvider } from '../AppContext';
import Post from '../components/Post';

const context = { state: {splashscreen: true, posts: [], author: '11' }, updateState: () => {}};
const post = {
    _id: '1234',
    author: '11',
    text: 'Hello world',
    upvoters: [],
    dateCreated: Date.now()
};

describe('Post', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppProvider value={context}><Post post={post} /></AppProvider>);
    });

    it('renders correctly', () => {
        expect(wrapper.find('Post')).toHaveLength(1);
    });
    
    it('should verify props', () => {
        expect(wrapper.find('Post').prop('post')).toEqual(post);
    });
    
});

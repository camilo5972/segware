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

it('renders correctly', () => {
    const wrapper = shallow(<AppProvider value={context}><Post post={post} /></AppProvider>, {
        wrappingComponent: AppProvider,
        wrappingComponentProps: {context}
    });
    expect(wrapper.find('Card')).toHaveLength(1);
});

it('should mock the context', () => {
  /* jest.spyOn(AppContext, 'useContext').mockImplementation(() => context);
  const wrapper = shallow(<Post post={post} />);
  expect(wrapper.find('Card')).toHaveLength(1); */
});
import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import SplashScreen from '../containers/SplashScreen';

describe('SplashScreen', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SplashScreen />);
    });

    it('renders correctly', () => {
        expect(wrapper.find('SafeAreaView')).toHaveLength(1);
    });
    
});

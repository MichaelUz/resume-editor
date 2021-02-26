import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    it('Should render correctly', () => {
        const component = shallow(<Dropdown value='Strong'/>);

        expect(component).toMatchSnapshot();
    });
})
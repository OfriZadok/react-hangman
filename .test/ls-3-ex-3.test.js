import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import App from '../src/App';
import Letters from '../src/components/Letters';
import Letter from '../src/components/Letter';
import Score from '../src/components/Score';
import renderer from 'react-test-renderer';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';

configure({ adapter: new Adapter() });

it('Application should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('The game should display a Congratulations div with the class "success-message" only if the word is guessed correctly', () => {
    const word = "hey";
    const correctLetters = ['h', 'e', 'y'];
    const wrapper = mount(<App />);
    expect(wrapper.find(".success-message")).toHaveLength(0);
    wrapper.setState({ word: hey });
    wrapper.update();
    let allLetters = wrapper.find(Letters).find("span");
    allLetters.forEach((l) => {
        if (correctLetters.indexOf(l.text()) > -1) {
            l.simulate('click');
        }
    });
    expect(wrapper.find('.success-message')).toHaveLength(1);
});

it('The game should display a Game Over div with the class "game-over" if the Score is below 0', () => {

});

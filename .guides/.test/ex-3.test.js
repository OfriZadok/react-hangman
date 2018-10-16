import React from 'react';
import ReactDOM from 'react-dom';
import assert from 'assert';
import jest from 'jest';
import App from '../../src/App';
import Letters from '../../src/components/Letters';
import Letter from '../../src/components/Letter';
import Score from '../../src/components/Score';
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


it('The game should display a Congratulations div with the class "success-message" only if the word is guessed correctly', (done) => {
    const word = "HEY";
    const correctLetters = ['h', 'e', 'y'];
    const wrapper = mount(<App />);
    expect(wrapper.find(".success-message")).toHaveLength(0);
    wrapper.setState({ word: word });
    let allLetters = wrapper.find(Letters).find("span");
    correctLetters.map((cl) => {
        let l = allLetters.filterWhere((al) => al.text().toLowerCase() == cl).first();
        l.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('.success-message')).toHaveLength(1);
    console.log(wrapper.html());
    done();

});

// // TODO: Check about -10 bug
it('The game should display a Game Over div with the class "game-over" if the Score is below 0', () => {
    const word = "HEY";
    const incorrectLetters = ['a', 'b', 'c', 'd', 'f', 'g'];
    const wrapper = mount(<App />);
    expect(wrapper.find(".game-over")).toHaveLength(0);
    wrapper.setState({ word: word });
    let allLetters = wrapper.find(Letters).find("span");
    incorrectLetters.forEach((l) => {
       let currentLetter = allLetters.filterWhere((al) => al.text().toLowerCase() == l).first(); 
       currentLetter.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('.game-over')).toHaveLength(1);
});


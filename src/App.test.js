import React from 'react';
//import ReactDOM from 'react-dom';
import { App, Title, Input, Button } from './App';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

/**
 * Appコンポーネントのテスト
 */
describe('<App />', () => {
  it('子コンポーネントが存在すること', () => {
    // == 準備 ==
    /** Appコンポーネントをshallowレンダリング */
    const wrapper = shallow(<App />);
    //子コンポーネントは、shallowレンダリングしたwrapper変数を使ってwrapper.find(子コンポーネント名)で取得可能です。ここでは、lengthを使った個数での存在チェックを行なっています。
    // == 検証 ==
    /** 各コンポーネントの数を取得し、1であればOK */
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Input).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });

  it('this.state.textを更新した時にclass名に反映される事', () => {
    // == 準備 ==
    /** Appコンポーネントをshallowレンダリング */
    const wrapper = shallow(<App />);

    // == 実行 ==
    /** setStateしてthis.state.textの値を'XXX'に更新 */
    wrapper.setState({
      text: 'XXX',
    });
    // == 検証 ==
    /** 'XXX'というclass名を持った要素があればOK */
    expect(wrapper.find('.XXX').length).toBe(1);
  });

  it('handleClickを呼び出すと、setStateが呼び出される', () => {
    // == 準備 ==
    /** Appコンポーネントをshallowレンダリング */
    const wrapper = shallow(<App />);
    //setStateをスパイ化
    const setStateSpy = jest.spyOn(App.prototype, 'setState');
    //setStateしてthis.state.inputValueの値を'XXX'に更新
    wrapper.setState({
      inputValue: 'XXX',
    });
    //実行
    //handleClick()を呼び出す
    wrapper.instance().handleClick();
    //検証
    //適切な引数でspy化したsetStateが呼び出されていればOK
    expect(setStateSpy).toHaveBeenCalledWith({
      //以下の引数とともにチェックを行なっている
      text: 'XXX',
      inputValue: '',
    });
  });

  it('<App />のスナップショット', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/**
 * Titleコンポーネントのテスト
 */
describe('<Title />', () => {
  it('受け取ったpropsの値を表示する事', () => {
    /**
   * 'React'という値をtextに渡して、
   * Titleコンポーネントをshallowレンダリング
   */
    const wrapper = shallow(<Title text={'React'} />);
    // == 検証 ==
    /** レンダリングされたテキストが'Hello React'であればOK */
    expect(wrapper.text()).toBe('Hello React');
    //==実行
    //props.textの値を'Worldに変更
    wrapper.setProps({ text: 'World' });
    //==検証==
    //レンダリングされたテキストがHello WorldであればOK
    expect(wrapper.text()).toBe('Hello World');
  });
})
/**
 * Inputコンポーネントのテスト
 */
describe('<Input />', () => {
  it('changeイベント発火時にコールバック関数が呼び出される事', () => {
    //準備
    //mock関数としてhandleChangeSpyを作成
    //親コンポーネントからもらうmethodは
    const handleChangeSpy = jest.fn();//jest.fin()を使ってmock関数として作成します。
    //mock関数handleChangeSpyを渡して、Inputコンポーネントをshalloレンダリング
    const wrapper = shallow(< Input handleChange={handleChangeSpy} />);
    //ダミーなeventオブジェクトを作成
    const event = { target: { value: 'aaa' } };
    //実行
    //input要素に対してchangeイベントを発火させる
    wrapper.find('input').simulate('change', event);//イベントを発火させる為にsimulate()メソッドを用います//その際にeventメソッドを作成して渡しています。
    //検証
    //mock関数'handleChangeSpy'がXXXという引数で呼び出さればOK
    expect(handleChangeSpy).toHaveBeenCalledWith('aaa');
  });
})

import React from 'react';
import './Example.css';

/*
  Since this component shows code we include the https://prismjs.com/
  formatter. We invoke it by labelling code blocks with class="language-jsx"
*/
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import '../../node_modules/prismjs/themes/prism.css';

/* eslint-disable  react/jsx-one-expression-per-line */
/* eslint-disable  react/destructuring-assignment */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

// React Components are subclass of React.Componment.
class Example extends React.Component {
  constructor(props) {
    super(props); // Must run the constructor of React.Component first

    // Components have a special property named "state" that holds state.
    // We can initialize it here.
    // We read the example model data into the state variable 'name'
    this.state = {
      name: window.cs142models.exampleModel().name,
      counter: 0,
      inputValue: '',
      buttonWasClicked: '',
      motto: window.cs142models.exampleModel().motto,
    };

    // React events are called directly from DOM event handlers
    // so we cannot directly call the methods of this class. We
    // generate new functions that handle the event by just calling
    // the method that handles the event.
    this.handleChangeBound = event => this.handleChange(event);
    // Note: A commmon idiom in React code is to use JavaScript bind() to
    // smash the method to accomplish this passthrough to the method:
    //      this.handleChange = this.handleChange.bind(this);
  }

  // React components have several "lifecycle functions"
  // https://reactjs.org/docs/react-component.html
  // that are used to inform the Component of interesting events.

  // componentDidMount - Called when Component is activiated
  componentDidMount() {
    // To demonstate state updating we define a function
    // that increments the counter state and instruct the
    // DOM to call it every 2 seconds.
    /* eslint-disable react/no-access-state-in-setstate */
    const counterIncrFunc = () => this.setState({
      counter: this.state.counter + 1,
    });
    this.timerID = setInterval(counterIncrFunc, 2 * 1000);

    // Trigger the code coloring
    Prism.highlightAll();
  }

  // componentWillUnmount - Called when Component is deactivated.
  componentWillUnmount() {
    // We need to tell the DOM to stop calling us otherwise React
    // will complain when we call setState on an unmounted component.
    clearInterval(this.timerID);
  }

  // Method called when the input box is typed into.
  handleChange(event) {
    this.setState({ motto: event.target.value });
  }

  handleMottoChange = (event) => {
    this.setState({ motto: event.target.value });
  }

  // Method called when the button is pushed
  /* eslint-disable-next-line no-unused-vars */
  handleButtonClick(buttonName, event) {
    this.setState({ buttonWasClicked: buttonName });
  }

  /* eslint-disable-next-line class-methods-use-this */
  outOfBandJSX(option) {
    let optionJSX;
    const listItems = [];
    if (option) {
      optionJSX = <div>Option was True</div>;
    } else {
      optionJSX = <div>Option was False</div>;
    }
    for (let i = 0; i < 3; i++) {
      listItems[i] = <li key={i}> List Item {i} </li>;
    }
    const retVal = (
      <div>
        {optionJSX}
        <ul>{listItems}</ul>
      </div>
    );

    return retVal;
  }

  render() {
    return (
      <div className="container Example">
        <h1>CS142 Project#4 React.js Example</h1>

        <div className="motto-update">
          <div><b>{this.state.name}</b></div>
          <div>
            <input className="motto-input" type="text"
            value={this.state.motto}
            onChange={(event) => {this.handleMottoChange(event)}} />
          </div>
        </div>

        <p>
          This view is an example of a
          &nbsp;
          <a href="https://reactjs.org/docs/react-component.html" target="_blank" rel="noopener noreferrer">
            React.js Component
          </a>
          &nbsp;
          named <span className="cs142-code-name">Example</span>.
          It is located in the
          file <code>components/example/Example.jsx</code>.
          It looks like a JavaScript class named Example that has a method named
          named <span className="cs142-code-name">render</span>, which
          appears to written in something that looks like HTML.
        </p>
        <p>
          It is actually written in a language named &nbsp;
          <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener noreferrer">
            JSX
          </a>
          &nbsp; that is run as a preprocessor to the HTML-like
          language to JavaScript. The generated JavaScipt is limited to calls
          to the React.js &nbsp;
          <a href="https://reactjs.org/docs/react-api.html#createelement" target="_blank" rel="noopener noreferrer">
            createElement
          </a>
          &nbsp; function which allow us to write something that looks
          like HTML to describe what the component renders.
        </p>
        <p>
          Although JSX looks like HTML, it is not HTML. Some of the differences
          are necessary due to embeddding
          in JavaScript. For example, rather than <code>class=</code> we
          use <code>className=</code> (class is a JavsScript keyword).
          Although it is possible to interleave JavaScript and JSX code, care is
          needed since contents of JSX tags are processed into arguments to a
          function limiting what can be done as will be seen below.
        </p>

        <h3>Template substitution</h3>

        <p>
          JSX treats text inside of parentheses (e.g. <code>{'{JavaScriptExpression}'}</code>) as
          templates where the JavaScript expression is evaluated in the context of the current
          function and whose value replaces the template in the string. The expression
          can evaluate to a JavaScript string or value from a JSX expression. This feature allows
          componment&apos;s specification to use templated HTML.
        </p>

        <p>
          The Example class constructor sets the object&apos;s
          property <code>state.name</code> (see the assignment
          to <code>this.state.name</code> in <code>Example.jsx</code>)
          from the model in the DOM which has a value of &ldquo; {this.state.name}
          &rdquo; so:
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`<p>My name is "{this.state.name}".</p>`
            }
          </code>
        </pre>
        <p>
          should render as:
        </p>
        <p className="cs142-example-output">
          My name is &ldquo; {this.state.name} &rdquo;.
        </p>

        <h3>
          One-way binding from JavaScript to HTML
        </h3>

        <p>
          React automatically propagates any changes to JavaScript state to the
          JSX templates. For example
          the following code <code>({'{this.state.counter}'})</code> displays
          the state.counter property of the Example component.
          The component sets a timer
          that increments the counter every 2 seconds. The value of the
          counter can be seen changing here: {this.state.counter}.
        </p>

        <h3>Control flow</h3>
        <p>
          Most templating engines include support for doing conditional
          rendering and iteration. JSX is embedded in and is transpiled to
          JavaScript so we can use JavaScript language constructs for managing control flow.
        </p>
        <p>
          One way of doing control using JavaScript is to assign JSX fragements
          to JavaScript variables and use normal JavaScript control flow
          operators. For example, the following function selects among the
          posssible output lines based on an argument to the function and
          uses a for loop to populate an array. These JavaScript variables
          can then be referred to in JSX returned by the function.
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`function outOfBandJSX(option) {
  var optionJSX;
  if (option) {
    optionJSX = <div>Option was True</div>;
  } else {
    optionJSX  = <div>Option was False</div>;
  }
  var listItems = [];
  for (var i = 0; i < 3; i++) {
    listItems[i] = <li key={i}>List Item {i}</li>;
  }
  var retVal =
    <div>
      {optionJSX}
      <ul>
        {listItems}
      </ul>
    </div>;

  return retVal;
}`
            }
          </code>
        </pre>
        <p>
            Calling this function from a template
            (i.e. <code>{'{this.outOfBandJSX(true)}'}</code>)
            would be expand to:
        </p>
        <div className="cs142-example-output">{this.outOfBandJSX(true)}</div>
        <p>
            Another way of accomplishing this is embedding the operations inside
            of curly braces. Although arbitrary JavaScript can appear inside
            braces, it must return a string or JSX expression to work.
            JavaScript control flow operations such as if, for, and while do
            not return values so templates
            like <code>{'{if (bool) ... else ...}'}</code> do not work.
        </p>
        <p>
            The following code generates the above output using the
            JavaScript {'"?:"'} operator and functional-style programming
            support to always return a value in the template:
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`<div>
  option ? <div>Option was True</div> : <div>Option was False</div> }
  <ul>
    {[0,1,2].map((i) =>  <li key={i}>List Item {i}</li>)}
  </ul>
</div>`
            }
          </code>
        </pre>
        <p>
          Short-circuit boolean operations such as {'"&&"'} can
          also be used to control what is rendered. For example the following
          code will make a sentence appear between to two paragraph when some
          characters are typed into the input box below.
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`<div>
  <p>A paragraph will appear between this paragraph</p>
  {
    this.state.inputValue && (
      <p>This text will appear when this.state.inputValue is truthy.
        this.state.inputValue === {this.state.inputValue}
      </p>
    )
  }
  <p>... and this one when some characters are typed into the input box below.</p>
</div>
`
            }
          </code>
        </pre>
        <p>
          Generates the output:
        </p>
        <div className="cs142-example-output">
          <p>
            A paragraph will appear between this paragraph
          </p>
          {
            this.state.inputValue
            && (
              <p>
                This text will appear when this.state.inputValue is truthy.
                this.state.inputValue === {this.state.inputValue}
              </p>
            )
          }
          <p>
            ... and this one when some characters are typed into the below box.
          </p>
        </div>

        <h3>Input using DOM-like handlers</h3>
        <p>
          Input in React is done using DOM-like event handlers. For example, JSX statements like:
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`<label htmlFor="inId">Input Field: </label>
<input type="text" value={this.state.inputValue} onChange={this.handleChangeBound} />`
            }
          </code>
        </pre>
        <p>
          will display the text from the inputValue property of the
          Component&apos;s state in the input box (it starts
          out blank) and calls the function this.handleChangedBound every time the
          input field is changed.
          Typically this kind of input will
          be associated with
          a <a href="https://reactjs.org/docs/handling-events.html">Button</a> or
          inside a <a href="https://reactjs.org/docs/forms.html">Form</a> to allow
          the user to signal when they are finished changing the input field.
          Note the differences from HTML
          in <code>onchange=</code> become <code>onChange=</code> and
          <code>for=</code> becoming <code>htmlFor=</code>.
        </p>

        {
        /* eslint-disable jsx-a11y/label-has-associated-control */
        /* eslint-disable jsx-a11y/label-has-for */
        }
        <div className="cs142-example-output">
          <label htmlFor="inId">Input Field:
          </label>
          <input id="inId" type="text" value={this.state.inputValue} onChange={this.handleChangeBound} />
        </div>
        <p>
          The handleChangeBound function updates this.state.inputValue with the
          value of the DOM element so its value
          can be access like <code>{'{this.state.inputValue}'}</code> which
          returns &nbsp;&ldquo; {this.state.inputValue}  &rdquo;. Note we can not directly
          call <code>this.handleChange</code> since it is a method function of an object
          that is not available to the DOM. To handle this we create a new
          function <code>this.handleChangeBound</code> that can call the method and use it here.
        </p>
        <p>
          If we want to pass arguments to event handling functions we can use inlined
          arrow function definitions like so:
        </p>
        <pre className="cs142-example-code">
          <code className="language-jsx">
            {
`<div className="cs142-example-output">
  <p>Test button clicks.
    {
      this.state.buttonWasClicked &&
      <span>Last button clicked was: {this.state.buttonWasClicked}</span>
    }
  </p>
  <button
    type="button"
    onClick={e => this.handleButtonClick("one", e)}
  >
    Call handleButtonClick function with one
  </button>
  <button
    type="button"
    onClick={e => this.handleButtonClick("two", e)}
  >
    Call handleButtonClick function with two
  </button>
</div>`
            }
          </code>
        </pre>
        <p>
          When the button is pushed it will call the arrow function, which will then call the
          method <code>handleButtonClick</code> with the specified argument.
        </p>
        <div className="cs142-example-output">
          <p>
            Test button clicks. {
              this.state.buttonWasClicked
              && <span>Last button clicked was: {this.state.buttonWasClicked}</span>
            }
          </p>
          <button type="button" onClick={e => this.handleButtonClick('one', e)}>
            Call handleButtonClick function with one
          </button>
          <button type="button" onClick={e => this.handleButtonClick('two', e)}>
            Call handleButtonClick function with two
          </button>
        </div>
      </div>
    );
  }
}

export default Example;

# 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The key difference between a Component and a PureComponent is that a Component will always re-render when it receives new props or state, regardless of whether the values have changed or not. On the other hand, a PureComponent will only re-render if the props or state values have changed.

Here's an example of when using a PureComponent might break the app:

Suppose there is a Person component that accepts a name and age prop. If we pass an array of Person components as props to a parent component, and we update the array in a way that modifies the existing Person components, but the name and age props remain the same, a PureComponent will not re-render those Person components. This can result in stale data being displayed. In such a scenario, it might be better to use a regular Component to ensure that the Person components always re-render when the list is updated.

# 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Using Context and ShouldComponentUpdate together can be potentially dangerous because it can lead to unexpected behavior and performance issues in React application.

Context provides a way to pass data down the component tree without having to pass props manually at every level. However, the downside of using Context is that any change to the context value will trigger a re-render of all components that consume that context. This can result in unnecessary re-renders and performance issues in application.

On the other hand, ShouldComponentUpdate is a lifecycle method optimizes a component's rendering by determining whether a component should re-render or not. By implementing ShouldComponentUpdate, we can prevent unnecessary re-renders of the component and improve the performance.

However, when we use Context and ShouldComponentUpdate together, it can be difficult to accurately determine when a component should re-render, since the context value can change at any time and trigger a re-render. This can lead to unexpected behavior and performance issues.

For example, if we have a component that consumes context and implements ShouldComponentUpdate, and the context value changes frequently, it can lead to a situation where the component is constantly re-rendering, even if the component's props and state haven't changed. This can result in poor performance and a suboptimal user experience.

To avoid these issues, it's best to use Context sparingly and only when necessary, and to carefully consider whether implementing ShouldComponentUpdate is necessary for each component.

# 3. Describe 3 ways to pass information from a component to its PARENT.

Three ways to pass information from a component to its parent are:

- Props and callbacks: One of the most common ways to pass information from a child component to its parent is by passing data via props and triggering a callback function. In this approach, the parent component passes down a callback function as a prop to the child component. When the child component needs to pass data to the parent, it calls the callback function with the data as an argument.
- Using context: The child component can use context to share data with its parent and other descendant components without having to pass it explicitly through props.
- we can use global state like redux.

# 4. Give 2 ways to prevent components from re-rendering.

- Use React.memo(): The React.memo() higher-order component can be used to memoize a component and prevent it from re-rendering if its props haven't changed. React.memo() works by comparing the previous props with the new props, and only re-rendering the component if they have changed.

- Use shouldComponentUpdate(): The shouldComponentUpdate() lifecycle method can be used to manually control when a component should re-render. shouldComponentUpdate() receives the new props and state as arguments, and should return a boolean value indicating whether the component should re-render or not

# 5. What is a fragment and why do we need it? Give an example where it might break my app.

In React, a fragment is a component that allows us to group a list of children elements without creating an additional DOM node. Fragments are used to improve the performance and readability of the React code by grouping together multiple elements into a single parent element without having to add an extra element to the DOM.

# 6. Give 3 examples of the HOC pattern.

- withRouter: withRouter is an HOC provided by React Router that provides the history, location, and match props to a wrapped component. This allows the wrapped component to access and manipulate the browser's URL history.

- connect: connect is an HOC provided by the react-redux library that connects a React component to a Redux store. This allows the component to access the store's state and dispatch actions to update the state.

- withStyles: withStyles is an HOC provided by the @material-ui/core library that allows us to apply custom styles to a React component using CSS-in-JS. This allows to create reusable styles that can be applied to multiple components.

# 7. what's the difference in handling exceptions in promises, callbacks and async...await.

- Promises: Promises have a catch method that can be used to handle exceptions. If a promise is rejected, the catch method is called, and we can handle the error there. 

- Callbacks: When using callbacks, error handling is typically done by passing an error object as the first argument to the callback function. If an error occurs, we can check for the presence of this argument and handle the error accordingly.

- Async/await: When using async/await, we can use a try/catch block to handle exceptions. If an exception is thrown in the try block, the catch block is executed, and we can handle the error there.

# 8. How many arguments does setState take and why is it async.

The setState method in React is used to update the state of a component. It can take one or two arguments:

This function takes two arguments: the previous state of the component and the current props of the component.

The setState method is asynchronous, meaning that React does not immediately update the state of the component. Instead, it schedules a state update and re-renders the component at a later time. This is done for performance reasons, as React can batch multiple state updates together to reduce the number of re-renders.

Because setState is asynchronous, we cannot rely on the updated state immediately after calling setState. Instead, we can provide a callback function as a second argument to setState that is called after the state has been updated and the component has been re-rendered.

# 9. List the steps needed to migrate a Class to Function Component.

- Create the function component: Create a new function component with the same name as the class component.

- Replace the render method with the function body: Replace the render method of the class component with the function body of the function component. This should return the JSX markup that the component renders.

- Move class methods to the function body: Move any class methods that are used in the render method to the function body of the function component.

- Replace this.state with useState hook: Replace the this.state calls with the useState hook. This involves importing the useState hook from React and using it to create state variables.

- Replace this.props with function arguments: Replace the this.props calls with function arguments.

- Remove lifecycle methods and use effect hook instead: Remove any lifecycle methods and replace them with the useEffect hook. This includes componentDidMount, componentDidUpdate, and componentWillUnmount.

# 10. List a few ways styles can be used with components

- Inline styles: Inline styles can be applied directly to elements using the style prop. This prop takes an object that defines the style properties and their values.

- CSS Modules: CSS Modules are a way to locally scope CSS styles to a specific component. This allows to use class names in CSS that are specific to the component, without worrying about naming conflicts with other components. To use CSS Modules, we need to enable them in our project and import the CSS file as a module.

- CSS-in-JS libraries: There are several libraries that allow to write CSS styles directly in JavaScript code. These libraries typically provide a way to define style objects or components that generate CSS styles. Some popular CSS-in-JS libraries include styled-components, emotion, and JSS.

- Third-party UI libraries: Many third-party UI libraries provide pre-built components with predefined styles that can be easily customized. Some popular UI libraries include Material-UI, Ant Design, and Bootstrap.

# 11. How to render an HTML string coming from the server.

Rendering an HTML string in React can be done using the dangerouslySetInnerHTML prop. This prop allows to set the HTML content of a component using a string, but it should be used with caution as it can be a security risk if the string is not properly sanitized.
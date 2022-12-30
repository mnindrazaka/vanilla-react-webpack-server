export const ReactDOM = (function () {
  let _container;
  let _Component;

  return {
    update() {
      this.render(_container, _Component);
    },
    render(container, Component) {
      _container = container;
      _Component = Component;

      const focusedElementId = document.activeElement.id;
      const focusedElementSelectionStart =
        document.activeElement.selectionStart;
      const focusedElementSelectionEnd = document.activeElement.selectionEnd;

      const componentDOM = React.render(Component);
      container.replaceChildren();
      container.appendChild(componentDOM);

      if (focusedElementId) {
        const focusedElement = document.getElementById(focusedElementId);
        focusedElement.focus();
        focusedElement.selectionStart = focusedElementSelectionStart;
        focusedElement.selectionEnd = focusedElementSelectionEnd;
      }
    },
  };
})();

export const React = (function () {
  let hooks = [];
  let currentIndex = 0;

  return {
    render(Component) {
      currentIndex = 0;

      const Comp = Component();
      return Comp;
    },
    useState(initialValue) {
      const useStateIndex = currentIndex;
      currentIndex++;

      hooks[useStateIndex] = hooks[useStateIndex] ?? initialValue;

      const setState = (newVal) => {
        const newState =
          typeof newVal === "function" ? newVal(hooks[useStateIndex]) : newVal;
        hooks[useStateIndex] = newState;
        ReactDOM.update();
      };

      return [hooks[useStateIndex], setState];
    },
    useReducer(reducer, initialState) {
      const useReducerIndex = currentIndex;
      currentIndex++;

      hooks[useReducerIndex] = hooks[useReducerIndex] ?? initialState;

      const dispatch = (action) => {
        const newState = reducer(hooks[useReducerIndex], action);
        hooks[useReducerIndex] = newState;
        ReactDOM.update();
      };

      return [hooks[useReducerIndex], dispatch];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const deps = hooks[currentIndex];
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        hooks[currentIndex] = depArray;
        callback();
      }
      currentIndex++;
    },
  };
})();

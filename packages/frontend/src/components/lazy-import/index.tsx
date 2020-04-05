import { useState, useEffect } from 'react';

export const LazyImport = props => {
  const [component, setComponent] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    props.load().then((component: any) => {
      setComponent(component.default);
    });

    return () => setComponent(null);
  }, []);

  return props.children(component);
};

//   props: any;
//   state = {
//     component: null,
//   };

//   componentDidMount(): void {
//     window.scrollTo(0, 0);

//     this.props.load().then((component: any) => {
//       this.setState({
//         component: component.default,
//       });
//     });
//   }

//   render() {
//     return this.props.children(this.state.component);
//   }
// }

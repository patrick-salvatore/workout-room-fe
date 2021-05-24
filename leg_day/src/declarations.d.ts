declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

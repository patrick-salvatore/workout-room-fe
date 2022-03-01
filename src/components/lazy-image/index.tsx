import React, { useEffect, useState } from 'react';
import LazyLoad from 'vanilla-lazyload';

interface ILazyImageProps {
  alt: string;
  class?: string;
  src: string;
  srcMobile?: string;
  width?: number | string;
  height?: number | string;
  style?: { [key: string]: string | number };
}

/*
  Create a custom interface that extends from the document and tacks lazyLoadInstance
*/
interface IDocumentLazy extends Document {
  lazyLoadInstance?: any;
}

const _document: IDocumentLazy = document;

const lazyloadConfig = {
  elements_selector: '.lazy',
};

// Only initialize it one time for the entire application
if (!_document.lazyLoadInstance) {
  _document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
}

const LazyImage: React.FunctionComponent<ILazyImageProps> = (props): JSX.Element => {
  const [isMobile, setIsMobile] = useState<boolean>(window.screen.availWidth < 600);

  const windowSizeChanged = (): void => {
    const _isMobile = props.srcMobile && window.screen.availWidth < 600;

    if (_isMobile) {
      setIsMobile(true);
      _document.lazyLoadInstance.update();
      console.info('updating images....');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', windowSizeChanged, true);
    _document.lazyLoadInstance.update();
    return (): void => {
      window.removeEventListener('resize', windowSizeChanged);
    };
  }, []);

  // Just render the image with data-src
  const { alt, class, src, width, height, style } = props;
  const srcMobile = props.srcMobile ?? src;

  return (
    <img
      alt={alt}
      class={`lazy ${class || ''}`}
      src={isMobile ? srcMobile : src}
      data-sizes="100w"
      width={width}
      height={height}
      style={style}
    />
  );
};

export default LazyImage;

import React, { useEffect, useState } from 'react';

export const SlashLoader = ({ text = 'LOADING', interval = 300 }) => {
  const loaderStages = ['|', '/', '-', '\\'];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < 3 ? prev + 1 : 0));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <span className="slash-loader">
      {text} {loaderStages[stage]}
    </span>
  );
};

export const DotLoader = ({ text = 'LOADING', interval = 300 }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <span className="dot-loader">
      {text} {dots}
    </span>
  );
};

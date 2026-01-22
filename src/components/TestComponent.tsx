import { memo, useCallback, useState } from 'react';

interface TestComponentProps {
  // Add props interface for better TypeScript
}

export const TestComponent = memo<TestComponentProps>(() => {
  // rerender-lazy-state-init: Use function for expensive initial values
  const [data, setData] = useState<string[]>(() => []);
  
  // rerender-functional-setstate: Use functional setState for stable callbacks
  const handleClick = useCallback(() => {
    setData(prevData => [...prevData, `item-${Date.now()}`]);
  }, []);

  return (
    <div>
      {/* Accessibility: Add aria-label to button */}
      {/* Focus States: Add focus-visible styles */}
      <button 
        onClick={handleClick}
        aria-label="Click to add data"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
      >
        Click me
      </button>
      {/* rendering-conditional-render: Use ternary, not && for conditionals */}
      <div>Test component</div>
      {data.length > 0 ? (
        <div className="mt-2">
          Data: {data.join(', ')}
        </div>
      ) : null}
    </div>
  );
});

TestComponent.displayName = 'TestComponent';

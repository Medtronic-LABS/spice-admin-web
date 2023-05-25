import { Tooltip } from 'bootstrap';
import { useEffect, useRef } from 'react';

const CustomTooltip = ({ children, title }: { children: any; title: string }) => {
  const tooltipNode = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tooltip = new Tooltip(tooltipNode.current as HTMLDivElement, { container: 'body', trigger: 'hover' });
    return () => tooltip.hide();
  }, [title]);

  return (
    <div
      ref={tooltipNode}
      data-bs-toggle='tooltip'
      data-bs-placement='top'
      data-bs-original-title={title}
      title={title}
      data-testid="tooltip"
    >
      {children}
    </div>
  );
};

export default CustomTooltip;

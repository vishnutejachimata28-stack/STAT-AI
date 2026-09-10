import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowRight, Info, Check } from 'lucide-react';

interface DiagramNode {
  id: string;
  label: string;
  subtext?: string;
  type?: 'input' | 'process' | 'output' | 'highlight';
}

interface DiagramProps {
  type: 'flow' | 'matrix' | 'hierarchy';
  title: string;
  caption: string;
  nodes: DiagramNode[];
  connections: { from: string; to: string; label?: string }[];
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({
  type,
  title,
  caption,
  nodes,
  connections,
}) => {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(nodes[0] || null);

  const getNodeBadgeClass = (nodeType?: string) => {
    switch (nodeType) {
      case 'highlight':
        return 'bg-saffron-50 border-saffron-300 text-saffron-950 ring-2 ring-saffron-400/30';
      case 'input':
        return 'bg-emerald-50 border-emerald-300 text-emerald-950';
      case 'output':
        return 'bg-purple-50 border-purple-300 text-purple-950 font-bold';
      case 'process':
      default:
        return 'bg-blue-50 border-blue-300 text-blue-950';
    }
  };

  return (
    <div className="my-6 bg-slate-50/80 rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-navy-800" />
          <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide">
            Interactive Schema: {title}
          </h4>
        </div>
        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
          {type} architecture
        </span>
      </div>

      <p className="text-xs text-slate-500 mt-2 italic">{caption}</p>

      {/* Visual Nodes Canvas */}
      <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 min-w-[550px] py-4">
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div
                onClick={() => setSelectedNode(node)}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all duration-200 w-44 text-center transform hover:-translate-y-0.5 hover:shadow-md ${getNodeBadgeClass(
                  node.type
                )} ${
                  selectedNode?.id === node.id ? 'ring-2 ring-navy-800 shadow-md' : 'opacity-90'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-0.5">
                  {node.type || 'Stage'}
                </div>
                <div className="text-xs font-bold leading-snug">{node.label}</div>
                {node.subtext && (
                  <div className="text-[10px] mt-1 text-slate-600 font-medium leading-tight">
                    {node.subtext}
                  </div>
                )}
              </div>

              {/* Arrow separator */}
              {idx < nodes.length - 1 && (
                <div className="text-slate-400 flex flex-col items-center">
                  <ArrowRight className="w-4 h-4 hidden sm:block text-slate-400" />
                  <ArrowDown className="w-4 h-4 sm:hidden text-slate-400" />
                  {connections[idx]?.label && (
                    <span className="text-[9px] text-slate-400 font-medium px-1 mt-0.5 whitespace-nowrap">
                      {connections[idx].label}
                    </span>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Detail Box for Selected Node */}
      {selectedNode && (
        <div className="mt-3 p-3 bg-navy-950 text-white rounded-xl text-xs flex items-start gap-2.5 shadow-inner">
          <Info className="w-4 h-4 text-saffron-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-saffron-300">{selectedNode.label}:</span>{' '}
            <span className="text-slate-300">
              {selectedNode.subtext || 'Component verified in Indian Official Statistical governance.'} (Click on other nodes in the diagram above to inspect individual stages).
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

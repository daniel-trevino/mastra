import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { constructVNextNodesAndEdges } from './utils';
import { WorkflowConditionNode } from './workflow-condition-node';
import { WorkflowDefaultNode } from './workflow-default-node';
import { WorkflowAfterNode } from './workflow-after-node';
import { WorkflowLoopResultNode } from './workflow-loop-result-node';
import { VNextWorkflowNestedNode } from './v-next-workflow-nested-node';
import { GetVNextWorkflowResponse } from '@mastra/client-js';

export function VNextWorkflowGraphInner({ workflow }: { workflow: GetVNextWorkflowResponse }) {
  const { nodes: initialNodes, edges: initialEdges } = constructVNextNodesAndEdges(workflow);
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const nodeTypes = {
    'default-node': WorkflowDefaultNode,
    'condition-node': WorkflowConditionNode,
    'after-node': WorkflowAfterNode,
    'loop-result-node': WorkflowLoopResultNode,
    'nested-node': VNextWorkflowNestedNode,
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
        fitViewOptions={{
          maxZoom: 0.85,
        }}
      >
        <Controls />
        <MiniMap pannable zoomable maskColor="#121212" bgColor="#171717" nodeColor="#2c2c2c" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={0.5} />
      </ReactFlow>
    </div>
  );
}

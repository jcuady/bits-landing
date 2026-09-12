"use client";

import { PageHeader } from "@/components/crm/page-header";
import { PipelineBoard } from "@/components/crm/pipeline-board";
import { useCrm } from "@/lib/crm/store";

export default function PipelinesPage() {
  const { state } = useCrm();
  const pipeline = state.pipelines[0];

  return (
    <div>
      <PageHeader
        title="Pipelines"
        description={pipeline ? `${pipeline.name} · drag-free move actions` : "No pipeline configured"}
      />
      <PipelineBoard />
    </div>
  );
}

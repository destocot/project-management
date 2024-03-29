import { Select } from "@chakra-ui/react";
import { FeatureStatus } from "@/lib/types";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

type UpdateFeatureStatusSelectProps = {
  featureStatus: FeatureStatus;
};

export default function UpdateFeatureStatusSelect({
  featureStatus,
}: UpdateFeatureStatusSelectProps) {
  const [status, setStatus] = useState(featureStatus);

  const { projectId } = useParams();

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);

  const handleUpdateStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as FeatureStatus;

    if (featureStatus === newStatus) return;

    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    try {
      await res.json();
      toast.success("Feature updated.");
      setStatus(newStatus);
    } catch (error) {
      console.error(error);
      toast.error("Oops. Something went wrong trying to update a feature.");
    }
  };

  return (
    <Select
      value={status}
      onChange={handleUpdateStatus}
      w="fit-content"
      shadow="xl"
      borderColor="blue.500"
      size={{ base: "sm", lg: "md" }}
    >
      <option value="open">OPEN</option>
      <option value="in_progress">IN PROGRESS</option>
      <option value="done">DONE</option>
    </Select>
  );
}

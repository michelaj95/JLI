import { Label } from "@/components/ui/label";
import { CampusSelector } from "./CampusSelector";

interface CampusSectionProps {
  formData: {
    campus: { value: string; label: string; } | null;
  };
  onChange: (field: string, value: { value: string; label: string; } | null) => void;
}

export const CampusSection = ({ formData, onChange }: CampusSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="campus">Campus</Label>
        <CampusSelector
          value={formData.campus}
          onChange={(value) => onChange("campus", value)}
        />
      </div>
    </div>
  );
};
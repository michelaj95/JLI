import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/components/dashboard/types";
import PhoneInput, { isValidPhoneNumber, formatPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUniversities } from "@/hooks/use-universities";

interface ProfileFormProps {
  profile: Profile;
  isEditing: boolean;
  formData: Partial<Profile>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const ProfileForm = ({
  profile,
  isEditing,
  formData,
  onSave,
  onCancel,
  onChange
}: ProfileFormProps) => {
  const { data: universities = [], isLoading: isLoadingUniversities } = useUniversities();
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && !formData.first_name) {
      onChange("first_name", profile.first_name || "");
      onChange("last_name", profile.last_name || "");
      onChange("email", profile.email || "");
      onChange("phone", profile.phone || "");
      onChange("campus", profile.campus || "");
      onChange("gender", profile.gender || "");
    }
  }, [isEditing]);

  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      setPhoneError("Invalid phone number. Please enter a valid one.");
    } else {
      setPhoneError(null);
    }
    onChange("phone", value || "");
  };

  const handleInputChange = (field: string, value: string) => {
    onChange(field, value);
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <Label className="text-sm text-gray-500">First Name</Label>
            <p className="text-lg">{profile.first_name}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Last Name</Label>
            <p className="text-lg">{profile.last_name}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          <div>
            <Label className="text-sm text-gray-500">Email</Label>
            <p className="text-lg">{profile.email}</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Phone</Label>
            <p className="text-lg">{profile.phone ? formatPhoneNumber(profile.phone) : ""}</p>
          </div>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Campus</Label>
          <p className="text-lg">{profile.campus}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name || ""}
            onChange={(e) => {
              if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                handleInputChange("first_name", e.target.value);
              }
            }}
            pattern="^[a-zA-Z\s]*$"
            className="bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name || ""}
            onChange={(e) => {
              if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                handleInputChange("last_name", e.target.value);
              }
            }}
            pattern="^[a-zA-Z\s]*$"
            className="bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-2">
          <Label>Email</Label>
          <p className="text-lg">{profile.email}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone || ""}
              onChange={handlePhoneChange}
              className="bg-white"
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-2">
          <Label>Campus</Label>
          <p className="text-lg">{profile.campus}</p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={!!phoneError}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
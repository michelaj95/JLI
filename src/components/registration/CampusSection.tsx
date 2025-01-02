import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const campuses = [
  "Adelphi University",
  "American University",
  "Arizona State University",
  "Auraria Campus",
  "Binghamton University",
  "Birmingham Chabad Student Centre",
  "Bradley University",
  "Brooklyn College",
  "Brown University",
  "Bucknell University",
  "Buenos Aires Universities",
  "California Polytechnic University (Cal Poly)",
  "California State University, Chico",
  "California State University, Northridge",
  "California State University, San Marcos",
  "Caltech",
  "Carnegie Mellon",
  "Case Western Reserve University",
  "Chabad of Macalester-Groveland",
  "Chapman University",
  "Colgate University",
  "Colorado State University",
  "Columbia University",
  "Concordia University",
  "Cornell University",
  "Culinary Institute of America",
  "Dartmouth College",
  "DePaul University",
  "Drexel University",
  "Duke University",
  "Elon University",
  "Emory University",
  "Florida Atlantic University",
  "Florida Gulf Coast University",
  "Florida International University",
  "Florida State University",
  "George Mason University",
  "George Washington University",
  "Georgetown University",
  "Georgia Tech & Georgia State",
  "Grand Canyon University",
  "Hamilton College",
  "Harvard, MIT",
  "Hofstra",
  "Humboldt State University",
  "Illinois State University",
  "Indiana University",
  "International Jewish Student Center of Boston",
  "Ithaca College",
  "James Madison University",
  "Johns Hopkins University",
  "Kennesaw State University",
  "Kent State University",
  "Kraków, Poland",
  "La Sapienza, Italy",
  "Lauder Businesses School",
  "Lehigh University",
  "Lewis and Clark College",
  "Liverpool University",
  "Louisiana State University",
  "Majon Haia",
  "Marist College & Vasser",
  "McGill University",
  "Miami U",
  "Michigan State University",
  "Muhlenberg College",
  "North Carolina State University",
  "Northeastern University",
  "Northwestern University",
  "Nottingham Universities",
  "Nova Southeastern University",
  "Oakland University",
  "Occidental College",
  "Ohio State University",
  "Ohio University",
  "Oregon State University",
  "Paris La Sorbonne",
  "Pavol Jozef Šafarik University",
  "Penn State Altoona",
  "Penn State University",
  "Pepperdine University",
  "Pontifica Universidade Catolica PUC-Rio",
  "Princeton University",
  "Purdue University",
  "Queen's University",
  "Queens College",
  "Ramapo College of NJ",
  "Reed College",
  "Rensselaer Polytechnique Institute",
  "Rice University",
  "Rochester Institute of Technology",
  "Rowan University",
  "S. Diego State University",
  "San Jose State University",
  "Santa Monica College",
  "Savannah College of Art & Design",
  "Shenandoah University",
  "Siena College",
  "Stanford University",
  "Stockton University",
  "SUNY Buffalo",
  "SUNY New Paltz",
  "SUNY Oneonta",
  "SUNY Stony Brook",
  "Syracuse University",
  "Temple University",
  "Texas A&M University",
  "Texas State University",
  "The College of New Jersey",
  "The University of Arizona",
  "Towson University & Goucher College",
  "Tufts University",
  "Tulane University",
  "Uba Martinez, Buenos Aires, Argentina",
  "UC Berkeley",
  "UC Davis",
  "UC Santa Barbara",
  "UCLA",
  "Union College",
  "Universidad Anahuac, Mexico",
  "Universidad de Moron",
  "Universidad de Palermo | ISEJ",
  "Universidad de Palermo, UP, Buenos Aires",
  "Universidad Nacional del Sur",
  "Université de Médecine Aix-Marseille",
  "Université de Montréal",
  "Universities in the State of NSW, Australia",
  "Universities of Sao Paulo",
  "Universities of Victoria",
  "University of Alabama",
  "University of Alberta",
  "University of Bristol",
  "University of British Columbia",
  "University of Budapest",
  "University of California, Irvine",
  "University of California, Riverside",
  "University of Cape Town",
  "University of Central Florida",
  "University of Chicago",
  "University of Cincinnati",
  "University of Colorado",
  "University of Connecticut",
  "University of Delaware",
  "University of Denver",
  "University of Florida, Gainesville",
  "University of Georgia",
  "University of Guelph",
  "University of Hartford",
  "University of Illinois at Urbana Champaign",
  "University of Illinois Chicago",
  "University of Kansas",
  "University Of Kentucky",
  "University of Leeds",
  "University of Manchester",
  "University of Maryland, Baltimore County",
  "University of Maryland, College Park",
  "University of Massachusetts",
  "University of Miami",
  "University of Michigan",
  "University of Minnesota",
  "University of Missouri",
  "University of Nebraska, Lincoln",
  "University of Nevada, Las Vegas",
  "University of Nevada, Reno",
  "University of North Carolina, Chapel Hill",
  "University of North Florida",
  "University of Oregon",
  "University of Ottawa",
  "University of Oxford",
  "University of Pittsburgh",
  "University of Rhode Island",
  "University of Rochester",
  "University of Sheffield Western Bank",
  "University of South Carolina",
  "University of Southern California",
  "University of Texas at Austin",
  "University of Texas at Dallas",
  "University of Tucumán",
  "University of Utah",
  "University of Vermont",
  "University of Virginia",
  "University of Washington",
  "University of Waterloo",
  "University of West Florida",
  "University of Wisconsin",
  "University of Zagreb, School of Medicine",
  "USF, Tampa",
  "Vanderbilt University",
  "Virginia Tech",
  "Wake Forest University",
  "Washington University",
  "Wesleyan University",
  "West Virginia U",
  "Western University",
  "Western Washington University",
  "Wichita State University",
  "William & Mary",
  "Yale University",
  "York University"
];

interface CampusSectionProps {
  formData: {
    campus: string;
    organization: string;
  };
  onChange: (field: string, value: string) => void;
}

export const CampusSection = ({ formData, onChange }: CampusSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="campus">Campus</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-white"
            >
              {formData.campus
                ? campuses.find((campus) => campus === formData.campus)
                : "Select your campus..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search campus..." />
              <CommandEmpty>No campus found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {campuses.map((campus) => (
                  <CommandItem
                    key={campus}
                    value={campus}
                    onSelect={() => {
                      onChange("campus", campus);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        formData.campus === campus ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {campus}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor="organization">Organization</Label>
        <Select 
          value={formData.organization}
          onValueChange={(value) => onChange("organization", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student-center">Student Center</SelectItem>
            <SelectItem value="mosad">Mosad</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
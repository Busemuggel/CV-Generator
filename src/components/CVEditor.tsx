import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2, Briefcase, FolderKanban, Upload, X } from 'lucide-react';
import type { CVData, Experience } from '../types';

interface CVEditorProps {
  cvData: CVData;
  onCVChange: (data: CVData) => void;
}

export function CVEditor({ cvData, onCVChange }: CVEditorProps) {
  const updatePersonalInfo = (field: string, value: string | null) => {
    onCVChange({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: value }
    });
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('profilePicture', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    updatePersonalInfo('profilePicture', null);
  };

  const updateSkills = (value: string) => {
    onCVChange({
      ...cvData,
      skills: value.split('\n').filter(s => s.trim())
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      type: 'job',
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onCVChange({
      ...cvData,
      experiences: [...cvData.experiences, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onCVChange({
      ...cvData,
      experiences: cvData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const deleteExperience = (id: string) => {
    onCVChange({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Personal Information</h2>
        <div className="space-y-4">
          {/* Profile Picture Upload */}
          <div>
            <Label className="mb-2 block">Profile Picture</Label>
            {cvData.personalInfo.profilePicture ? (
              <div className="relative inline-block">
                <img 
                  src={cvData.personalInfo.profilePicture} 
                  alt="Profile" 
                  className="h-32 w-32 object-cover rounded-full border-2 border-slate-200"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={handleRemoveProfilePicture}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="profile-picture-upload"
                  className="flex items-center justify-center gap-2 h-32 w-32 border-2 border-dashed border-slate-300 rounded-full cursor-pointer hover:border-slate-400 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-slate-600">Upload Photo</span>
                  </div>
                </Label>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@email.com"
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={cvData.personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={cvData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={cvData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={cvData.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Skills</h2>
        <div>
          <Label htmlFor="skills">Enter one skill per line</Label>
          <Textarea
            id="skills"
            value={cvData.skills.join('\n')}
            onChange={(e) => updateSkills(e.target.value)}
            placeholder="JavaScript&#10;React&#10;Node.js"
            rows={6}
          />
        </div>
      </Card>

      {/* Experience */}
      <Card className="p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2>Experience & Projects</h2>
          <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>

        <div className="space-y-4">
          {cvData.experiences.map((exp) => (
            <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-3 relative">
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => deleteExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="pr-10">
                <Label>Type</Label>
                <Select
                  value={exp.type}
                  onValueChange={(value) => updateExperience(exp.id, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Job Position
                      </span>
                    </SelectItem>
                    <SelectItem value="project">
                      <span className="flex items-center gap-2">
                        <FolderKanban className="h-4 w-4" />
                        Project
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Title / Position</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Company / Project Name</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date (or type "Present")</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your role, responsibilities, and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}

          {cvData.experiences.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No experience entries yet. Click "Add Entry" to get started.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import type { CoverLetterData, PersonalInfo } from '../types';

interface CoverLetterEditorProps {
  coverLetterData: CoverLetterData;
  personalInfo: PersonalInfo;
  onCoverLetterChange: (data: CoverLetterData) => void;
}

export function CoverLetterEditor({ 
  coverLetterData, 
  onCoverLetterChange 
}: CoverLetterEditorProps) {
  const updateField = (field: string, value: string) => {
    onCoverLetterChange({
      ...coverLetterData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Recipient Information */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Recipient Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={coverLetterData.recipientName}
              onChange={(e) => updateField('recipientName', e.target.value)}
              placeholder="Hiring Manager"
            />
          </div>
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={coverLetterData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="ABC Company"
            />
          </div>
          <div>
            <Label htmlFor="position">Position Applying For</Label>
            <Input
              id="position"
              value={coverLetterData.position}
              onChange={(e) => updateField('position', e.target.value)}
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>
      </Card>

      {/* Greeting */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Greeting</h2>
        <div>
          <Label htmlFor="greeting">Opening Greeting</Label>
          <Input
            id="greeting"
            value={coverLetterData.greeting}
            onChange={(e) => updateField('greeting', e.target.value)}
            placeholder="Dear Hiring Manager,"
          />
        </div>
      </Card>

      {/* Introduction */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Introduction</h2>
        <div>
          <Label htmlFor="introduction">Introduction Paragraph</Label>
          <Textarea
            id="introduction"
            value={coverLetterData.introduction}
            onChange={(e) => updateField('introduction', e.target.value)}
            placeholder="Introduce yourself and express your interest in the position..."
            rows={4}
          />
        </div>
      </Card>

      {/* Main Body */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Main Section</h2>
        <div>
          <Label htmlFor="mainBody">Main Body Paragraphs</Label>
          <Textarea
            id="mainBody"
            value={coverLetterData.mainBody}
            onChange={(e) => updateField('mainBody', e.target.value)}
            placeholder="Highlight your relevant experience, skills, and why you're a good fit..."
            rows={8}
          />
          <p className="mt-2 text-slate-500">Tip: Use line breaks to separate paragraphs</p>
        </div>
      </Card>

      {/* Closing */}
      <Card className="p-6 bg-white shadow-sm">
        <h2 className="mb-4">Closing</h2>
        <div>
          <Label htmlFor="closing">Closing Paragraph</Label>
          <Textarea
            id="closing"
            value={coverLetterData.closing}
            onChange={(e) => updateField('closing', e.target.value)}
            placeholder="Thank the reader and express your enthusiasm..."
            rows={4}
          />
        </div>
      </Card>
    </div>
  );
}

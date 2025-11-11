import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { FileDown, Briefcase, FileText } from 'lucide-react';
import { CVEditor } from './components/CVEditor';
import { CVPreview } from './components/CVPreview';
import { CoverLetterEditor } from './components/CoverLetterEditor';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { BrandingSettings } from './components/BrandingSettings';
import { exportToPDF } from './utils/pdfExport';
import type { CVData, CoverLetterData, BrandingData } from './types';

export default function App() {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      dateOfBirth: '',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
      profilePicture: null
    },
    skills: [
      'JavaScript/TypeScript',
      'React & Next.js',
      'Node.js',
      'UI/UX Design',
      'Project Management',
      'Agile Methodologies'
    ],
    experiences: [
      {
        id: '1',
        type: 'job',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'New York, NY',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Led development of customer-facing web applications serving 1M+ users. Architected scalable solutions using React and Node.js.'
      },
      {
        id: '2',
        type: 'job',
        title: 'Software Engineer',
        company: 'StartUp Inc',
        location: 'San Francisco, CA',
        startDate: '2018-06',
        endDate: '2019-12',
        description: 'Developed and maintained multiple web applications. Collaborated with design team to improve user experience.'
      },
      {
        id: '3',
        type: 'project',
        title: 'E-Commerce Platform',
        company: 'Personal Project',
        location: '',
        startDate: '2022-03',
        endDate: '2022-08',
        description: 'Built a full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.'
      }
    ]
  });

  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    recipientName: 'Hiring Manager',
    companyName: 'ABC Company',
    position: 'Senior Software Engineer',
    greeting: 'Dear Hiring Manager,',
    introduction: 'I am writing to express my strong interest in the Senior Software Engineer position at ABC Company. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality software solutions, I am excited about the opportunity to contribute to your team.',
    mainBody: 'Throughout my career, I have specialized in building scalable web applications using modern technologies like React, Node.js, and TypeScript. At Tech Corp, I led the development of customer-facing applications serving over 1 million users, where I focused on performance optimization and user experience improvements.\n\nI am particularly drawn to ABC Company because of your commitment to innovation and user-centric design. I believe my experience in agile development and my passion for creating elegant solutions align perfectly with your team\'s goals.',
    closing: 'Thank you for considering my application. I am excited about the possibility of contributing to ABC Company and would welcome the opportunity to discuss how my skills and experience can benefit your team. I look forward to hearing from you.'
  });

  const [brandingData, setBrandingData] = useState<BrandingData>({
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    companyLogo: null
  });

  const handleExportCV = async () => {
    const element = document.getElementById('cv-preview');
    if (element) {
      await exportToPDF(element, `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`);
    }
  };

  const handleExportCoverLetter = async () => {
    const element = document.getElementById('cover-letter-preview');
    if (element) {
      await exportToPDF(element, `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8" />
            Professional CV & Cover Letter Builder
          </h1>
          <p className="text-slate-600">Create, customize, and export your professional documents</p>
        </div>

        {/* Branding Settings */}
        <div className="mb-6">
          <BrandingSettings 
            brandingData={brandingData}
            onBrandingChange={setBrandingData}
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="cv" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              CV / Résumé
            </TabsTrigger>
            <TabsTrigger value="cover-letter" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Cover Letter
            </TabsTrigger>
          </TabsList>

          {/* CV Tab */}
          <TabsContent value="cv" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Editor */}
              <div>
                <CVEditor cvData={cvData} onCVChange={setCVData} />
              </div>

              {/* Preview */}
              <div>
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2>Preview</h2>
                    <Button onClick={handleExportCV} className="flex items-center gap-2">
                      <FileDown className="h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                  <CVPreview 
                    cvData={cvData} 
                    brandingData={brandingData}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cover Letter Tab */}
          <TabsContent value="cover-letter" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Editor */}
              <div>
                <CoverLetterEditor 
                  coverLetterData={coverLetterData} 
                  personalInfo={cvData.personalInfo}
                  onCoverLetterChange={setCoverLetterData} 
                />
              </div>

              {/* Preview */}
              <div>
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2>Preview</h2>
                    <Button onClick={handleExportCoverLetter} className="flex items-center gap-2">
                      <FileDown className="h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                  <CoverLetterPreview 
                    coverLetterData={coverLetterData}
                    personalInfo={cvData.personalInfo}
                    brandingData={brandingData}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

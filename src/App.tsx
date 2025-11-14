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
import type {
  CVData,
  CoverLetterData,
  BrandingData,
  Language,
  PersonalInfo,
} from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('de');

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: 'Ben Hoppe',
    email: 'hoppe.ben97@gmail.com',
    dateOfBirth: '1997-05-25',
    phone: '+49 178 3430434',
    location: '55116, Mainz',
    linkedin: 'https://www.linkedin.com/in/ben-hoppe-b8b3bb1a0/',
    website: 'https://ben-hoppe.de/',
    profilePicture: null,
  });

  const [cvDataByLanguage, setCVDataByLanguage] = useState<Record<Language, CVData>>({
    de: {
      personalInfo,
      skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Tailwind CSS',
        'UI/UX Design',
        'Vite',
        'Jest',
        'Node.js',
        'MySQL',
        'Sequelize',
        'JWT',
        'OAuth2',
        'Zod',
        'NX',
        'CI/CD',
        'GitHub Actions',
        'Puppeteer',
        'Google Cloud (GCP)',
        'OpenAI API',
      ],
      experiences: [
        {
          id: '1',
          type: 'job',
          title: 'IT-Consulting und Coaching',
          company: 'Selbstständigkeit',
          location: 'Mainz',
          startDate: '2023-05',
          endDate: '2025-10',
          description: `- Entwicklung eines Systems zur automatisierten Lead-Generierung & KI-basierten Outreach-Kommunikation
- Integration einer Webseite mit spezialisierter Coaching-Software
- Entwicklung einer umfassenden Coaching-Plattform im IT-Bereich
- Entwicklung maßgeschneiderter, interaktiver Workshops basierend auf Analyseergebnissen
- Einbindung von Expertenfeedback zur Optimierung der Workshops
- Förderung der Fortentwicklung im Bereich IT-Weiterbildung
- Technisches Projektmanagement
- Testing`,
        },
        {
          id: '2',
          type: 'job',
          title: 'Software Engineer',
          company: 'SCHWABEO GmbH',
          location: 'Stuttgart',
          startDate: '2022-09',
          endDate: '2023-07',
          description: `- Konzeption interner Softwarelösungen
- Gewährleistung einer nahtlosen Integration von zeitlichen Erfassungsprozessen und Scrum-Methoden
- Entwicklung von Benutzeroberflächen mit React und TypeScript
- Erstellung und Implementierung von Animationen mit JavaScript`,
        },
        {
          id: '3',
          type: 'project',
          title: '',
          company: 'Technologischer Kompetenzaufbau',
          location: '',
          startDate: '2021-08',
          endDate: '2022-09',
          description: `- Nach Abschluss meiner Ausbildung nutzte ich diese Phase gezielt zur fachlichen Weiterentwicklung
- Vertiefung moderner Webtechnologien wie React, TypeScript, Tailwind, Node.js und GCP
- Eigenständige Entwicklung kleiner Webanwendungen zur praktischen Anwendung des Gelernten
- Erste Experimente mit Automatisierung (Puppeteer) und KI-APIs (OpenAI)
- Aufbau eines technischen Fundaments für meine spätere Selbstständigkeit im Bereich IT-Consulting`,
        },
        {
          id: '4',
          type: 'job',
          title: 'Bezahltes Praktikum + Ausbildung FAE',
          company: 'Check24 GmbH',
          location: '',
          startDate: '2019-05',
          endDate: '2021-06',
          description: `- Konzeption und Implementierung eines komplexen Vergleich Systems (nutzerspezifische Ergebnisseiten, Antrags- und Angebotsstrecken für Desktop und mobile Endgeräte, hauseigenes CRM-System, BackofficeSystem zur Tarifpflege und -berechnung) in PHP
- Weiterentwicklung bestehender Lösungen am Produkt Privathaftpflicht
- Kontinuierliche Qualitätssicherung des Produktes Privathaftpflicht durch das Schreiben von automatisierten Tests mit Hilfe von Testframeworks PHPUnit und Behat
- Ansprechpartner für Produktmanager zur vorherigen Abstimmung von neuen Features inkl. technischer Einschätzung bzgl. Umfang Frontendentwicklung mittels JavaScript und CSS`,
        },
      ],
    },
    en: {
      personalInfo,
      skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Tailwind CSS',
        'UI/UX Design',
        'Vite',
        'Jest',
        'Node.js',
        'MySQL',
        'Sequelize',
        'JWT',
        'OAuth2',
        'Zod',
        'NX',
        'CI/CD',
        'GitHub Actions',
        'Puppeteer',
        'Google Cloud (GCP)',
        'OpenAI API',
      ],
      experiences: [
        {
          id: '1',
          type: 'job',
          title: 'IT Consulting and Coaching',
          company: 'Self-Employed',
          location: 'Mainz',
          startDate: '2023-05',
          endDate: '2025-10',
          description: `- Developed a system for automated lead generation and AI-driven outreach communication
- Integrated a website with specialized coaching software
- Built a comprehensive coaching platform in the IT domain
- Created tailored, interactive workshops based on analytical insights
- Incorporated expert feedback to optimize workshop experiences
- Advanced professional development initiatives in IT education
- Led technical project management activities
- Performed quality assurance and testing`,
        },
        {
          id: '2',
          type: 'job',
          title: 'Software Engineer',
          company: 'SCHWABEO GmbH',
          location: 'Stuttgart',
          startDate: '2022-09',
          endDate: '2023-07',
          description: `- Designed internal software solutions
- Ensured seamless integration of time-tracking processes with Scrum methodologies
- Developed user interfaces with React and TypeScript
- Created and implemented animations using JavaScript`,
        },
        {
          id: '3',
          type: 'project',
          title: '',
          company: 'Technical Skills Development',
          location: '',
          startDate: '2021-08',
          endDate: '2022-09',
          description: `- Used this dedicated phase after my apprenticeship for focused professional development
- Deepened knowledge of modern web technologies such as React, TypeScript, Tailwind, Node.js, and GCP
- Built small web applications independently to apply new skills in practice
- Conducted initial experiments with automation (Puppeteer) and AI APIs (OpenAI)
- Laid the technical foundation for my later self-employment in IT consulting`,
        },
        {
          id: '4',
          type: 'job',
          title: 'Paid Internship & FAE Apprenticeship',
          company: 'Check24 GmbH',
          location: '',
          startDate: '2019-05',
          endDate: '2021-06',
          description: `- Planned and implemented a complex comparison system (personalized result pages, application and offer flows for desktop and mobile, in-house CRM system, and back-office solution for rate maintenance and calculation) in PHP
- Enhanced existing solutions for the personal liability insurance product
- Ensured continuous product quality by writing automated tests using PHPUnit and Behat
- Served as the point of contact for product managers to scope new features, including technical assessments of front-end development efforts with JavaScript and CSS`,
        },
      ],
    },
  });

  const [coverLetterDataByLanguage, setCoverLetterDataByLanguage] =
    useState<Record<Language, CoverLetterData>>({
      de: {
        recipientName: 'Personalabteilung',
        companyName: 'ABC Company',
        position: 'Senior Software Engineer',
        greeting: 'Sehr geehrte Damen und Herren,',
        introduction:
          'hiermit möchte ich mein großes Interesse an der Position als Senior Software Engineer bei ABC Company zum Ausdruck bringen. Mit mehr als fünf Jahren Erfahrung in der Full-Stack-Entwicklung und nachweisbaren Erfolgen bei der Umsetzung hochwertiger Softwarelösungen freue ich mich darauf, mein Know-how in Ihr Team einzubringen.',
        mainBody:
          'Während meiner bisherigen Laufbahn habe ich mich auf den Aufbau skalierbarer Webanwendungen mit modernen Technologien wie React, Node.js und TypeScript spezialisiert. Bei Tech Corp leitete ich die Entwicklung kundenorientierter Anwendungen für über eine Million Nutzer und konzentrierte mich dabei auf Performance-Optimierung sowie die Verbesserung der User Experience.\n\nBesonders reizt mich ABC Company aufgrund Ihres Engagements für Innovation und nutzerzentriertes Design. Ich bin überzeugt, dass meine Erfahrung in der agilen Entwicklung und meine Leidenschaft für elegante Lösungen hervorragend zu den Zielen Ihres Teams passen.',
        closing:
          'Vielen Dank, dass Sie meine Bewerbung berücksichtigen. Ich freue mich auf die Möglichkeit, ABC Company zu unterstützen, und bin gerne bereit, in einem persönlichen Gespräch zu erläutern, wie meine Fähigkeiten und Erfahrungen Ihrem Team zugutekommen können. Ich freue mich darauf, von Ihnen zu hören.',
      },
      en: {
        recipientName: 'Hiring Manager',
        companyName: 'ABC Company',
        position: 'Senior Software Engineer',
        greeting: 'Dear Hiring Manager,',
        introduction:
          'I am writing to express my strong interest in the Senior Software Engineer position at ABC Company. With over 5 years of experience in full-stack development and a proven track record of delivering high-quality software solutions, I am excited about the opportunity to contribute to your team.',
        mainBody:
          "Throughout my career, I have specialized in building scalable web applications using modern technologies like React, Node.js, and TypeScript. At Tech Corp, I led the development of customer-facing applications serving over 1 million users, where I focused on performance optimization and user experience improvements.\n\nI am particularly drawn to ABC Company because of your commitment to innovation and user-centric design. I believe my experience in agile development and my passion for creating elegant solutions align perfectly with your team's goals.",
        closing:
          'Thank you for considering my application. I am excited about the possibility of contributing to ABC Company and would welcome the opportunity to discuss how my skills and experience can benefit your team. I look forward to hearing from you.',
      },
    });

  const [brandingData, setBrandingData] = useState<BrandingData>({
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    companyLogo: null,
  });

  const currentCVData = cvDataByLanguage[language];
  const currentCoverLetterData = coverLetterDataByLanguage[language];

  const handleCVChange = (updatedCV: CVData) => {
    setPersonalInfo(updatedCV.personalInfo);

    setCVDataByLanguage((prev) => ({
      de: {
        ...prev.de,
        ...(language === 'de' ? updatedCV : prev.de),
        personalInfo: updatedCV.personalInfo,
      },
      en: {
        ...prev.en,
        ...(language === 'en' ? updatedCV : prev.en),
        personalInfo: updatedCV.personalInfo,
      },
    }));
  };

  const handleCoverLetterChange = (updatedCoverLetter: CoverLetterData) => {
    setCoverLetterDataByLanguage((prev) => {
      const otherLanguage: Language = language === 'de' ? 'en' : 'de';

      return {
        ...prev,
        [language]: updatedCoverLetter,
        [otherLanguage]: {
          ...prev[otherLanguage],
          recipientName: updatedCoverLetter.recipientName,
          companyName: updatedCoverLetter.companyName,
          position: updatedCoverLetter.position,
        },
      };
    });
  };

  const handleExportCV = async () => {
    const element = document.getElementById('cv-preview');
    if (element) {
      await exportToPDF(
        element,
        `${currentCVData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`
      );
    }
  };

  const handleExportCoverLetter = async () => {
    const element = document.getElementById('cover-letter-preview');
    if (element) {
      await exportToPDF(
        element,
        `${currentCVData.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf`
      );
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'de' ? 'en' : 'de'));
  };

  const languageToggleLabel =
    language === 'de' ? 'Switch to English' : 'Wechsel zu Deutsch';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8" />
            Professional CV & Cover Letter Builder
          </h1>
          <p className="text-slate-600">
            Create, customize, and export your professional documents
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={toggleLanguage}>
            {languageToggleLabel}
          </Button>
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
            <TabsTrigger
              value="cover-letter"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Cover Letter
            </TabsTrigger>
          </TabsList>

          {/* CV Tab */}
          <TabsContent value="cv" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Editor */}
              <div>
                <CVEditor cvData={currentCVData} onCVChange={handleCVChange} />
              </div>

              {/* Preview */}
              <div>
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2>Preview</h2>
                    <div className="mt-12"></div>
                    <Button
                      onClick={handleExportCV}
                      className="flex items-center gap-2"
                    >
                      <FileDown className="h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                  <CVPreview
                    cvData={currentCVData}
                    brandingData={brandingData}
                    language={language}
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
                  coverLetterData={currentCoverLetterData}
                  personalInfo={currentCVData.personalInfo}
                  onCoverLetterChange={handleCoverLetterChange}
                />
              </div>

              {/* Preview */}
              <div>
                <div className="sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2>Preview</h2>
                    <Button
                      onClick={handleExportCoverLetter}
                      className="flex items-center gap-2"
                    >
                      <FileDown className="h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                  <CoverLetterPreview
                    coverLetterData={currentCoverLetterData}
                    personalInfo={currentCVData.personalInfo}
                    brandingData={brandingData}
                    language={language}
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

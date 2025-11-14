import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type {
  CoverLetterData,
  PersonalInfo,
  BrandingData,
  Language,
} from "../types";
import { FormattedText } from "./FormattedText";

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterData;
  personalInfo: PersonalInfo;
  brandingData: BrandingData;
  language: Language;
}

export function CoverLetterPreview({
  coverLetterData,
  personalInfo,
  brandingData,
  language,
}: CoverLetterPreviewProps) {
  const translations: Record<Language, { subject: string; closing: string }> = {
    de: {
      subject: "Betreff: Bewerbung als ",
      closing: "Herzliche Grüße",
    },
    en: {
      subject: "Subject: Application for ",
      closing: "Kind regards",
    },
  };

  const currentDate = new Date().toLocaleDateString(
    language === "de" ? "de-DE" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        id="cover-letter-preview"
        className="bg-white p-12"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Header with Personal Info */}
        <div
          className="mb-8 pb-6 border-b-2"
          style={{ borderColor: brandingData.primaryColor }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="mb-3" style={{ color: brandingData.primaryColor }}>
                {personalInfo.fullName}
              </h1>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{personalInfo.location}</span>
                </div>
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Linkedin
                      className="h-4 w-4"
                      style={{ color: brandingData.secondaryColor }}
                    />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe
                      className="h-4 w-4"
                      style={{ color: brandingData.secondaryColor }}
                    />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {brandingData.companyLogo && (
              <div className="ml-6">
                <img
                  src={brandingData.companyLogo}
                  alt="Company Logo"
                  className="object-contain"
                  style={{
                    maxWidth: "120px",
                    maxHeight: "60px",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="mb-6 text-slate-600">{currentDate}</div>

        {/* Recipient Address */}
        <div className="mb-6">
          <p className="text-slate-700">{coverLetterData.recipientName}</p>
          <p className="text-slate-700">{coverLetterData.companyName}</p>
        </div>

        {/* Subject Line */}
        <div className="mb-6">
          <p className="text-slate-700">
            <span>{translations[language].subject}</span>
            <span style={{ color: brandingData.primaryColor }}>
              {coverLetterData.position}
            </span>
          </p>
        </div>

        {/* Greeting */}
        <div className="mb-2">
          <p className="text-slate-700">{coverLetterData.greeting}</p>
        </div>

        {/* Introduction */}
        <div className="mb-6">
          <FormattedText
            text={coverLetterData.introduction}
            className="text-slate-700 leading-relaxed"
            primaryColor={brandingData.primaryColor}
          />
        </div>

        {/* Main Body */}
        <div className="mb-6">
          <FormattedText
            text={coverLetterData.mainBody}
            className="text-slate-700 leading-relaxed"
            primaryColor={brandingData.primaryColor}
          />
        </div>

        {/* Closing */}
        <div className="mb-8">
          <FormattedText
            text={coverLetterData.closing}
            className="text-slate-700 leading-relaxed"
            primaryColor={brandingData.primaryColor}
          />
        </div>

        {/* Signature */}
        <div className="mt-8">
          <p className="text-slate-700 mb-2">
            {translations[language].closing}
          </p>
          <p
            className="text-slate-700"
            style={{ color: brandingData.primaryColor }}
          >
            {personalInfo.fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

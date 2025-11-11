import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Calendar,
  MapPinned,
  Cake,
} from "lucide-react";
import type { CVData, BrandingData } from "../types";
import { FormattedText } from "./FormattedText";

interface CVPreviewProps {
  cvData: CVData;
  brandingData: BrandingData;
}

export function CVPreview({ cvData, brandingData }: CVPreviewProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "present") return "Present";

    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        id="cv-preview"
        className="bg-white px-12"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          className="mb-8 pb-6 border-b-2"
          style={{ borderColor: brandingData.primaryColor }}
        >
          <div className="flex items-start justify-between gap-6">
            {/* Profile Picture */}
            {cvData.personalInfo.profilePicture && (
              <div className="flex-shrink-0">
                <img
                  src={cvData.personalInfo.profilePicture}
                  alt="Profile"
                  className="h-32 w-32 object-cover rounded-full border-4"
                  style={{ borderColor: brandingData.primaryColor }}
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="mb-3" style={{ color: brandingData.primaryColor }}>
                {cvData.personalInfo.fullName}
              </h1>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{cvData.personalInfo.email}</span>
                </div>
                {cvData.personalInfo.dateOfBirth && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Cake
                      className="h-4 w-4"
                      style={{ color: brandingData.secondaryColor }}
                    />
                    <span>
                      {new Date(
                        cvData.personalInfo.dateOfBirth
                      ).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin
                    className="h-4 w-4"
                    style={{ color: brandingData.secondaryColor }}
                  />
                  <span>{cvData.personalInfo.location}</span>
                </div>
                {cvData.personalInfo.linkedin && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Linkedin
                      className="h-4 w-4"
                      style={{ color: brandingData.secondaryColor }}
                    />
                    <span>{cvData.personalInfo.linkedin}</span>
                  </div>
                )}
                {cvData.personalInfo.website && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe
                      className="h-4 w-4"
                      style={{ color: brandingData.secondaryColor }}
                    />
                    <span>{cvData.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {brandingData.companyLogo && (
              <div className="ml-6 flex-shrink-0">
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

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4" style={{ color: brandingData.primaryColor }}>
              Fähigkeiten
            </h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded text-white"
                  style={{ backgroundColor: brandingData.primaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {cvData.experiences.length > 0 && (
          <div>
            <h2 className="mb-4" style={{ color: brandingData.primaryColor }}>
              Erfahrung
            </h2>
            <div className="space-y-6">
              {cvData.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-6 border-l-2"
                  style={{ borderColor: brandingData.primaryColor }}
                >
                  <div
                    className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: brandingData.secondaryColor }}
                  />

                  <div className="mb-2">
                    <h3 className="mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-3 text-slate-600 mb-1">
                      <span
                        className="font-medium"
                        style={{ color: brandingData.secondaryColor }}
                      >
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPinned className="h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(exp.startDate)} -{" "}
                        {formatDate(exp.endDate) || "Present"}
                      </span>
                    </div>
                  </div>

                  {exp.description && (
                    <FormattedText
                      text={exp.description}
                      className="text-slate-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

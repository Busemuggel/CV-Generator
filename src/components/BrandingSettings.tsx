import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Upload, X } from 'lucide-react';
import type { BrandingData } from '../types';

interface BrandingSettingsProps {
  brandingData: BrandingData;
  onBrandingChange: (data: BrandingData) => void;
}

export function BrandingSettings({ brandingData, onBrandingChange }: BrandingSettingsProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onBrandingChange({
          ...brandingData,
          companyLogo: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onBrandingChange({
      ...brandingData,
      companyLogo: null
    });
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h2 className="mb-4">Company Branding</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Logo Upload */}
        <div>
          <Label className="mb-2 block">Company Logo</Label>
          {brandingData.companyLogo ? (
            <div className="relative inline-block">
              <img 
                src={brandingData.companyLogo} 
                alt="Company Logo" 
                className="h-20 w-auto object-contain border border-slate-200 rounded p-2"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={handleRemoveLogo}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Label
                htmlFor="logo-upload"
                className="flex items-center justify-center gap-2 h-20 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:border-slate-400 transition-colors"
              >
                <Upload className="h-5 w-5 text-slate-400" />
                <span className="text-slate-600">Upload Logo</span>
              </Label>
            </div>
          )}
        </div>

        {/* Primary Color */}
        <div>
          <Label htmlFor="primary-color" className="mb-2 block">Primary Color</Label>
          <div className="flex gap-2">
            <Input
              id="primary-color"
              type="color"
              value={brandingData.primaryColor}
              onChange={(e) => onBrandingChange({ ...brandingData, primaryColor: e.target.value })}
              className="h-20 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={brandingData.primaryColor}
              onChange={(e) => onBrandingChange({ ...brandingData, primaryColor: e.target.value })}
              className="flex-1"
              placeholder="#2563eb"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div>
          <Label htmlFor="secondary-color" className="mb-2 block">Secondary Color</Label>
          <div className="flex gap-2">
            <Input
              id="secondary-color"
              type="color"
              value={brandingData.secondaryColor}
              onChange={(e) => onBrandingChange({ ...brandingData, secondaryColor: e.target.value })}
              className="h-20 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={brandingData.secondaryColor}
              onChange={(e) => onBrandingChange({ ...brandingData, secondaryColor: e.target.value })}
              className="flex-1"
              placeholder="#1e40af"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

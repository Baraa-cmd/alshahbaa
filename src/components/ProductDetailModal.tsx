import React from 'react';
import { X, MessageCircle, ShieldCheck, Award, Check } from 'lucide-react';
import { ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenWhatsApp: (text: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenWhatsApp,
}) => {
  if (!product) return null;

  const handleWhatsApp = () => {
    const text = [
      `السلام عليكم شركة الشهباء التجارية،`,
      `أرغب بالاستفسار عن تفاصيل وتوريد الصنف التالي:`,
      `• اسم الصنف: ${product.title}`,
      `• كود الصنف: ${product.code}`,
      `• القسم: ${product.categoryLabel}`,
      `• الضمان: ${product.warrantyYears} سنوات`,
      `يرجى تزويدي بكافة التفاصيل والتوريد لموقعي.`,
    ].join('\n');

    onOpenWhatsApp(text);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white border border-emerald-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 text-slate-800 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-emerald-100 bg-[#EAF5EA] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
            <span className="text-xs font-bold text-emerald-800 font-num">{product.code}</span>
            <span className="text-xs text-emerald-300">|</span>
            <span className="text-xs font-bold text-slate-700 truncate">{product.categoryLabel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-emerald-200 text-slate-500 hover:text-slate-800 hover:bg-emerald-50 flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-5 overflow-y-auto flex-1 bg-white">
          {/* Top Info & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div className="aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100 relative shadow-inner">
              <ResilientImage
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3.5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-tight">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {product.subtitle}
              </p>

              <div className="p-3.5 bg-[#F0F8F0] border border-emerald-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>الضمان والاعتماد:</span>
                </div>
                <div className="text-slate-700 text-xs leading-relaxed">
                  {product.certification} — ضمان مصنعي معتمد {product.warrantyYears} سنوات
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 border-t border-emerald-100 pt-4">
            <h3 className="text-xs sm:text-sm font-black text-slate-900">الوصف التفصيلي والاستخدام الموصى به:</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{product.description}</p>
          </div>

          {/* Technical Specs Table */}
          <div className="space-y-2.5 border-t border-emerald-100 pt-4">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>جدول المواصفات الهندسية:</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {product.specs.map((sp, idx) => (
                <div key={idx} className="p-3 bg-[#F4F9F4] border border-emerald-200/70 rounded-xl space-y-0.5">
                  <span className="text-[11px] text-slate-500 block">{sp.label}</span>
                  <span className="font-num font-bold text-slate-800 block text-xs truncate">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2 border-t border-emerald-100 pt-4">
            <h3 className="text-xs sm:text-sm font-black text-slate-900">المزايا والمواصفات التشغيلية:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F0F8F0] border border-emerald-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-[#EAF5EA] border-t border-emerald-100 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-xs font-bold text-slate-700 cursor-pointer transition-colors shadow-xs"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-700/20 active:scale-98 transition-all text-center"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>طلب استفسار وتوريد عبر واتساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};

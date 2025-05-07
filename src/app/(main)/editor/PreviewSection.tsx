import Preview from '@/components/global/preview/Preview'
import { ResumeValues } from '@/lib/validation'
import React from 'react'
import ColorPicker from './ColorPicker'
import BorderStyleButton from './BorderStyleButton'
import { cn } from '@/lib/utils'

interface ResumePreviewSectionProps {
    resumeData: ResumeValues,
    setResumeData: (data: ResumeValues) => void
    classname? : string
}

const PreviewSection = ({resumeData, setResumeData,classname} : ResumePreviewSectionProps) => {
  return (
    <div className={cn("group relative hidden md:w-1/2 md:flex w-full", classname)}>
        <div className='absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100'>
            <ColorPicker color={resumeData.colorHex} onChange={(color)=> setResumeData({...resumeData, colorHex: color.hex})}/>
            <BorderStyleButton borderStyle={resumeData.borderStyle} onChange={(borderSty)=> setResumeData({...resumeData, borderStyle: borderSty})}/>
        </div>
        <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
            <Preview resumeData={resumeData} className='max-w-2xl shadow-md'/>
        </div>
    </div>
  )
}

export default PreviewSection
'use client'

import { CopyBox } from './copy-box.client'

export const JoinButton = () => {
  return (
    <div className="py-4 pointer-events-auto">
      <CopyBox value="npx skills add andresCamp/osis" />
    </div>
  )
}

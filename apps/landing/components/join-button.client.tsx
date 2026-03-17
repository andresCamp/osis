'use client'

import { CopyBox } from './copy-box.client'

export const JoinButton = () => {
  return (
    <div className="py-4">
      <CopyBox value="npx skills add andresCamp/osis" />
    </div>
  )
}

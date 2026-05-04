'use client'

import React, { ReactNode } from 'react'
import Modal from '@/components/ui/Modal'
import LeadForm from '@/components/ui/LeadForm'
import { useLeadModal } from '@/hooks/useLeadModal'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const { isOpen, closeModal, prefilledDev } = useLeadModal()

  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Tell us what you need"
        subtitle="Let's find your perfect HubSpot developer match."
      >
        <LeadForm onClose={closeModal} prefilledDev={prefilledDev} />
      </Modal>
    </>
  )
}

'use client'

import { create } from 'zustand'

interface LeadModalStore {
  isOpen: boolean
  prefilledDev?: string
  openModal: (prefilledDev?: string) => void
  closeModal: () => void
}

export const useLeadModal = create<LeadModalStore>((set) => ({
  isOpen: false,
  prefilledDev: undefined,
  openModal: (prefilledDev?: string) =>
    set({ isOpen: true, prefilledDev }),
  closeModal: () => set({ isOpen: false, prefilledDev: undefined }),
}))

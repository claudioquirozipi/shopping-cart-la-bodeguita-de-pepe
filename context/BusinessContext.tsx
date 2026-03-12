'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ApiBusiness } from '@/lib/api'

const BusinessContext = createContext<ApiBusiness | null>(null)

export function BusinessProvider({
  business,
  children,
}: {
  business: ApiBusiness
  children: ReactNode
}) {
  return (
    <BusinessContext.Provider value={business}>
      {children}
    </BusinessContext.Provider>
  )
}

export function useBusiness() {
  return useContext(BusinessContext)
}

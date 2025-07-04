import PageHeader from '@/components/page-header'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <><PageHeader /><main>{children}</main><footer>Footer</footer></>
  )
}

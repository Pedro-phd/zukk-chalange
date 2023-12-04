'use client'
import { FarmProvider } from '@/aplication/context/FarmContext'
import { NextUIProvider } from '@nextui-org/react'
import Dashboard from '@/presentation/pages/Dashboard'
import { ThemeProvider, createTheme } from '@mui/material'

export default function Home() {
  const newTheme = createTheme({ palette: { mode: 'dark' } })

  return (
    <NextUIProvider>
      <FarmProvider>
        <ThemeProvider theme={newTheme}>
          <div className="z-10 relative">
            <Dashboard />
          </div>
          <div className="fixed dark:md:block dark:opacity-70 -bottom-0 -left-[-46%] md:-bottom-[40%] md:-left-[20%] z-0">
            <img
              src="https://nextui.org/gradients/docs-left.png"
              className="relative z-10 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity rounded-large"
            />
          </div>
          <div className="fixed dark:md:block dark:opacity-70  -top-[20%] -right-[60%] md:-top-[80%]  2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12">
            <img
              src="https://nextui.org/gradients/docs-right.png"
              className="relative z-10 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity rounded-large"
            />
          </div>
        </ThemeProvider>
      </FarmProvider>
    </NextUIProvider>
  )
}

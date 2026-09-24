import DashboardLayout from './dashboard-layout'
import { DashboardContent } from './dashboard-content'
import { TrendsContent } from './trends-content'
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './navigation'
import { ThemeProvider } from './theme-provider'

function DashboardRoute() {
  const { pathname } = useDashboardNavigation()

  return (
    <DashboardLayout>
      {pathname === '/trends' ? <TrendsContent /> : <DashboardContent />}
    </DashboardLayout>
  )
}

export default function BionisDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  )
}
